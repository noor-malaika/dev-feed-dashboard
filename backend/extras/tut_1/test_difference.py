# simple_test.py
# Safe test that doesn't rely on external APIs

import requests
import time

BASE_URL = "http://127.0.0.1:8000"

def test_connection():
    """Test basic connection"""
    try:
        response = requests.get(f"{BASE_URL}/test-connection")
        return response.json()
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return None

def test_simple_async_vs_sync():
    """Test async vs sync with simple sleep operations"""
    print("🧪 Testing Simple Async vs Sync (No External APIs)")
    print("-" * 50)
    
    # Test async version
    print("Testing ASYNC version...")
    try:
        start = time.time()
        response = requests.get(f"{BASE_URL}/simple-async-demo")
        actual_time = time.time() - start
        result = response.json()
        print(f"✅ Async result: {result}")
        print(f"   Actual request time: {actual_time:.2f}s")
    except Exception as e:
        print(f"❌ Async test failed: {e}")
        return
    
    print()
    
    # Test sync version  
    print("Testing SYNC version...")
    try:
        start = time.time()
        response = requests.get(f"{BASE_URL}/simple-sync-demo")
        actual_time = time.time() - start
        result = response.json()
        print(f"✅ Sync result: {result}")
        print(f"   Actual request time: {actual_time:.2f}s")
    except Exception as e:
        print(f"❌ Sync test failed: {e}")
        return
    
    print("\n📊 Summary:")
    print("- Async: Multiple tasks run at the same time")
    print("- Sync: Tasks run one after another")
    print("- This is the foundation of why async is faster for I/O!")

def test_safe_api_calls():
    """Test the safer API calling endpoints"""
    print("\n🌐 Testing Safe API Calls")
    print("-" * 30)
    
    # Test async API calls
    print("Testing ASYNC API calls...")
    try:
        response = requests.get(f"{BASE_URL}/async-multi-api-safe")
        result = response.json()
        print(f"✅ Async API calls: {result['total_time']}")
        print(f"   Successful: {result['successful_calls']}/{result['total_calls']}")
    except Exception as e:
        print(f"❌ Async API test failed: {e}")
    
    # Test sync API calls
    print("\nTesting SYNC API calls...")
    try:
        response = requests.get(f"{BASE_URL}/sync-multi-api-safe") 
        result = response.json()
        print(f"✅ Sync API calls: {result['total_time']}")
        print(f"   Successful: {result['successful_calls']}/{result['total_calls']}")
    except Exception as e:
        print(f"❌ Sync API test failed: {e}")

if __name__ == "__main__":
    print("🚀 Simple Async vs Sync Test")
    print("=" * 40)
    
    # Test connection first
    print("Testing connection...")
    connection_result = test_connection()
    if not connection_result:
        print("❌ Cannot connect to server!")
        print("Make sure to run: uvicorn main:app --reload")
        exit(1)
    
    print(f"✅ Server running: {connection_result['message']}")
    print()
    
    # Run the simple test (no external dependencies)
    test_simple_async_vs_sync()
    
    # Try the API test (might fail if internet issues)
    test_safe_api_calls()
    
    print("\n" + "=" * 40)
    print("🎯 Day 1 Complete!")
    print("You now understand async vs sync!")
    print("Next: Day 2 - Connect to ML models")
    print("=" * 40)