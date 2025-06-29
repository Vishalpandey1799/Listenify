import { motion } from "framer-motion";
import { Globe, Upload, FileText, Mic, Zap, Headphones } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Smart Web Extraction",
    description:
      "Advanced AI extracts clean content from any URL, filtering out ads and noise.",
  },
  {
    icon: Upload,
    title: "PDF Processing",
    description:
      "Upload complex PDFs and our AI understands structure for natural audio flow.",
  },
  {
    icon: FileText,
    title: "Text Conversion",
    description:
      "Paste any text and experience instant transformation with natural voice.",
  },
  {
    icon: Mic,
    title: "Neural Voices",
    description: "State-of-the-art Murf AI generates human-like voices.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description:
      "Lightning-speed conversion powered by optimized AI algorithms.",
  },
  {
    icon: Headphones,
    title: "Sync Experience",
    description: "Your audio library follows you across all devices.",
  },
];

const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="relative group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-all duration-300 h-full">
            <div className="relative mb-4">
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-600/10 p-3 rounded-lg w-fit border border-cyan-400/20">
                <feature.icon className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureCards;
