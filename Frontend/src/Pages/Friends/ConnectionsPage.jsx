import React, { useState } from "react";
import { motion } from "framer-motion";
import { useConnectionStore } from "../../Apicalls/ConnectionRequest.js";
import {
  User,
  MessageCircle,
  UserPlus,
  UserX,
  ChevronRight,
  Search,
  Users,
  Bell,
  Loader2,
} from "lucide-react";
import { useEffect } from "react";
import Loader from "../../component/Loader/Loader.jsx";
import { useNavigate } from "react-router-dom";

const ConnectionsPage = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  let navigate = useNavigate();
 
  const {
    sendFriendRequest,
    allLearners,
    allUser,
    pendingRequests,
    pending,
    acceptFriendRequest,
    declineFriendRequest,
    myFriends,
    currentFriends,
    cancelFriendRequest,
    loading,
    onlineUserIds
  } = useConnectionStore();

  const [loader, setLoader] = useState({
    sentLoader: null,
    cancleLoader: null,
    acceptloader: null,
    declineLoader: null,
  });

  useEffect(() => {
    allLearners();
    pendingRequests();
    myFriends();
  }, []);


 
  if (!pending || !allUser || !currentFriends) {
    return <Loader />;
  }

  const handleSendRequest = async (id) => {
    setLoader((prev) => ({ ...prev, sentLoader: id }));
    try {
      await sendFriendRequest(id);
    } catch (error) {
      console.error("Send error:", error);
    } finally {
      setLoader((prev) => ({ ...prev, sentLoader: null }));
    }
  };

  const handleCancelRequest = async (id) => {
    setLoader((prev) => ({ ...prev, cancleLoader: id }));
    try {
      await cancelFriendRequest(id);
    } catch (error) {
      console.error("Cancel error:", error);
    } finally {
      setLoader((prev) => ({ ...prev, cancleLoader: null }));
    }
  };

  const handleAcceptRequest = async (id) => {
    setLoader((prev) => ({ ...prev, acceptLoader: id }));
    try {
      await acceptFriendRequest(id);
    } catch (error) {
      console.error("Accept error:", error);
    } finally {
      setLoader((prev) => ({ ...prev, acceptLoader: null }));
    }
  };

  const handleDeclineRequest = async (id) => {
    setLoader((prev) => ({ ...prev, declineLoader: id }));
    try {
      await declineFriendRequest(id);
    } catch (error) {
      console.error("Decline error:", error);
    } finally {
      setLoader((prev) => ({ ...prev, declineLoader: null }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background effects similar to your theme */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
        <motion.div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-xl"></div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Connections
          </h1>

          <motion.button
            className="relative group flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFriendRequests(!showFriendRequests)}
          >
            <Bell className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-medium">Requests</span>

            {pending && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold shadow-md">
                {pending.length}
              </span>
            )}
          </motion.button>
        </motion.header>

        {showFriendRequests && (
          <motion.div
            className="mb-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-400" />
              Pending Requests
            </h3>
            {pending.length > 0 ? (
              <div className="space-y-3">
                {pending.map(({ fromUserId }) => (
                  <div
                    key={fromUserId.id}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={fromUserId.userImage}
                        alt={fromUserId.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{fromUserId.name}</span>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        className="px-3 py-1 bg-cyan-600 rounded-lg text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAcceptRequest(fromUserId._id)}
                        disabled={loader.acceptloader}
                      >
                        {loader.acceptloader === fromUserId?._id ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          "Accept"
                        )}
                      </motion.button>
                      <motion.button
                        className="px-3 py-1 bg-gray-700 rounded-lg text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeclineRequest(fromUserId._id)}
                        disabled={loader.declineLoader}
                      >
                        {loader.declineLoader === fromUserId?._id ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          "Decline"
                        )}
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">
                No pending requests
              </p>
            )}
          </motion.div>
        )}

        {/* Search and Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search connections..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
            />
          </div>

          <div className="flex border-b border-gray-700">
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === "friends"
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("friends")}
            >
              <Users className="h-4 w-4" />
              <span>My Friends</span>
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === "suggestions"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("suggestions")}
            >
              <UserPlus className="h-4 w-4" />
              <span>Suggestions</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === "friends" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFriends?.map((user) => (
                <motion.div
                  key={user._id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 flex items-center justify-between"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.userImage}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{user?.name}</h3>
                      <p className="text-sm text-gray-400">
                        {onlineUserIds.includes(user._id) ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    className="p-2 bg-cyan-600/20 rounded-full text-cyan-400 border border-cyan-400/20"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(8, 145, 178, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/listenify/chat?toUserId=${user._id}`)}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {allUser.length > 0 ? allUser.map((user, index) => {
    const isSending = loader.sentLoader === user._id;
    const isCanceling = loader.cancleLoader === user._id;

    return (
      <motion.div
        key={user?._id}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={user.userImage}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-gray-400">Suggested for you</p>
          </div>
        </div>

        {!user.connectionStatus ? (
          <motion.button
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSendRequest(user?._id)}
            disabled={isSending}
          >
            <UserPlus className="h-4 w-4" />
            <div>
              {isSending ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending..
                </span>
              ) : (
                <span>Add Friend</span>
              )}
            </div>
          </motion.button>
        ) : user.connectionStatus === "pending" ? (
          <motion.button
            className="w-full py-2 bg-gray-700 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCancelRequest(user?._id)}
            disabled={isCanceling}
          >
            <UserX className="h-4 w-4" />
            <div>
              {isCanceling ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Canceling...
                </span>
              ) : (
                <span>Cancel Request</span>
              )}
            </div>
          </motion.button>
        ) : (
          <motion.button
            className="w-full py-2 bg-cyan-600/20 text-cyan-400 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 border border-cyan-400/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Message</span>
          </motion.button>
        )}
      </motion.div>
    );
  }) : (
    <p className="text-center text-gray-400 col-span-full">No suggestions at the moment.</p>
  )}
</div>

          )}
        </motion.div>

        {/* Empty state */}
        {activeTab === "friends" && !currentFriends.length && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No friends yet</h3>
            <p className="text-gray-400 mb-4">
              Connect with people to see them here
            </p>
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("suggestions")}
            >
              Find Friends
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;
