import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  Code,
  GraduationCap,
  BookOpen,
  Cpu,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Zap,
} from "lucide-react";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const skills = [
    { name: "React.js", level: 88 },
    { name: "Node.js & Express", level: 78 },
    { name: "MongoDB", level: 70 },
    { name: "Framer Motion", level: 80 },
    { name: "Zustand & State Management", level: 75 },

    { name: "RAG Basics", level: 20 },
    { name: "AI Integration (OpenAI/Gemini)", level: 68 },
    { name: "Go (Golang)", level: 35 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Building the{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Future
            </span>{" "}
            with Code
          </motion.h1>

          <motion.p
            className="text-lg text-gray-400 text-center max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            BCA Final Year Student | MERN Stack Developer | Tech Explorer
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* About Card */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Code className="h-5 w-5 text-cyan-400 mr-2" />
                About Me
              </h2>
              <p className="text-gray-300 mb-4">
                Hey! I'm Vishal — a full-stack developer currently in my final
                year of BCA. I enjoy building practical web apps that are clean,
                responsive, and easy to use.
              </p>
              <p className="text-gray-300 mb-4">
                I mostly work with the MERN stack, and I've also explored
                integrating basic AI features into apps, like using APIs or
                simple RAG concepts. I’m not into fancy titles — I just like
                creating things that solve real problems.
              </p>
              <p className="text-gray-300">
               I believe in showing
                progress through action. Every day, I try to become just 1%
                better than yesterday.
              </p>
            </div>

            {/* Skills Card */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="h-5 w-5 text-cyan-400 mr-2" />
                Skills & Technologies
              </h2>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-cyan-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 text-cyan-400 mr-2" />
                Education
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-200">
                    Bachelor of Computer Applications (BCA)
                  </h3>
                  <p className="text-sm text-gray-400">Final Year Student</p>
                  <p className="text-xs text-gray-500 mt-1">2022 - 2025</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 text-cyan-400 mr-2" />
                Currently Learning
              </h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  Deep dive into RAG (Retrieval-Augmented Generation)
                </li>
                <li className="flex items-center">
                  Clean Architecture & scalable project structure
                </li>
                <li className="flex items-center">
                  Exploring Go (Golang) out of curiosity
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Cpu className="h-5 w-5 text-cyan-400 mr-2" />
                Let's Connect
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <motion.a
                  href="https://github.com/Vishalpandey1799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                  whileHover={{ y: -3 }}
                >
                  <Github className="h-5 w-5 text-gray-300" />
                  <span className="ml-2 text-gray-300">GitHub</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/vishal-kumar-3835a9330/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                  whileHover={{ y: -3 }}
                >
                  <Linkedin className="h-5 w-5 text-gray-300" />
                  <span className="ml-2 text-gray-300">LinkedIn</span>
                </motion.a>
           
                <motion.a
                  href="mailto:vishalpandey1799@gmail.com"
                  className="flex items-center justify-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                  whileHover={{ y: -3 }}
                >
                  <Mail className="h-5 w-5 text-gray-300" />
                  <span className="ml-2 text-gray-300">Email</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-gray-900 text-sm text-gray-400">
                CODE PHILOSOPHY
              </span>
            </div>
          </div>
          <blockquote className="mt-8 max-w-2xl mx-auto text-xl italic text-gray-300">
            "The best way to predict the future is to implement it. Every line
            of code is a step toward building something that matters."
          </blockquote>
          <p className="mt-2 text-cyan-400 font-medium">— Vishal</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
