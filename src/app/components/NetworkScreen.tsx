import { motion } from "motion/react";
import { Search, UserPlus, ArrowLeft } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface NetworkScreenProps {
  onNavigate: (screen: string) => void;
}

export function NetworkScreen({
  onNavigate,
}: NetworkScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const connections = [
    {
      id: 1,
      name: "Sarah Johnson",
      mutualFriends: 12,
      interests: ["Hiking", "Photography"],
      avatar: "SJ",
      status: "connected",
    },
    {
      id: 2,
      name: "Mike Chen",
      mutualFriends: 8,
      interests: ["Coffee", "Tech"],
      avatar: "MC",
      status: "connected",
    },
    {
      id: 3,
      name: "Emily Roberts",
      mutualFriends: 15,
      interests: ["Art", "Music"],
      avatar: "ER",
      status: "connected",
    },
    {
      id: 4,
      name: "Alex Martinez",
      mutualFriends: 6,
      interests: ["Fitness", "Travel"],
      avatar: "AM",
      status: "connected",
    },
    {
      id: 5,
      name: "Kaden Dyer",
      mutualFriends: 8,
      interests: ["Chess", "Gymnastics"],
      avatar: "KD",
      status: "connected",
    },
    {
      id: 6,
      name: "Gael Clay",
      mutualFriends: 3,
      interests: ["Wizardry", "Dance"],
      avatar: "GC",
      status: "connected",
    },
    {
      id: 7,
      name: "Augustine Munoz",
      mutualFriends: 3,
      interests: ["Film", "Cooking"],
      avatar: "AM",
      status: "connected",
    },
    {
      id: 8,
      name: "Gracelyn Daniel",
      mutualFriends: 5,
      interests: ["Sports", "Trivia"],
      avatar: "GD",
      status: "connected",
    },
    {
      id: 9,
      name: "Jordan Lee",
      mutualFriends: 0,
      interests: ["Reading", "Cooking"],
      avatar: "JL",
      status: "suggested",
    },
    {
      id: 10,
      name: "Taylor Swift",
      mutualFriends: 3,
      interests: ["Music", "Fashion"],
      avatar: "TS",
      status: "suggested",
    },
  ];

  const filteredConnections = connections.filter((conn) =>
    conn.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const connectedUsers = filteredConnections.filter(
    (c) => c.status === "connected",
  );
  const suggestedUsers = filteredConnections.filter(
    (c) => c.status === "suggested",
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#A78BFA] to-[#C4B5FD] px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-white flex-1">Network</h1>
          <Button
            onClick={() => onNavigate("send-introduction")}
            className="bg-white/20 hover:bg-white/25 text-white border-0 rounded-full shadow-sm"
          >
            <UserPlus size={20} />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/95 border-0 rounded-2xl py-6 shadow-sm"
          />
        </div>
      </div>

      {/* My Network */}
      <div className="px-6 mt-6">
        <h3 className="mb-3">
          My Network ({connectedUsers.length})
        </h3>
        <div className="space-y-3">
          {connectedUsers.map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-14 h-14 bg-gradient-to-br from-[#A78BFA] to-[#C4B5FD]">
                  <AvatarFallback className="text-gray-400">
                    {connection.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-1">{connection.name}</div>
                  <p className="text-sm text-gray-500">
                    {connection.mutualFriends} mutual friends
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {connection.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-[#EDE9FE] text-[#A78BFA] rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() =>
                    onNavigate("send-introduction")
                  }
                  className="bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] hover:from-[#9333EA] hover:to-[#A78BFA] text-white rounded-full px-6 border-0 shadow-sm"
                >
                  Introduce
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Suggested Connections */}
      {suggestedUsers.length > 0 && (
        <div className="px-6 mt-8">
          <h3 className="mb-3">Suggested</h3>
          <div className="space-y-3">
            {suggestedUsers.map((connection, index) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14 bg-gradient-to-br from-[#F0ABFC] to-[#F5D0FE]">
                    <AvatarFallback className="text-gray-400">
                      {connection.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1">
                      {connection.name}
                    </div>
                    <p className="text-sm text-gray-500">
                      {connection.mutualFriends > 0
                        ? `${connection.mutualFriends} mutual friends`
                        : "Recommended for you"}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {connection.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 bg-[#FAE8FF] text-[#F0ABFC] rounded-full text-xs"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button className="bg-[#EDE9FE] text-[#A78BFA] hover:bg-[#A78BFA] hover:text-white rounded-full px-6 border-0 shadow-sm">
                    Add
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <BottomNav active="network" onNavigate={onNavigate} />
    </div>
  );
}