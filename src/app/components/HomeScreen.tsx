import { motion } from "motion/react";
import {
  Users,
  Heart,
  MessageCircle,
  UserPlus,
  Mail,
  Sparkles,
} from "lucide-react";
import { BottomNav } from "./BottomNav";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const stats = [
    {
      icon: Users,
      label: "Circle",
      value: 24,
      color: "#77d75b",
      screen: "circle",
    },
    {
      icon: Heart,
      label: "Received",
      value: 5,
      color: "#ff9883",
      screen: "introductions",
    },
    {
      icon: MessageCircle,
      label: "Chats",
      value: 8,
      color: "#1da6e0",
      screen: "chats",
    },
  ];

  const quickActions = [
    {
      icon: Heart,
      label: "Make Intro",
      color: "#1da6e0",
      screen: "send-introduction",
    },
    {
      icon: UserPlus,
      label: "Add Friend",
      color: "#77d75b",
      screen: "circle",
    },
    {
      icon: Mail,
      label: "View Intros",
      color: "#1da6e0",
      screen: "introductions",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      name: "Sarah Johnson",
      action: "introduced you to",
      target: "Alex Martinez",
      type: "introduction",
      tags: ["Hiking", "Photography"],
      time: "2h ago",
      avatar: "/avatars/sarah.jpg",
      fallback: "SJ",
    },
    {
      id: 2,
      name: "Mike Chen",
      action: "accepted your introduction",
      target: null,
      type: "accepted",
      tags: ["Coffee", "Art"],
      time: "5h ago",
      avatar: "/avatars/mike.jpg",
      fallback: "MC",
    },
    {
      id: 3,
      name: "Emily Roberts",
      action: "joined your circle",
      target: null,
      type: "circle",
      tags: [],
      time: "1d ago",
      avatar: "/avatars/emily.jpg",
      fallback: "ER",
    },
  ];

  const activitySummary =
    "You have 2 new introductions waiting for your response. Sarah accepted your intro to Mike—they're chatting now! 3 people from your circle are active today.";

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1da6e0] to-[#05638f] px-6 pt-12 pb-8 rounded-b-3xl shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-2/3 max-w-4xl mx-auto"
        >
          <h2 className="text-white mb-1">Welcome back,</h2>
          <h1 className="text-white">Sam 👋</h1>
        </motion.div>
      </div>

      {/* Dashboard Section - Visually Separated */}
      <div className="px-6 -mt-6 mb-6">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg p-6 border-2 border-[#1da6e0]/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-[#1da6e0]" />
              <h3 className="text-[#1da6e0]">Today's Summary</h3>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {activitySummary}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.button
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onNavigate(stat.screen)}
                    className="bg-gradient-to-br from-[#FAFAFA] to-white rounded-2xl p-4 text-center hover:shadow-md transition-all border border-gray-100"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{
                        backgroundColor: `${stat.color}20`,
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: stat.color }}
                      />
                    </div>
                    <div className="mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500">
                      {stat.label}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <h3 className="mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12 border-2 border-gray-100">
                    <AvatarImage
                      src={activity.avatar}
                      alt={activity.name}
                    />
                    <AvatarFallback
                      className={`${activity.type === "introduction"
                        ? "bg-gradient-to-br from-[#ff9883] to-[#ffb8a8] text-white"
                        : "bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white"
                        }`}
                    >
                      {activity.fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1">
                      <span>{activity.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {activity.action}
                      {activity.target && (
                        <span className="text-[#1da6e0] ml-1">
                          {activity.target}
                        </span>
                      )}
                    </p>
                    {activity.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {activity.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 rounded-full text-xs ${activity.type === "introduction"
                              ? "bg-[#FFF0ED] text-[#ff9883]"
                              : "bg-[#F0F9ED] text-[#77d75b]"
                              }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {activity.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}