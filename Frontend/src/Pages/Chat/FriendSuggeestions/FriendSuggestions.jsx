import { UserPlus, UserCheck, UserX } from "lucide-react";

const FriendSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      name: "Priya Patel",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      mutualFriends: 4,
      status: "pending", // can be 'pending', 'add', or 'friends'
    },
    {
      id: 2,
      name: "Rahul Sharma",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      mutualFriends: 8,
      status: "add",
    },
    {
      id: 3,
      name: "Neha Gupta",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      mutualFriends: 2,
      status: "friends",
    },
    {
      id: 4,
      name: "Vikram Singh",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      mutualFriends: 5,
      status: "add",
    },
  ];

  const handleAction = (id, action) => {
    console.log(`${action} friend request to user ${id}`);
    // You would update state here in a real implementation
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <UserPlus className="w-5 h-5 mr-2 text-blue-400" />
        People You May Know
      </h2>

      <div className="space-y-4">
        {suggestions.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-xs text-gray-400">
                  {user.mutualFriends} mutual friends
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              {user.status === "add" && (
                <button
                  onClick={() => handleAction(user.id, "add")}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                  title="Add Friend"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
              )}

              {user.status === "pending" && (
                <button
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                  disabled
                  title="Request Sent"
                >
                  <UserCheck className="w-4 h-4 text-gray-400" />
                </button>
              )}

              {user.status === "friends" && (
                <button
                  className="p-2 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
                  disabled
                  title="Friends"
                >
                  <UserCheck className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => handleAction(user.id, "remove")}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                title="Remove"
              >
                <UserX className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
        See More Suggestions
      </button>
    </div>
  );
};

export default FriendSuggestions;
