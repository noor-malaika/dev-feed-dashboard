from fastapi import FastAPI
import httpx
import asyncio
import traceback
from common import load_json

app = FastAPI()

api_catalog = load_json("api_catlog/api.json")

async def fetch_response(ep_name: str):
    results = {}
    ep_details = api_catalog[ep_name]
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(ep_details["base_url"], params=ep_details.get("params", None))
            results[ep_name] = response.json()
        except Exception as e:
            results[ep_name] = {"error": str(traceback.format_exc(limit=1000))}
    return ep_name, results

@app.get("/")
async def fetch_all():
    tasks = [fetch_response(svc_name) for svc_name in api_catalog]
    results = await asyncio.gather(*tasks)
    return {source: data for source, data in results}