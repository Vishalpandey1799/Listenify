import { motion } from "framer-motion";
import {
  Link,
  FileText,
  Upload,
  Cpu,
  Headphones,
  ChevronRight,
  Sparkles,
  Volume2,
} from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <Link className="h-5 w-5" />,
      title: "Add Content",
      description:
        "Paste text, upload files, or enter any URL to convert to audio.",
      actions: [
        "Web article extraction",
        "PDF/document processing",
        "Direct text input",
      ],
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "AI Processing",
      description: "Our advanced neural networks transform your content.",
      actions: [
        "Natural language understanding",
        "Context-aware processing",
        "Multi-format compatibility",
      ],
    },
    {
      icon: <Headphones className="h-5 w-5" />,
      title: "Enjoy Audio",
      description: "Listen to high-quality, natural-sounding audio output.",
      actions: [
        "Multiple voice options",
        "Adjustable playback speed",
        "Cross-device sync",
      ],
    },
  ];

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

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-1.5 rounded-lg">
                <Volume2 className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Listenify
            </span>
          </div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            How It{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-400 text-center max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Transform your content into natural-sounding audio in just three
            simple steps
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-32 left-1/4 right-1/4 h-1 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-transparent z-0"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Step Card */}
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-400/30 transition-all h-full">
                  <div className="relative mb-6">
                    <motion.div
                      className="relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-75 blur-md group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">{step.icon}</div>
                    </motion.div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800 px-2 text-xs font-medium text-cyan-400">
                      Step {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm text-center mb-4">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.actions.map((action, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                        </div>
                        <span className="text-gray-300 text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow connector (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-32 right-0 transform translate-x-1/2">
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-cyan-400"
                      >
                        <path
                          d="M13 6L19 12L13 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="opacity-30"
                        />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demo CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-1.5 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">
              Experience the Magic
            </span>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/upload"
              className="relative group px-6 py-3 font-semibold text-white rounded-lg overflow-hidden text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
              <div className="relative z-10 flex items-center space-x-2">
                <span>Try It Now</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>

            <motion.a
              href="/features"
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all flex items-center space-x-2"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span>See All Features</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
