import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAudioStore } from "../../Apicalls/Audio.apis.js";
import { toast } from "react-hot-toast";

import {
  Volume2,
  Link,
  FileText,
  Upload,
  ChevronRight,
  X,
  Loader,
  Check,
  Headphones,
  Languages,
  ChevronDown,
  AlertCircle,
  Sparkles,
  LucideAngry,
  Loader2,
} from "lucide-react";
import AudioList from "../../component/AudioLiset/AudioList.jsx";

const UploadPage = () => {
  const {
    createWithUrl,
    createWithPdf,
    createWithText,
    getResponse,
    getLatestAudios,
    latestAudio,
  } = useAudioStore();
  const [activeTab, setActiveTab] = useState("url");
  const [language, setLanguage] = useState("English");
  const [voice, setVoice] = useState("Male");
  const [type, setType] = useState({
    withurl: false,
    withfile: false,
    withtext: false,
    getresponse: false,
  });
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    getLatestAudios();
  }, []);

  console.log(latestAudio);
  let formdata = new FormData();
  formdata.append("file", file);
  formdata.append("language", language);
  formdata.append("voice", voice);

  const handleResponse = async () => {
    try {
      if (!text || text === "") {
        return;
      }

      if (text.trim().split(/\s+/).length < 5) {
        toast.error("At least 5 words");
        return;
      }

      let payload = {
        text,
        language: language || null,
        voice: voice || null,
      };

      setType({ ...type, getresponse: true });
      let res = await getResponse(payload);

      if (res.success) {
        setText(res?.data?.simplified);
        toast.success("Now click on convert to audio");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setType({
        ...type,
        getresponse: false,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      switch (true) {
        case type.withurl: {
          if (!url || url.trim() === "") {
            toast.error("Paste any public URL");
            break;
          }

          const payload = {
            url,
            voice: voice || null,
            language: language || null,
          };

          const res = await createWithUrl(payload);
          setType({ ...type, withurl: false });
          if (res.success) {
            toast.success(res.message);
            setUrl("");
          } else {
            toast.error(res.message || "Something went wrong with URL");
          }
          break;
        }

        case type.withfile: {
          if (!file) {
            toast.error("Please select a file");
            break;
          }

          if (file.size > 5 * 1024 * 1024) {
            toast.error("File limit is 5MB");
            break;
          }

          const res = await createWithPdf(formdata);
          setType({ ...type, withfile: false });

          if (res.success) {
            toast.success(res.message);
            setFile(null);
          } else {
            toast.error(res.message || "Something went wrong with file");
          }
          break;
        }

        case type.withtext: {
          if (!text || text.trim().length <= 100) {
            toast.error("Please enter atleast 100 words");
            break;
          }

          console.log(text);
          const payload = {
            text,
            voice: voice || null,
            language: language || null,
          };

          const res = await createWithText(payload);
          setType({ ...type, withtext: false });

          if (res.success) {
            toast.success(res.message);
            setText("");
          } else {
            toast.error(res.message || "Something went wrong with text");
          }
          break;
        }

        default: {
          return;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

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

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Transform Your Content Into{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Audio
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-400 text-center max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Convert URLs, text, or PDFs into high-quality audio in seconds
          </motion.p>
        </motion.div>

        {/* Content Upload Card */}
        <motion.div
          className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              className={`flex-1 py-4 font-medium text-sm ${
                activeTab === "url"
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("url")}
            >
              <div className="flex items-center justify-center space-x-2">
                <Link className="h-4 w-4" />
                <span>URL</span>
              </div>
            </button>
            <button
              className={`flex-1 py-4 font-medium text-sm ${
                activeTab === "text"
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("text")}
            >
              <div className="flex items-center justify-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Text</span>
              </div>
            </button>
            <button
              className={`flex-1 py-4 font-medium text-sm ${
                activeTab === "file"
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("file")}
            >
              <div className="flex items-center justify-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>File</span>
              </div>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {activeTab === "url" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Article URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                    placeholder="https://example.com/article"
                    required
                  />

                  <div className="flex justify-end gap-3">
                    <div className="w-40 relative">
                      <label className="block text-sm text-gray-300 mb-1">
                        Language
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                      >
                        <option
                          value="English"
                          className="bg-gray-800 text-gray-200"
                        >
                          English
                        </option>
                        <option
                          value="Hindi"
                          className="bg-gray-800 text-gray-200"
                        >
                          Hindi
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="w-32 relative">
                      <label className="block text-sm text-gray-300 mb-1">
                        Voice
                      </label>
                      <select
                        value={voice}
                        onChange={(e) => setVoice(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                      >
                        <option
                          value="Male"
                          className="bg-gray-800 text-gray-200"
                        >
                          Male
                        </option>
                        <option
                          value="Female"
                          className="bg-gray-800 text-gray-200"
                        >
                          Female
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <p>
                    Note: Sometimes content is behind paywalls. For best
                    results, try using publicly accessible URLs.
                  </p>
                </div>

                <motion.button
                  type="submit"
                  className="relative group w-full px-6 py-3 font-semibold text-white rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setType({ ...type, withurl: true })}
                  disabled={isProcessing}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {isProcessing ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Success!</span>
                      </>
                    ) : (
                      <>
                        <span>Convert to Audio</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            )}

            {activeTab === "text" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Text
                  </label>
                  <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-40 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                    placeholder="Paste your text here..."
                    readOnly={type.getresponse}
                    required
                  />

                  {type.getresponse && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
                      <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 items-center">
                  <button
                    className="flex items-center justify-center mt-5 gap-1 bg-gray-900 px-5 py-2 rounded border border-fuchsia-600"
                    onClick={handleResponse}
                  >
                    <Sparkles
                      className="w-5- h-5 animate-pulse"
                      fill="indigo"
                    />
                    Ask AI
                  </button>

                  <div className="w-40 relative">
                    <label className="block text-sm text-gray-300 mb-1">
                      Language
                    </label>

                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                    >
                      <option
                        value="English"
                        className="bg-gray-800 text-gray-200"
                      >
                        English
                      </option>
                      <option
                        value="Hindi"
                        className="bg-gray-800 text-gray-200"
                      >
                        Hindi
                      </option>
                    </select>
                    <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="w-32 relative">
                    <label className="block text-sm text-gray-300 mb-1">
                      Voice
                    </label>
                    <select
                      value={voice}
                      onChange={(e) => setVoice(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                    >
                      <option
                        value="Male"
                        className="bg-gray-800 text-gray-200"
                      >
                        Male
                      </option>
                      <option
                        value="Female"
                        className="bg-gray-800 text-gray-200"
                      >
                        Female
                      </option>
                    </select>
                    <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="relative group w-full px-6 py-3 font-semibold text-white rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setType({ ...type, withtext: true })}
                  disabled={isProcessing || type.getresponse}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"></div>

                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {isProcessing ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Success!</span>
                      </>
                    ) : (
                      <>
                        <button disabled={isProcessing || type.getresponse}>
                          Convert to Audio
                        </button>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            )}

            {activeTab === "file" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload PDF or Text File
                  </label>
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-cyan-400 transition-colors"
                  >
                    {file ? (
                      <div className="flex items-center space-x-2 text-cyan-400">
                        <FileText className="h-5 w-5" />
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-400">
                          <span className="font-medium text-cyan-400">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-cyan-400 mt-1 flex items-center gap-2">
                          <AlertCircle color="red" className="w-3 h-3" />
                          File Size Limit 5 MB and Limit 500 words
                        </p>
                      </>
                    )}
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div className="flex justify-end gap-3">
                  <div className="w-40 relative">
                    <label className="block text-sm text-gray-300 mb-1">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                    >
                      <option
                        value="English"
                        className="bg-gray-800 text-gray-200"
                      >
                        English
                      </option>
                      <option
                        value="Hindi"
                        className="bg-gray-800 text-gray-200"
                      >
                        Hindi
                      </option>
                    </select>
                    <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="w-32 relative">
                    <label className="block text-sm text-gray-300 mb-1">
                      Voice
                    </label>
                    <select
                      value={voice}
                      onChange={(e) => setVoice(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                    >
                      <option
                        value="Male"
                        className="bg-gray-800 text-gray-200"
                      >
                        Male
                      </option>
                      <option
                        value="Female"
                        className="bg-gray-800 text-gray-200"
                      >
                        Female
                      </option>
                    </select>
                    <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <motion.button
                  type="submit"
                  className="relative group w-full px-6 py-3 font-semibold text-white rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setType({ ...type, withfile: true })}
                  disabled={!file || isProcessing}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {isProcessing ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Success!</span>
                      </>
                    ) : (
                      <>
                        <span>Convert to Audio</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

   
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold mb-6 text-gray-300">
            Recent Conversions
          </h2>
      

          <AudioList latestAudio={latestAudio} />
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;
