import React from "react";
import Sidebar from "../Chat/Sidebar/Sidebar";
import ChatPage from "../Chat/ChatSection/Chatpage";
import FriendSuggestions from "../Chat/FriendSuggeestions/FriendSuggestions";
import { Home, MessageCircle, Users, Settings, LogOut } from "lucide-react";

const ChatFullCompo = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      {/* Navbar */}
      <header className="bg-gray-900 text-white p-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            SocialConnect
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-semibold">AM</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 container mx-auto pt-4 pb-16">
        {/* Sidebar - Fixed width */}
        <div className="w-72 flex-shrink-0 mr-4">
          <Sidebar />
        </div>

        {/* Chat Area - Flexible width */}
        <div className="flex-1 mx-4">
          <ChatPage />
        </div>

        {/* Friend Suggestions - Fixed width */}
        <div className="w-80 flex-shrink-0 ml-4">
          <FriendSuggestions />
        </div>
      </main>

      {/* Mobile Footer Navigation (hidden on desktop) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 flex justify-around items-center md:hidden border-t border-gray-800 z-40">
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Home className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full bg-gray-800 text-blue-400">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Users className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};

export default ChatFullCompo;
