from fastapi import FastAPI, HTTPException
import httpx
import asyncio

app = FastAPI()

SERS = {
    "weather": "https://goweather.herokuapp.com/weather/{city}",
    "news": "https://www.freenewsapi.com/k/china",
    "fact": "https://uselessfacts.jsph.pl/api/v2/facts/random"
}

async def fetch_response(client, service, url, city):
    # Your implementation here
    try:
        if service == "weather":
            url = url.format(city=city)
        response = await client.get(url)
        result = response.json()
    except Exception as e:
        result = f"Error: {e}"
    return result

@app.get("/dashboard")
async def get_dashboard(city: str = "London"):
    # Your implementation here
    async with httpx.AsyncClient() as client:
        tasks = [fetch_response(client, service_name, url, city) for service_name, url in SERS.items()]
        results = await asyncio.gather(*tasks)
    print(results)
    return dict(zip(SERS.keys(), results))