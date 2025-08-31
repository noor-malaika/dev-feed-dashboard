import { motion } from "framer-motion";

export default function GitHubSection({ repos }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold mb-4">🔥 Trending GitHub Repos</h2>
      <div className="space-y-3">
        {repos.slice(0, 5).map((repo) => (
          <div
            key={repo.id}
            className="p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {repo.full_name}
            </a>
            <p className="text-sm text-gray-500">
              ⭐ {repo.stargazers_count} | Forks: {repo.forks_count}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
