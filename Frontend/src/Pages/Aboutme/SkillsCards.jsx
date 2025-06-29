import React from "react";
import { motion } from "framer-motion";

const skills = [
  { level: 88, icon: "⚛️", color: "from-blue-400 to-cyan-400" },
  { level: 78, icon: "🟢", color: "from-green-400 to-emerald-400" },
  { level: 70, icon: "🍃", color: "from-green-500 to-teal-400" },
  { level: 80, icon: "✨", color: "from-purple-400 to-pink-400" },
  { level: 75, icon: "🐻", color: "from-orange-400 to-red-400" },
  { level: 20, icon: "🧠", color: "from-indigo-400 to-purple-400" },
  { level: 68, icon: "🤖", color: "from-cyan-400 to-blue-400" },
  { level: 35, icon: "🐹", color: "from-teal-400 to-cyan-400" },
];

export default function SkillsCards() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{
                scale: 1.1,
                y: -3,
                boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
              }}
              className="group cursor-pointer relative"
            >
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 text-center relative overflow-hidden aspect-square flex flex-col items-center justify-center">
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Percentage - Top Right */}
                <div
                  className={`absolute top-1 right-1 text-xs font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                >
                  {skill.level}%
                </div>

                {/* Icon - Center */}
                <div className="text-2xl">{skill.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
