import { useEffect, useState } from "react";
import './index.css'
import GitHubSection from "../components/GitHubSection";
import StackOverflowSection from "../components/StackOverflowSection";
import HackerNewsSection from "../components/HackerNewsSection";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (!data) return <p className="p-6 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <h1 className="text-4xl font-bold text-center py-8">
        🚀 Dev Feed Dashboard
      </h1>

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GitHubSection repos={data.github?.github?.items || []} />
        <StackOverflowSection questions={data.stackoverflow?.stackoverflow?.items || []} />
        <HackerNewsSection stories={data.hackernews?.hackernews || []} />
      </div>
    </div>
  );
}
