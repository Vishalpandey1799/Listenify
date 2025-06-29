import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, Menu, X, LeafyGreen, Mic, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Apicalls/Auth.api.js";

const Navbar = () => {
  const { user, logout, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkingAuth();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-800"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-1.5 rounded-lg">
                <Volume2 className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              <Link to="/">Listenify</Link>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6 relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2  mt-1 px-4 py-2 rounded-2xl text-green-400  hover:bg-gray-800 transition-all duration-200"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>

              <Mic className="w-4 h-4" />

              <Link to="/live-talk" className="text-sm font-mono">
                Live Talk
              </Link>
            </motion.button>

            <motion.button
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-sm"
              whileHover={{ y: -2 }}
            >
              <Link to="/about">About </Link>
            </motion.button>

            {!user ? (
              <motion.button
                className="px-4 py-1.5 text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all font-medium text-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(34, 211, 238, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup">Join Now</Link>
              </motion.button>
            ) : (
              <div className="relative flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={user.userImage}
                    alt="user"
                    className="h-8 w-8 rounded-full cursor-pointer border border-cyan-400"
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-0 top-full mt-2 w-40 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-md py-2 z-50"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-700 text-sm"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => logout()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
                  <Headphones className="w-5 h-5 text-cyan-400" />
                  <span className="font-medium text-cyan-100">
                    {user?.audioCredits || 0}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-1 text-gray-300 hover:text-cyan-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-2 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg mt-2 border border-gray-700">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2  mt-2 px-4 py-2 rounded-2xl text-green-400  hover:bg-gray-800 transition-all duration-200"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>

              <Mic className="w-4 h-4" />

              <span className="font-medium">Live Talk</span>
            </motion.button>

            <a
              href="/about"
              className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors text-sm"
            >
              About
            </a>
            {!user ? (
              <button className="w-full text-left px-3 py-2 text-cyan-400 border border-cyan-400/30 rounded-md mt-1 hover:bg-cyan-400/10 transition-colors text-sm">
                <Link to="/signup">Join Now</Link>
              </button>
            ) : (
              <>
                <button className="w-full text-left px-3 py-2 text-cyan-400 border border-fuchsia-400/30 rounded-md mt-1 hover:bg-cyan-400/10 transition-colors text-sm">
                  <Link to="/profile">Profile</Link>
                </button>
                <button
                  className="w-full text-left px-3 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-md mt-1 text-sm"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
