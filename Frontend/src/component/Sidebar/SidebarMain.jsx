import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "../Sidebar/Sidebar.js";
import { motion } from "framer-motion";
import { useAuthStore } from "../../Apicalls/Auth.api.js";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuthStore();
 
  const isDefaultActive =
    location.pathname === "/listenify" ||
    !Menu.some((item) => location.pathname === item.path);

  return (
    <motion.aside
      className="flex flex-col justify-between w-64 h-full fixed top-0 left-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 text-gray-100 p-4 shadow-2xl z-50 border-r border-gray-700/50"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-xl opacity-30"></div>
        <div className="absolute bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-xl opacity-30"></div>
      </div>

      <div className="flex flex-col gap-1">
        

     
        <div className="space-y-1">
          {Menu.map((item, index) => {
            const isActive =
              isDefaultActive && item.path === "/listenify/ai-tools"
                ? true
                : location.pathname === item.path;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-l-4 border-cyan-400 shadow-lg"
                      : "hover:bg-gray-700/30"
                  }`}
                >
                  <motion.div
                    className={`p-2 rounded-md ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md"
                        : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                    }`}
                    whileHover={!isActive ? { scale: 1.1 } : {}}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <item.icon size={20} />
                  </motion.div>
                  <span className="font-medium text-gray-200">{item.name}</span>
                  {isActive && (
                    <motion.div
                      className="ml-auto h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.5)]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </div>
      </div>

    
      <motion.button
        className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-fuchsia-600/90 to-pink-600/90 text-white font-medium mt-4 shadow-lg hover:shadow-fuchsia-500/20 transition-all"
        onClick={() => logout()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </motion.button>
    </motion.aside>
  );
};

export default Sidebar;
