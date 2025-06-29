import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Pause, ChevronRight, Sparkles } from "lucide-react";
import StepCards from "./StepCards";
import FeatureCards from "./FeaturesCard/FeatureCards";

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const audioFiles = {
    hindi: "https://res.cloudinary.com/djco5529g/video/upload/v1750689007/diwxfeacvo44a8lu16ep.wav",
    english: "https://res.cloudinary.com/djco5529g/video/upload/v1750689407/ibnirnr5iurggrpfjxe7.wav"
  };

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      if (!duration) {
        setDuration(audio.duration || 0);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('durationchange', () => setDuration(audio.duration));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('durationchange', () => setDuration(audio.duration));
    };
  }, [duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentAudio]);

  const togglePlay = (language) => {
    if (currentAudio !== language) {
      setCurrentAudio(language);
      audioRef.current.src = audioFiles[language];
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
     
      <audio ref={audioRef} />
      
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
        <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
        </motion.div>
      </div>

      <section className="pt-28 pb-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-1.5 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">
                AI-Powered Audio Conversion
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transform Text Into{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Immersive Audio
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Turn articles, PDFs, and custom text into premium-quality audio with
            our revolutionary AI technology.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              className="relative group px-6 py-3 font-semibold text-white rounded-lg overflow-hidden text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
              <div className="relative z-10 flex items-center space-x-2">
                <Link to="/create">Get Started</Link>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            <motion.button
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all flex items-center space-x-2"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => togglePlay('english')}
            >
              {isPlaying && currentAudio === 'english' ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span>English Demo</span>
            </motion.button>

            <motion.button
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:border-purple-400 hover:text-purple-400 hover:bg-purple-400/5 transition-all flex items-center space-x-2"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(192, 132, 252, 0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => togglePlay('hindi')}
            >
              {isPlaying && currentAudio === 'hindi' ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span>Hindi Demo</span>
            </motion.button>
          </motion.div>

          {/* Demo Audio Player */}
          {(currentAudio === 'english' || currentAudio === 'hindi') && (
            <motion.div
              className="relative max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-4">
                  <motion.button
                    className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-full text-white shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => togglePlay(currentAudio)}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </motion.button>
                  <div className="flex-1">
                    <div className="bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-cyan-400 font-medium">
                        {currentAudio === 'english' ? 'English' : 'Hindi'} Demo • AI Voice
                      </span>
                      <span className="text-gray-400">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section id="features" className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Next-Gen Audio{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cutting-edge features that redefine how you consume content
            </p>
          </motion.div>

          <FeatureCards />
        </div>
      </section>
 
    </div>
  );
};

export default HomePage;