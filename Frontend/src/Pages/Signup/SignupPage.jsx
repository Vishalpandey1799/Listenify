import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Apicalls/Auth.api.js";
import toast from "react-hot-toast";

const SignupPage = () => {
  const { register } = useAuthStore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      const res = await register({ email, password });

      if (res.success) {
        toast.success("Registered Successfully");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative z-10 max-w-md mx-auto px-4 py-16">
        <motion.div
          className="flex items-center justify-center space-x-2 mb-8"
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

        <motion.div
          className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                placeholder="Create a password"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="relative group w-full px-6 py-3 font-semibold text-white rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  "Sign Up"
                )}
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
