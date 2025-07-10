import {
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Send,
} from "lucide-react";
import React, { useState } from "react";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! How are you?",
      sender: "them",
      time: "12:30 PM",
    },
    {
      id: 2,
      text: "I'm doing great! Working on that project we discussed.",
      sender: "me",
      time: "12:32 PM",
    },
    {
      id: 3,
      text: "That's awesome! Need any help with it?",
      sender: "them",
      time: "12:35 PM",
    },
  ]);

  const currentUser = {
    name: "Aarav Mehta",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    status: "Online",
    lastSeen: "last seen today at 12:45 PM",
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-800/50">
        {/* Left side - User info */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                currentUser.status === "Online" ? "bg-green-500" : "bg-gray-500"
              }`}
            ></span>
          </div>
          <div>
            <h2 className="font-semibold">{currentUser.name}</h2>
            <p className="text-xs text-gray-400">
              {currentUser.status === "Online"
                ? "Online"
                : currentUser.lastSeen}
            </p>
          </div>
        </div>

        {/* Right side - Call options */}
        <div className="flex space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Phone className="w-5 h-5 text-blue-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Video className="w-5 h-5 text-blue-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === "me"
                    ? "bg-blue-600 rounded-tr-none"
                    : "bg-gray-700 rounded-tl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-gray-300 text-right mt-1">
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-800 bg-gray-800/50">
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Smile className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Paperclip className="w-5 h-5 text-gray-400" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 border-none rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
