import { motion } from "framer-motion";

export default function StackOverflowSection({ questions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold mb-4">💡 Hot StackOverflow Questions</h2>
      <div className="space-y-3">
        {questions.slice(0, 5).map((q) => (
          <div key={q.question_id} className="p-3 rounded-lg hover:bg-gray-100">
            <a
              href={q.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {q.title}
            </a>
            <p className="text-sm text-gray-500">
              Asked by {q.owner.display_name} | Answers: {q.answer_count}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
