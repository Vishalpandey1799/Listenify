import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "timeago.js";
import { useAuthStore } from "../../Apicalls/Auth.api.js";
import { useAudioStore } from "../../Apicalls/Audio.apis.js";
import {
  User,
  Headphones,
  Link2 as LinkIcon,
  Edit,
  Check,
  ChevronRight,
  Play,
  Pause,
  Clock,
  ExternalLink,
  Copy,
  Sparkles,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import AudioList from "../../component/AudioLiset/AudioList.jsx";
import CouponClaimBox from "../../component/Coupen/CouponClaimBox.jsx";

const ProfilePage = () => {
  const { user, profileUpdate } = useAuthStore();
  const { getAllAudiosandLinks, allAudios } = useAudioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const audioRef = useRef(null);

   

   
  const handlePlayPause = (audioId) => {
    const audioItem = contentData.audioFiles.find(
      (item) => item.id === audioId
    );

    if (!audioItem) return;

    if (currentAudio === audioId) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
          toast.error("Failed to play audio");
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentAudio(audioId);
      audioRef.current.src = audioItem.audioUrl;
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
        toast.error("Failed to play audio");
      });
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleSaveProfile = async () => {
    try {
      setIsUpdatingProfile(true);
      const formData = new FormData();
      formData.append("name", editName);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await profileUpdate(formData);
      if (res.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        setSelectedFile(null);
        setImagePreview(null); // Clear preview after successful update
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!", {
      position: "bottom-center",
      style: {
        background: "#1e293b",
        color: "#fff",
        borderRadius: "8px",
      },
    });
  };

  useEffect(() => {
    getAllAudiosandLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} />

      <div className="relative z-10 max-w-6xl mx-auto p-8 pt-28">
        {/* Profile Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden border-2 border-gray-700 group-hover:border-cyan-500/50 transition-all duration-300 shadow-xl">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : user?.userImage ? (
                  <img
                    src={user.userImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-gray-400" />
                )}
              </div>
              {isEditing && (
                <label className="absolute -bottom-2 -right-2 bg-cyan-500 text-black p-2 rounded-full cursor-pointer hover:bg-cyan-400 transition-colors shadow-lg">
                  <Edit className="h-4 w-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUpdatingProfile}
                  />
                </label>
              )}
            </div>

            <div className="text-center md:text-left">
              {isEditing ? (
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-transparent border-b-2 border-gray-700 focus:border-cyan-500 outline-none text-3xl font-bold transition-colors text-white text-center md:text-left"
                    disabled={isUpdatingProfile}
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                    disabled={isUpdatingProfile}
                  >
                    {isUpdatingProfile ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Check className="h-6 w-6" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center md:justify-start gap-3 group">
                  <h1 className="text-3xl font-bold text-white">
                    {user?.name}
                  </h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-600 hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              )}
              <p className="text-gray-300 mt-2">{user?.email}</p>
              <div className="inline-flex items-center space-x-1.5 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-1.5 mt-3">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-medium">
                  Joined {format(user?.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <CouponClaimBox claimed={user?.couponClaimed} />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Audio Files */}
          <AudioList latestAudio={allAudios} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
