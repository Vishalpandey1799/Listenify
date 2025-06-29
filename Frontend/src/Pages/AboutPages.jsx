import { motion } from "framer-motion";
import {
  Volume2,
  Cpu,
  Users,
  Globe,
  Award,
  Zap,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const AboutPages = () => {
  const features = [
    {
      icon: <Zap className="h-5 w-5 text-cyan-400" />,
      title: "Lightning Fast",
      description:
        "Convert content to audio in seconds with our optimized AI pipeline",
    },
    {
      icon: <Globe className="h-5 w-5 text-cyan-400" />,
      title: "Multi-Language",
      description: "Support for 20+ languages and regional accents",
    },
    {
      icon: <Cpu className="h-5 w-5 text-cyan-400" />,
      title: "Advanced AI",
      description: "State-of-the-art Murf text-to-speech technology",
    },
    {
      icon: <Users className="h-5 w-5 text-cyan-400" />,
      title: "User Focused",
      description: "Designed for seamless content consumption",
    },
  ];

  return (
    <div className="min-h-screen mt-5 bg-gray-900 text-white overflow-hidden relative">
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
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Listenify
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-400 text-center max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Revolutionizing content consumption through AI-powered audio
            transformation
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">
                Our{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Mission
                </span>
              </h2>
              <p className="text-gray-300 mb-4">
                At Listenify, we believe content should adapt to your lifestyle,
                not the other way around. Our mission is to make information
                consumption effortless, accessible, and enjoyable for everyone.
              </p>
              <p className="text-gray-300">
                Founded in 2025, we're pioneering the next generation of audio
                technology that bridges the gap between written content and
                natural listening experiences.
              </p>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-xl p-6 border border-cyan-400/20">
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="bg-cyan-400/10 p-1.5 rounded-lg mr-3">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-1.5 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">
              Ready to Transform Your Content?
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
              href="/create"
              className="relative group px-6 py-3 font-semibold text-white rounded-lg overflow-hidden text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
              <div className="relative z-10 flex items-center space-x-2">
                <span>Get Started Free</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
 
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPages;
