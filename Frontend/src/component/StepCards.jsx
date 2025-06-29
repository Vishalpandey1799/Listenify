 
import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Add Content",
    description:
      "Paste text, upload files, or enter a URL to convert to audio.",
  },
  {
    number: "2",
    title: "AI Processing",
    description: "Our neural networks analyze and convert your content.",
  },
  {
    number: "3",
    title: "Enjoy Audio",
    description: "Listen to high-quality audio output instantly.",
  },
];

const StepCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="text-center relative group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10">{step.number}</span>
          </motion.div>
          <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
          <p className="text-gray-400 text-sm">{step.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StepCards;
