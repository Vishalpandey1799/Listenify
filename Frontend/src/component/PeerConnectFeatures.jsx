import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  Mic,
  MessageSquare,
  Send,
  Check,
  FileText,
  Sparkles,
} from "lucide-react";

const PeerConnectFeatures = () => {
  const features = [
    {
      icon: <Video className="h-6 w-6 text-cyan-400" />,
      title: "Real-time Video Calls",
      description:
        "High-quality peer-to-peer video calls with low latency and crystal clear audio.",
      highlight: "No middle servers - direct encrypted connections",
    },
    {
      icon: <Mic className="h-6 w-6 text-purple-400" />,
      title: "Audio Chat",
      description:
        "Crisp audio conversations with noise suppression and echo cancellation.",
      highlight: "Works even on low bandwidth connections",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-pink-400" />,
      title: "Instant Messaging",
      description:
        "Send text messages, files and screenshots during your calls.",
      highlight: "End-to-end encrypted communications",
    },
    {
      icon: <Send className="h-6 w-6 text-blue-400" />,
      title: "Call Requests",
      description:
        "Send and receive call invitations with customizable permissions.",
      highlight: "Control who can connect with you",
    },
    {
      icon: <Check className="h-6 w-6 text-green-400" />,
      title: "Accept/Reject Controls",
      description:
        "Full control over incoming calls with simple accept/reject interface.",
      highlight: "Block unwanted callers permanently",
    },
    {
      icon: <FileText className="h-6 w-6 text-amber-400" />,
      title: "Assignment Generator",
      description:
        "AI-powered tool that creates structured assignments from your prompts.",
      highlight: "Supports multiple formats and complexity levels",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-indigo-400" />,
      title: "AI Study Tools",
      description:
        "Generate summaries, quizzes, and study guides from your materials.",
      highlight: "Tailored to your learning style",
    },
  
  ];

  return (
    <section id="peer-features" className="py-16 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-1.5 bg-gray-800/50 backdrop-blur-sm border border-purple-400/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">
              Collaborative Learning Suite
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect & Create with{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Peers
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful tools for real-time collaboration and AI-assisted learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-400/30 transition-all h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-3">{feature.description}</p>
              <div className="text-sm text-cyan-400 font-medium bg-gray-800/50 rounded-full px-3 py-1 inline-block">
                {feature.highlight}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="relative group px-6 py-3 font-semibold text-white rounded-lg overflow-hidden text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600"></div>
            <div className="relative z-10 flex items-center justify-center space-x-2">
              <span>Start Collaborating Now</span>
              <svg
                className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PeerConnectFeatures;
