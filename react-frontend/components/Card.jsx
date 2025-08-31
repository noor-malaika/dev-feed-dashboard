import { motion } from "framer-motion";

export default function Card({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition cursor-pointer"
    >
      <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
      <div className="text-gray-600 text-sm">{children}</div>
    </motion.div>
  );
}
