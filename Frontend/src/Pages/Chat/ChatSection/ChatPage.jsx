import {
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Send,
} from "lucide-react";
import axios from "axios";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { connecttoSokketayyo } from "../../../utils/Socket.io.client.js";
import { useAuthStore } from "../../../Apicalls/Auth.api.js";
import { useConnectionStore } from "../../../Apicalls/ConnectionRequest.js";
import AudioCall from "../../../component/Audiocall.jsx";
 
import { format } from "timeago.js";
import NotFoundPage from "../../NofoundPage/NotFoundPage.jsx";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [callState, setCallState] = useState({
    active: false,
    type: null,
    initiator: false,
    incoming: null,
  });
  const [socketConnected, setSocketConnected] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { user } = useAuthStore();
  const { currentFriends, myFriends, onlineUserIds } = useConnectionStore();

  const myId = user?._id;
  const toUserId = useSearchParams()[0].get("toUserId");
  const friend = currentFriends?.find((friend) => friend._id === toUserId);

  const currentUser = {
    name: friend?.name,
    avatar: friend?.userImage,
    status: onlineUserIds.includes(toUserId) ? "online" : "offline",
  };

  // Memoized socket event handlers
  const handleReceivedMessage = useCallback(
    ({ userName, message }) => {
      // Only add messages from OTHER users, not your own
      if (userName !== user?.name) {
        const newMessage = {
          id: Date.now() + Math.random(), // Better unique ID
          message,
          sender: userName,
          time: format(
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          ),
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    },
    [user?.name]
  );

  const handleIncomingCall = useCallback(({ from, type }) => {
    // Only handle if no active call
    setCallState((prevState) => {
      if (prevState.active) return prevState;
      return {
        ...prevState,
        incoming: from,
        type,
      };
    });
  }, []);

  const handleCallAccepted = useCallback(() => {
    setCallState((prev) => ({
      ...prev,
      active: true,
      incoming: null,
    }));
  }, []);

  const handleCallRejected = useCallback(() => {
    setCallState({
      active: false,
      type: null,
      initiator: false,
      incoming: null,
    });
  }, [friend?.name]);

  const handleCallEnded = useCallback(() => {
    setCallState({
      active: false,
      type: null,
      initiator: false,
      incoming: null,
    });
  }, []);

  const handleTyping = useCallback(
    ({ isTyping: typing, from }) => {
      if (from !== toUserId) return;

      setIsTyping(typing);

      if (typing) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    },
    [toUserId]
  );

  useEffect(() => {
    if (!toUserId) return;

    const getChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/listenify/user/chat/${toUserId}`,
          { withCredentials: true }
        );

        const formattedMessages = res.data.message.messages.map((msg) => ({
          id: msg._id,
          message: msg.text,
          sender: msg.senderId.name,
          time: format(msg.createdAt),
        }));

        setMessages(formattedMessages);
      } catch (err) {
        console.error("Failed to fetch chat:", err);
      }
    };

    getChats();
    myFriends();
  }, [toUserId, myFriends]);
 
  useEffect(() => {
    if (!myId || !toUserId || socketRef.current) return;

    const socket = connecttoSokketayyo();
    socketRef.current = socket;

    // Connection event handlers
    socket.on("connect", () => {
      setSocketConnected(true);
      socket.emit("JoinChat", { myId, toUserId });
      socket.emit("onlineUsers", myId);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    // Message event handlers
    socket.on("receivedMessages", handleReceivedMessage);
    socket.on("user-typing", handleTyping);

    // Call event handlers
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("call-rejected", handleCallRejected);
    socket.on("call-ended", handleCallEnded);

    // Error handlers
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Clean up socket
      socket.off("receivedMessages", handleReceivedMessage);
      socket.off("user-typing", handleTyping);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("call-rejected", handleCallRejected);
      socket.off("call-ended", handleCallEnded);
      socket.disconnect();
      socketRef.current = null;
      setSocketConnected(false);
    };
  }, [
    myId,
    toUserId,
    handleReceivedMessage,
    handleTyping,
    handleIncomingCall,
    handleCallAccepted,
    handleCallRejected,
    handleCallEnded,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (!message.trim() || !socketRef.current || !socketConnected) return;

    const newMessage = {
      id: Date.now() + Math.random(),
      message,
      sender: user?.name,
      time: format(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
    };

    // Emit message
    socketRef.current.emit("sendMessages", {
      myId,
      toUserId,
      userName: user?.name,
      message,
    });

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  }, [message, myId, toUserId, user?.name, socketConnected]);

  const handleStartCall = useCallback(
    (type) => {
      if (callState.active || !socketRef.current || !socketConnected) return;

      const callId = `call_${[myId, toUserId].sort().join("_")}`;

      setCallState({
        active: true,
        type,
        initiator: true,
        incoming: null,
      });

      socketRef.current.emit("start-call", {
        from: myId,
        to: toUserId,
        type,
        callId,
      });
    },
    [callState.active, myId, toUserId, socketConnected]
  );

  const handleAcceptCall = useCallback(() => {
    if (!socketRef.current || !callState.incoming) return;

    setCallState((prev) => ({
      ...prev,
      active: true,
      initiator: false,
      incoming: null,
    }));

    socketRef.current.emit("accept-call", {
      from: callState.incoming,
      to: myId,
    });
  }, [callState.incoming, myId]);

  const handleRejectCall = useCallback(() => {
    if (!socketRef.current || !callState.incoming) return;

    socketRef.current.emit("reject-call", {
      from: callState.incoming,
      to: myId,
    });

    setCallState((prev) => ({ ...prev, incoming: null }));
  }, [callState.incoming, myId]);

  const handleEndCall = useCallback(() => {
    if (!socketRef.current) return;

    socketRef.current.emit("end-call", {
      from: myId,
      to: toUserId,
    });

    setCallState({
      active: false,
      type: null,
      initiator: false,
      incoming: null,
    });
  }, [myId, toUserId]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  // Handle typing indicators
  const handleMessageChange = useCallback(
    (e) => {
      setMessage(e.target.value);

      if (socketRef.current && socketConnected) {
        socketRef.current.emit("typing", {
          from: myId,
          to: toUserId,
          isTyping: e.target.value.length > 0,
        });
      }
    },
    [myId, toUserId, socketConnected]
  );

  if (!friend) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!toUserId) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Connection Status */}
      {!socketConnected && (
        <div className="bg-yellow-500 text-white text-center py-2 text-sm">
          Connecting...
        </div>
      )}

      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
                currentUser.status === "online" ? "bg-green-500" : "bg-gray-500"
              }`}
            ></span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">{currentUser.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentUser.status}
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleStartCall("audio")}
            disabled={callState.active || !socketConnected}
            className={`p-2 rounded-full transition-colors duration-200 ${
              callState.active || !socketConnected
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Phone className="w-5 h-5 text-blue-500" />
          </button>

          <button
            onClick={() => handleStartCall("video")}
            disabled={callState.active || !socketConnected}
            className={`p-2 rounded-full transition-colors duration-200 ${
              callState.active || !socketConnected
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Video className="w-5 h-5 text-blue-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === user?.name ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg transition-all duration-200 ${
                  msg.sender === user?.name
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 rounded-bl-none"
                } shadow-md`}
              >
                <p className="text-sm">{msg.message}</p>
                <p
                  className={`text-xs mt-1 text-right ${
                    msg.sender === user?.name
                      ? "text-blue-100"
                      : "text-gray-500 dark:text-gray-300"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg rounded-bl-none max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 backdrop-blur-sm sticky bottom-0">
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 border-none rounded-full py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            disabled={!socketConnected}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || !socketConnected}
            className={`p-2 rounded-full transition-all duration-200 ${
              message.trim() && socketConnected
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Incoming call UI */}
      {callState.incoming && !callState.active && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold mb-2">
              Incoming {callState.type} Call
            </h3>
            <p className="mb-6">{user?.name || "Someone"} is calling...</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAcceptCall}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors duration-200"
              >
                Accept
              </button>
              <button
                onClick={handleRejectCall}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors duration-200"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active call UI */}
      {callState.active && (
        <AudioCall
          toUserId={toUserId}
          onEnd={handleEndCall}
          type={callState.type}
          isInitiator={callState.initiator}
        />
      )}
    </div>
  );
};

export default ChatPage;
