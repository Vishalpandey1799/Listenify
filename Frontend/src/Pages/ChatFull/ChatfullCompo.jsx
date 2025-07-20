import React from "react";
import Sidebar from "../Chat/Sidebar/Sidebar";
 
import FriendSuggestions from "../Chat/FriendSuggeestions/FriendSuggestions";
import { Home, MessageCircle, Users, Settings, LogOut } from "lucide-react";
import ChatPage from "../Chat/ChatSection/ChatPage";

const ChatFullCompo = () => {
  return (
    
    

 
      <main className="flex flex-1 container mx-auto pt-4 pb-16">
        {/* Sidebar - Fixed width */}
        <div className="w-72 ml-15 flex-shrink-0 mr-15">
          <Sidebar />
        </div>

        {/* Chat Area - Flexible width */}
        <div className="flex-1 mx-4">
          <ChatPage />
        </div>

      </main>
 
  );
};

export default ChatFullCompo;
