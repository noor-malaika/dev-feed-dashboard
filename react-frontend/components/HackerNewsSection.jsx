import { motion } from "framer-motion";

export default function HackerNewsSection({ stories }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold mb-4">🚀 HackerNews Stories</h2>
      <div className="space-y-3">
        {stories.slice(0, 5).map((story) => (
          <div key={story.id} className="p-3 rounded-lg hover:bg-gray-100">
            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {story.title}
            </a>
            <p className="text-sm text-gray-500">
              by {story.by} | Score: {story.score}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
