import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Volume2, Sparkles, Zap } from "lucide-react";
import { useAuthStore } from "../../Apicalls/Auth.api.js";
import Aibot from "../../assets/Aibot.json";
import Lottie from "lottie-react";
import { useRef } from "react";
import { useEffect } from "react";

import { useTalkingTom } from "../../Apicalls/talkingTom.js";

const VoiceInterface = () => {
  const { sendToBackend, currentAudio } = useTalkingTom();
  console.log(currentAudio);
  const [isUserRecording, setIsUserRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [status, setStatus] = useState("Waiting for your voice...");

  const streamRef = useRef(null);
  const recorderRef = useRef(null);

  const { user } = useAuthStore();

  async function getAudio() {
    if (!isUserRecording) {
      try {
        setStatus("🎙 Listening...");
        setIsUserRecording(true);

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // streamRef.current = stream;

        const chunks = [];
        const recorder = new MediaRecorder(stream);
        recorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        recorder.onstop = async () => {
          setStatus("🧠 Transcribing...");
          setIsUserRecording(false);

          const blob = new Blob(chunks, { type: "audio/webm" });
          console.log("Audio Blob:", blob);

          setStatus("Thinking..");
          const res = await sendToBackend(blob);
          setStatus("Waiting for the next ");
          console.log(res);
          stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
        setStatus("🎤 Listening");
      } catch (err) {
        console.error("Mic access error", err);
        setStatus("❌ Mic access denied");
        setIsUserRecording(false);
      }
    } else {
      recorderRef.current.stop();
      setStatus("⏳ Processing...");
    }
  }

  useEffect(() => {
    const audio = new Audio(currentAudio);
    setIsAISpeaking(true);

    if (!audio) return;

    audio.play().catch((err) => {
      console.warn("Autoplay failed:", err);
      setIsAISpeaking(false);
    });

    audio.onended = () => {
      setIsAISpeaking(false);
    };
  }, [currentAudio]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen mt-10 bg-gray-900 text-white overflow-hidden relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
        </div>
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-2 mb-4">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-medium">
            Voice Conversation Interface
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">
          AI <span className="text-cyan-400">Voice</span>{" "}
          <span className="text-purple-400">Interaction</span>
        </h1>
      </motion.header>

      {/* Main Interface */}
      <div className="relative z-10 flex items-center justify-center p-6 min-h-[70vh]">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* AI Side */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative mb-6">
                {/* AI Avatar */}
                <motion.div
                  className="relative mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1 mb-6"
                  animate={
                    isAISpeaking
                      ? {
                          scale: [1, 1.02, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(34, 211, 238, 0.4)",
                            "0 0 0 15px rgba(34, 211, 238, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    repeat: isAISpeaking ? Infinity : 0,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <Lottie animationData={Aibot} loop={true} />
                  </div>

                  {isAISpeaking && (
                    <motion.div
                      className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Volume2 className="h-4 w-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-cyan-400">
                AI Assistant
              </h3>
              <p className="text-gray-400 mb-6">Will respond when you speak</p>

              {/* AI Voice Button */}

              {/* AI Status */}
              <div className="mt-6">
                <motion.div
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                    isAISpeaking
                      ? "bg-green-500/20 border border-green-500/30"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  <Zap
                    className={`h-4 w-4 ${
                      isAISpeaking ? "text-green-400" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      isAISpeaking ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {isAISpeaking ? "Speaking..." : status}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* User Side */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative mb-6">
                {/* User Avatar */}
                <motion.div
                  className="relative mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-1 mb-6"
                  animate={
                    isUserRecording
                      ? {
                          scale: [1, 1.02, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(192, 38, 211, 0.4)",
                            "0 0 0 15px rgba(192, 38, 211, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    repeat: isUserRecording ? Infinity : 0,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <img
                      src={user?.userImage}
                      alt="userImage"
                      loading="lazy"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Recording Indicator */}
                  {isUserRecording && (
                    <motion.div
                      className="absolute -bottom-2 -right-2 bg-red-500 rounded-full p-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-purple-400">You</h3>
              <p className="text-gray-400 mb-6">Press to speak</p>

              {/* User Mic Button */}
              <motion.button
                className={`p-5 rounded-full ${
                  isUserRecording
                    ? "bg-red-500 shadow-lg shadow-red-500/20"
                    : "bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20 hover:from-purple-600 hover:to-pink-700"
                } transition-all`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getAudio}
                disabled={isAISpeaking}
              >
                <Mic className="h-8 w-8 text-white" />
              </motion.button>

              {/* User Status */}
              <div className="mt-6">
                <motion.div
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                    isUserRecording
                      ? "bg-red-500/20 border border-red-500/30"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isUserRecording ? "bg-red-400" : "bg-gray-400"
                    }`}
                  ></div>
                  <span
                    className={`text-sm ${
                      isUserRecording ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    {isUserRecording ? "Recording..." : "Ready to speak"}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Connection Status */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="inline-flex items-center justify-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 mx-auto max-w-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                Voice connection active
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 p-4 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        Press and hold to speak • AI will respond automatically
      </motion.footer>
    </div>
  );
};

export default VoiceInterface;
