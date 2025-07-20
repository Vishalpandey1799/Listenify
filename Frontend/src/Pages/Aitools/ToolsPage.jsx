import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mic,
  FileText,
  Video,
  Camera,
  Zap,
  ArrowRight,
  Play,
  Download,
  Upload,
  Image,
  Globe,
  BookOpen,
  Palette,
  Bot,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ToolsPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [hoveredTool, setHoveredTool] = useState(null);

  let navigate = useNavigate();

  const tools = [
    {
      id: 1,
      title: "Voice Conversion",
      description:
        "Transform your voice into different styles, accents, or even convert speech to different languages with AI-powered voice cloning.",
      icon: Mic,
      gradient: "from-cyan-500 to-blue-600",
      features: [
        "Voice Cloning",
        "Accent Change",
        "Language Conversion",
        "Real-time Processing",
      ],
      buttonText: "Start Converting",
      path: "/listenify/voice-conversion",
      status: "Popular",
      category: "Audio",
    },
    {
      id: 2,
      title: "Assignment PDF Generator",
      description:
        "Convert your text, notes, or research into professionally formatted PDF assignments with citations and proper formatting.",
      icon: FileText,
      gradient: "from-purple-500 to-pink-600",
      features: [
        "Auto Formatting",
        "Citation Generator",
        "Template Library",
        "Export Options",
      ],
      buttonText: "Create PDF",
      path : "/listenify/pdfgenerator",
      status: "New",
      category: "Document",
    },
    {
      id: 3,
      title: "Website Screen Recorder",
      description:
        "Record full-page screenshots or create video tutorials of websites with annotations and editing tools.",
      icon: Video,
      gradient: "from-emerald-500 to-teal-600",
      features: [
        "Full Page Capture",
        "Video Recording",
        "Annotation Tools",
        "HD Export",
      ],
      buttonText: "Start Recording",
      status: "Trending",
      category: "Media",
    },
    {
      id: 4,
      title: "Website to PDF Converter",
      description:
        "Capture entire websites as high-quality PDFs with preserved formatting, images, and interactive elements.",
      icon: Camera,
      gradient: "from-orange-500 to-red-600",
      features: [
        "Full Site Capture",
        "Batch Processing",
        "Custom Layouts",
        "Print Ready",
      ],
      buttonText: "Capture Now",
      status: "Popular",
      category: "Document",
    },
  
    // {
    //   id: 5,
    //   title: "Website Analysis Tool",
    //   description:
    //     "Analyze any website for SEO, performance, accessibility, and security issues with detailed reports and recommendations.",
    //   icon: Globe,
    //   gradient: "from-blue-500 to-indigo-600",
    //   features: [
    //     "SEO Analysis",
    //     "Performance Check",
    //     "Security Scan",
    //     "Mobile Optimization",
    //   ],
    //   buttonText: "Analyze Site",
    //   status: "Pro",
    //   category: "Analytics",
    // },
    // {
    //   id: 6,
    //   title: "Study Notes Generator",
    //   description:
    //     "Transform any content into organized study notes with summaries, key points, and interactive flashcards.",
    //   icon: BookOpen,
    //   gradient: "from-green-500 to-emerald-600",
    //   features: [
    //     "Auto Summarization",
    //     "Flashcard Creation",
    //     "Mind Maps",
    //     "Quiz Generation",
    //   ],
    //   buttonText: "Create Notes",
    //   status: "Student Favorite",
    //   category: "Education",
    // },
    // {
    //   id: 8,
    //   title: "Color Palette Extractor",
    //   description:
    //     "Extract beautiful color palettes from images or websites for your design projects with hex codes and gradients.",
    //   icon: Palette,
    //   gradient: "from-pink-500 to-rose-600",
    //   features: [
    //     "Image Analysis",
    //     "Palette Export",
    //     "Gradient Generator",
    //     "Brand Colors",
    //   ],
    //   buttonText: "Extract Colors",
    //   status: "Designer's Choice",
    //   category: "Design",
    // },
  ];

  const categories = [
    "All",
    "Audio",
    "Document",
    "Media",
    "Creative",
    "Analytics",
    "Education",
    "Design",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools =
    selectedCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-green-500";
      case "Popular":
        return "bg-blue-500";
      case "Trending":
        return "bg-purple-500";
      case "Hot":
        return "bg-red-500";
      case "Pro":
        return "bg-yellow-500";
      default:
        return "bg-cyan-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
        <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
        </motion.div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-2 mb-6">
              <Zap className="h-5 w-5 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">
                AI-Powered Tools
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Supercharge Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Productivity
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Access powerful AI tools designed to streamline your workflow and
              boost creativity. From voice conversion to website analysis, we've
              got you covered.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onHoverStart={() => setHoveredTool(tool.id)}
                onHoverEnd={() => setHoveredTool(null)}
              >
                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 ${getStatusColor(
                    tool.status
                  )} text-white text-xs px-2 py-1 rounded-full font-medium`}
                >
                  {tool.status}
                </div>

                {/* Background Gradient on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredTool === tool.id ? 0.1 : 0 }}
                />

                {/* Icon */}
                <div
                  className={`relative w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <tool.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {tool.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300 text-xs">{feature}</span>
                      </div>
                    ))}
                    {tool.features.length > 2 && (
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300 text-xs">
                          +{tool.features.length - 2} more features
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className={`w-full bg-gradient-to-r ${tool.gradient} text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(tool.path)}
                  >
                    <span>{tool.buttonText}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredTool === tool.id ? 1 : 0 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
              <Bot className="h-12 w-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Need a{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Custom Tool?
                </span>
              </h3>
              <p className="text-gray-400 mb-6">
                Can't find what you're looking for? Let us know what tool would
                help you most, and we'll build it!
              </p>
              <motion.button
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Request Tool</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
