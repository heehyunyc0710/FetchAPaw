import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-main bg-opacity-50 z-50 gap-10">
      <motion.i
        className="fa-solid fa-paw text-yellow-500 text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0], y: [10, -10, 0] }}
        transition={{
          duration: 1,

          ease: "easeInOut",
        }}
      />

      <motion.i
        className="fa-solid fa-paw text-yellow-500 text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0], y: [10, -10, 0] }}
        transition={{
          duration: 1,
          delay: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.i
        className="fa-solid fa-paw text-yellow-500 text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0], y: [10, -10, 0] }}
        transition={{
          duration: 1,
          delay: 1.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Loader;
