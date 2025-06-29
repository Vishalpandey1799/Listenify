import { motion } from "framer-motion";
import { Volume2, AlertTriangle, Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 h-screen flex flex-col items-center justify-center text-center">
        {/* Branding */}
        <motion.div
          className="flex items-center space-x-2 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75"></div>
            <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-1.5 rounded-lg">
              <Volume2 className="h-5 w-5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Listenify
          </span>
        </motion.div>

        {/* 404 Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Animated Triangle Icon */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-75"></div>
            <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full w-24 h-24 flex items-center justify-center">
              <AlertTriangle className="h-10 w-10" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            404
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-gray-400 mb-8 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="/"
              className="relative group px-6 py-3 font-semibold text-white rounded-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Return Home</span>
              </div>
            </motion.a>

            <motion.a
              href="/upload"
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all flex items-center justify-center space-x-2"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/create">Start Creating</Link>
              <ChevronRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
