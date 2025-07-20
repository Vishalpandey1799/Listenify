 
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronRight,
  Video,
  Mic,
  MessageSquare,
 
  BookOpen,
 
  Upload,
 
  Headphones,
  Bot,
  FileImage,
  PenTool,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const allFeatures = [
    {
      icon: <Video className="h-6 w-6 text-cyan-400" />,
      title: "HD Video Calls",
      description:
        "Crystal clear one-to-one and group video calls with low latency",
      category: "Communication",
    },
    {
      icon: <Mic className="h-6 w-6 text-purple-400" />,
      title: "Audio Chat",
      description: "High-quality audio conversations with noise cancellation",
      category: "Communication",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-pink-400" />,
      title: "Real-time Chat",
      description: "Instant messaging with file sharing and emoji reactions",
      category: "Communication",
    },
    {
      icon: <Upload className="h-6 w-6 text-blue-400" />,
      title: "Document Upload",
      description: "Support for PDF, DOCX, images, and diagram files",
      category: "Content",
    },
    {
      icon: <Bot className="h-6 w-6 text-green-400" />,
      title: "AI Document Chat",
      description: "Ask questions and get answers from your uploaded documents",
      category: "AI Tools",
    },
    {
      icon: <Headphones className="h-6 w-6 text-amber-400" />,
      title: "Text-to-Audio",
      description: "Convert any text into natural speech with multiple voices",
      category: "AI Tools",
    },
    {
      icon: <PenTool className="h-6 w-6 text-indigo-400" />,
      title: "Assignment Generator",
      description: "Create custom assignments and quizzes from any document",
      category: "AI Tools",
    },
    {
      icon: <FileImage className="h-6 w-6 text-red-400" />,
      title: "Diagram Support",
      description: "Upload and analyze diagrams, charts, and visual content",
      category: "Content",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-teal-400" />,
      title: "Study Summaries",
      description: "AI-generated summaries and key points from your materials",
      category: "AI Tools",
    },
  ];
 

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
        <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
        <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
        </motion.div>
      </div>
     

      
      <section className="py-24 bg-gradient-to-b from-gray-900/50 to-gray-800/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-2 mb-6">
              <Star className="h-5 w-5 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">
                Complete Feature Suite
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Excel
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              From document analysis to real-time collaboration, our platform
              offers comprehensive tools for modern learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
            {allFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-400/40 transition-all h-full group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-700/50 group-hover:bg-gray-700/80 transition-colors">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-purple-400 transition-colors">
                        {feature.title}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-700/30 px-2 py-1 rounded-full">
                        {feature.category}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="relative group px-8 py-4 font-semibold rounded-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <Link to="/listenify/ai-tools">Start Collaborating Now</Link>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>

    
    </div>
  );
};

export default HomePage;
