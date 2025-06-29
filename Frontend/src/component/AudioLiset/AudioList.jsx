import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Loader } from "lucide-react";
import { format } from "timeago.js";

export default function AudioList({ latestAudio }) {
  if (!latestAudio) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="text-cyan-400 animate-spin" />
      </div>
    );
  }
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    audioRefs.current.forEach((a, i) => {
      if (i !== index && a && !a.paused) {
        a.pause();
      }
    });

    if (audio.paused) {
      audio.play();
      setCurrentPlaying(index);
    } else {
      audio.pause();
      setCurrentPlaying(null);
    }
  };

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="space-y-3">
        {latestAudio.map((item, index) => (
          <motion.div
            key={item._id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-cyan-400/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-400/10 p-2 rounded-lg">
                  <Headphones className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-200 truncate max-w-[250px]">
                    {item.parsedText.slice(0, 40)}...
                  </h3>
                  <p className="text-xs text-gray-500">
                    {format(item.createdAt)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handlePlayPause(index)}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                {currentPlaying === index ? "Pause" : "Play"}
              </button>

              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                src={item.audio}
                preload="auto"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
