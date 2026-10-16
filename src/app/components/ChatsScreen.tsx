import { motion } from "motion/react";
import { Search } from "lucide-react";
import { BottomNav } from "./BottomNav";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface ChatsScreenProps {
  onNavigate: (screen: string) => void;
}

export function ChatsScreen({ onNavigate }: ChatsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const chats = [
    {
      id: 1,
      name: "Jess Bogana",
      lastMessage: "Haha that's great!",
      time: "New",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
      fallback: "JB",
      online: true,
      type: "dating",
    },
    {
      id: 2,
      name: "Hoppy Ino",
      lastMessage:
        "Next week I have a trip planned. I'm so excited!!!",
      time: "2h",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
      fallback: "HI",
      online: false,
      type: "dating",
    },
    {
      id: 3,
      name: "Befan Ostaro",
      lastMessage: "Well, that would be optimal ;)",
      time: "1d",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
      fallback: "BO",
      online: false,
      type: "dating",
    },
    {
      id: 4,
      name: "Minah Alte",
      lastMessage:
        "They decided on a spontaneous adventure and now I can't find them anywhere, hahaha",
      time: "3d",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1760551937527-2bc6cfe45180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
      fallback: "MA",
      online: false,
      type: "dating",
    },
    {
      id: 5,
      name: "Vasma Boyt",
      lastMessage: "🙃",
      time: "1w",
      unread: false,
      fallback: "VB",
      online: true,
      type: "dating",
    },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#ff9883] to-[#ff7961] px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/95 border-0 rounded-2xl py-6 shadow-sm"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="px-6 mt-6">
        <h3 className="mb-3">Matches</h3>
        <div className="space-y-3">
          {filteredChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onNavigate("chat-detail")}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-[#ff9883]/10"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-14 h-14 border-2 border-[#ff9883]/30">
                    {chat.avatar && (
                      <AvatarImage
                        src={chat.avatar}
                        alt={chat.name}
                      />
                    )}
                    <AvatarFallback className="bg-gradient-to-br from-[#ff9883] to-[#ffb3a3] text-white">
                      {chat.fallback}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#86EFAC] border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-1">{chat.name}</div>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {chat.unread ? (
                    <Badge className="bg-gradient-to-r from-[#ff9883] to-[#ff7961] hover:from-[#ff9883] hover:to-[#ff7961] text-white border-0 shadow-sm">
                      {chat.time}
                    </Badge>
                  ) : (
                    <span className="text-xs text-gray-400">
                      {chat.time}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav active="chats" onNavigate={onNavigate} />
    </div>
  );
}