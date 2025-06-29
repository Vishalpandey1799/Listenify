import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Loader = ({
  size = "default",
  text = "Processing...",
  className = "",
}) => {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-10 w-10",
  };

  return (
    <motion.div
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute rounded-full bg-cyan-400/20 blur-md"
        initial={{ scale: 0.9, opacity: 0.6 }}
        animate={{ scale: 1.3, opacity: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Loader2
          className={`${sizeClasses[size]} text-cyan-400 drop-shadow-md`}
          strokeWidth={2.5}
        />
      </motion.div>

      <motion.p
        className="mt-4 text-cyan-300 text-base md:text-lg font-medium"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

export default Loader;
