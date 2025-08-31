from fastapi import FastAPI
import httpx
import asyncio
import traceback
from common import load_json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"]
    allow_methods=["*"],
    allow_headers=["*"],
)

api_catalog = load_json("api_catlog/api.json")

HACKERNEWS_ITEM = "https://hacker-news.firebaseio.com/v0/item/{id}.json"

async def fetch_hn_story(client, story_id):
    try:
        resp = await client.get(HACKERNEWS_ITEM.format(id=story_id))
        return resp.json()
    except Exception:
        return {"error": f"Failed to fetch story {story_id}"}

async def fetch_response(ep_name: str):
    results = {}
    ep_details = api_catalog[ep_name]

    async with httpx.AsyncClient() as client:
        try:
            # special case: HackerNews
            if ep_name == "hackernews":
                resp = await client.get(ep_details["base_url"])
                ids = resp.json()
                # fetch top 5 stories
                tasks = [fetch_hn_story(client, sid) for sid in ids[:5]]
                stories = await asyncio.gather(*tasks)
                results[ep_name] = stories
            else:
                response = await client.get(
                    ep_details["base_url"], 
                    params=ep_details.get("params", None)
                )
                results[ep_name] = response.json()
        except Exception:
            results[ep_name] = {"error": str(traceback.format_exc(limit=1000))}

    return ep_name, results

@app.get("/")
async def fetch_all():
    tasks = [fetch_response(svc_name) for svc_name in api_catalog]
    results = await asyncio.gather(*tasks)
    return {source: data for source, data in results}
