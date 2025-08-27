# fixed_real_world_demo.py
# Replace the previous real_world_demo code with this safer version

import httpx
import requests
import asyncio
import time
from fastapi import FastAPI

app = FastAPI()

# SAFE API call helper
async def safe_api_call(client: httpx.AsyncClient, url: str):
    """Make a safe API call with proper error handling"""
    try:
        response = await client.get(url, timeout=10.0)
        return {
            "url": url,
            "status": response.status_code,
            "success": True,
            "data": response.json() if response.status_code == 200 else None,
            "error": None
        }
    except Exception as e:
        return {
            "url": url,
            "status": 0,
            "success": False, 
            "data": None,
            "error": str(e)
        }

def safe_api_call_sync(url: str):
    """Make a safe synchronous API call"""
    try:
        response = requests.get(url, timeout=10)
        return {
            "url": url,
            "status": response.status_code,
            "success": True,
            "data": response.json() if response.status_code == 200 else None,
            "error": None
        }
    except Exception as e:
        return {
            "url": url, 
            "status": 0,
            "success": False,
            "data": None,
            "error": str(e)
        }

# FIXED: Multiple API calls with error handling
@app.get("/async-multi-api-safe")
async def async_multiple_apis_safe():
    """Async: Make multiple API calls concurrently (with error handling)"""
    start_time = time.time()
    
    # Use reliable, simple APIs
    urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/users/1", 
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/users/2"
    ]
    
    async with httpx.AsyncClient() as client:
        # Make all calls concurrently
        tasks = [safe_api_call(client, url) for url in urls]
        results = await asyncio.gather(*tasks)
    
    end_time = time.time()
    
    successful_calls = [r for r in results if r["success"]]
    failed_calls = [r for r in results if not r["success"]]
    
    return {
        "method": "async",
        "total_time": f"{end_time - start_time:.2f}s",
        "total_calls": len(urls),
        "successful_calls": len(successful_calls),
        "failed_calls": len(failed_calls),
        "results": results,
        "note": "All API calls attempted concurrently!"
    }

@app.get("/sync-multi-api-safe")
def sync_multiple_apis_safe():
    """Sync: Make multiple API calls one by one (with error handling)"""
    start_time = time.time()
    
    urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/users/1",
        "https://jsonplaceholder.typicode.com/posts/2", 
        "https://jsonplaceholder.typicode.com/users/2"
    ]
    
    results = []
    for url in urls:
        result = safe_api_call_sync(url)
        results.append(result)
    
    end_time = time.time()
    
    successful_calls = [r for r in results if r["success"]]
    failed_calls = [r for r in results if not r["success"]]
    
    return {
        "method": "sync",
        "total_time": f"{end_time - start_time:.2f}s", 
        "total_calls": len(urls),
        "successful_calls": len(successful_calls),
        "failed_calls": len(failed_calls),
        "results": results,
        "note": "API calls made one after another"
    }

# SIMPLER: Local async vs sync demo (no external APIs)
@app.get("/simple-async-demo")
async def simple_async_demo():
    """Simple async demo with just sleep (no external APIs)"""
    start_time = time.time()
    
    # Simulate 3 different "tasks" running concurrently
    tasks = [
        asyncio.sleep(1),  # Task 1: 1 second
        asyncio.sleep(2),  # Task 2: 2 seconds  
        asyncio.sleep(1.5) # Task 3: 1.5 seconds
    ]
    
    # All run at the same time - total time = longest task (2 seconds)
    await asyncio.gather(*tasks)
    
    end_time = time.time()
    
    return {
        "method": "async",
        "individual_task_times": [1, 2, 1.5],
        "total_time": f"{end_time - start_time:.2f}s",
        "expected_time": "~2.0s (longest task)",
        "note": "Tasks ran concurrently!"
    }

@app.get("/simple-sync-demo")
def simple_sync_demo():
    """Simple sync demo with just sleep (no external APIs)"""
    start_time = time.time()
    
    # Simulate 3 different "tasks" running one after another
    task_times = [1, 2, 1.5]
    
    for task_time in task_times:
        time.sleep(task_time)  # Each task blocks until complete
    
    end_time = time.time()
    
    return {
        "method": "sync", 
        "individual_task_times": task_times,
        "total_time": f"{end_time - start_time:.2f}s",
        "expected_time": f"~{sum(task_times)}s (sum of all tasks)",
        "note": "Tasks ran one after another"
    }

# Test endpoint to verify everything works
@app.get("/test-connection")
async def test_connection():
    """Simple test to verify your server is working"""
    return {
        "status": "working",
        "message": "Server is running correctly!",
        "timestamp": time.time(),
        "async": True
    }