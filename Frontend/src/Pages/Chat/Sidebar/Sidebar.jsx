import { Search, MoreVertical, Plus } from "lucide-react";
import React, { useState } from "react";

const mockUsers = [
  {
    id: 1,
    username: "Aarav Mehta",
    userImage: "https://randomuser.me/api/portraits/men/11.jpg",
    isActive: true,
  },
  {
    id: 2,
    username: "Priya Sharma",
    userImage: "https://randomuser.me/api/portraits/women/12.jpg",
    isActive: false,
  },
  {
    id: 3,
    username: "Kabir Verma",
    userImage: "https://randomuser.me/api/portraits/men/13.jpg",
    isActive: true,
  },
  {
    id: 4,
    username: "Simran Kaur",
    userImage: "https://randomuser.me/api/portraits/women/14.jpg",
    isActive: false,
  },
  {
    id: 5,
    username: "Rahul Singh",
    userImage: "https://randomuser.me/api/portraits/men/15.jpg",
    isActive: true,
  },
  {
    id: 6,
    username: "Ananya Joshi",
    userImage: "https://randomuser.me/api/portraits/women/16.jpg",
    isActive: false,
  },
  {
    id: 7,
    username: "Devansh Patel",
    userImage: "https://randomuser.me/api/portraits/men/17.jpg",
    isActive: true,
  },
  {
    id: 8,
    username: "Meera Rao",
    userImage: "https://randomuser.me/api/portraits/women/18.jpg",
    isActive: false,
  },
  {
    id: 9,
    username: "Ishaan Kapoor",
    userImage: "https://randomuser.me/api/portraits/men/19.jpg",
    isActive: true,
  },
  {
    id: 10,
    username: "Tanya Desai",
    userImage: "https://randomuser.me/api/portraits/women/20.jpg",
    isActive: false,
  },
];

const StatusIndicator = ({ isActive }) => (
  <span
    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
      isActive ? "bg-green-500" : "bg-gray-500"
    }`}
  />
);

const Sidebar = () => {
  const [search, setSearch] = useState("");

  const filteredUsers =
    search.trim() === ""
      ? mockUsers
      : mockUsers.filter((user) =>
          user.username.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <aside className="fixed top-0 left-28 h-[calc(100vh-8rem)] w-72 bg-gray-900 text-white p-4 z-40 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Messages
        </h1>
        <button className="p-2 rounded-full hover:bg-gray-700 transition-all">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-gray-500 w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full bg-gray-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all mb-1 group"
          >
            <div className="relative mr-3">
              <img
                src={user.userImage}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <StatusIndicator isActive={user.isActive} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold truncate">
                  {user.username}
                </p>
                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <p
                className={`text-xs truncate ${
                  user.isActive ? "text-green-400" : "text-gray-500"
                }`}
              >
                {user.isActive ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* User profile footer */}
      <div className="mt-auto pt-4 border-t border-gray-800">
        <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-all">
          <div className="relative mr-3">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Your profile"
              className="w-10 h-10 rounded-full"
            />
            <StatusIndicator isActive={true} />
          </div>
          <div>
            <p className="text-sm font-semibold">Your Profile</p>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
