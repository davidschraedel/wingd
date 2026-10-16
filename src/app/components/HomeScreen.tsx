import { motion } from "motion/react";
import {
  Users,
  Heart,
  MessageCircle,
  UserPlus,
  Sparkles,
  ChevronRight,
  Check,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { HeartHandshakeIcon } from "./HeartHandshakeIcon";

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
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
      label: "Introduced",
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
      screen: "introductions",
      navData: { tab: "pending" },
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
      screen: "circle",
      navData: { tab: "invites" },
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
      screen: "circle",
      navData: { tab: "circle", personId: 3 },
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
          className="w-full md:w-2/3 max-w-4xl mx-auto flex items-center justify-between gap-4"
        >
          <div>
            <h2 className="text-white/90 text-sm sm:text-base font-medium mb-0.5">Welcome back,</h2>
            <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">Sam 👋</h1>
          </div>

          {/* Wingd Brand Badge */}
          <div className=" pt-1 rounded-3xl flex items-center gap-2 select-none shrink-0">
            <HeartHandshakeIcon className="w-28 h-auto" />

          </div>
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
          <h3 className="mb-3 font-semibold text-gray-900">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const badgeConfig = {
                introduction: {
                  badgeBg: "bg-[#ff7961]",
                  icon: <Heart size={10} className="text-white fill-white" />,
                  fallbackBg: "bg-gradient-to-br from-[#ff9883] to-[#ffb8a8] text-white",
                  tagStyle: "bg-[#FFF0ED] text-[#ff9883]",
                },
                accepted: {
                  badgeBg: "bg-[#1da6e0]",
                  icon: <Check size={10} className="text-white" strokeWidth={3} />,
                  fallbackBg: "bg-gradient-to-br from-[#1da6e0] to-[#5cc2f0] text-white",
                  tagStyle: "bg-[#F0F9FF] text-[#1da6e0]",
                },
                circle: {
                  badgeBg: "bg-[#77d75b]",
                  icon: <UserPlus size={10} className="text-white" />,
                  fallbackBg: "bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white",
                  tagStyle: "bg-[#F0F9ED] text-[#77d75b]",
                },
              }[activity.type as "introduction" | "accepted" | "circle"];

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => onNavigate(activity.screen, activity.navData)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onNavigate(activity.screen, activity.navData);
                    }
                  }}
                  className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-gray-100 hover:border-[#1da6e0]/30 transition-all cursor-pointer select-none active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#1da6e0]/40"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                      <Avatar className="w-12 h-12 border-2 border-gray-100 group-hover:border-[#1da6e0]/20 transition-colors">
                        <AvatarImage
                          src={activity.avatar}
                          alt={activity.name}
                        />
                        <AvatarFallback className={badgeConfig.fallbackBg}>
                          {activity.fallback}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${badgeConfig.badgeBg} flex items-center justify-center border-2 border-white shadow-xs`}
                      >
                        {badgeConfig.icon}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-semibold text-gray-900 group-hover:text-[#1da6e0] transition-colors truncate">
                          {activity.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 leading-snug">
                        {activity.action}
                        {activity.target && (
                          <span className="text-[#1da6e0] font-medium ml-1">
                            {activity.target}
                          </span>
                        )}
                      </p>
                      {activity.tags.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap">
                          {activity.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeConfig.tagStyle}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-between self-stretch shrink-0 pl-1">
                      <span className="text-xs text-gray-400">
                        {activity.time}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-[#1da6e0] transition-colors mt-2">
                        <ChevronRight
                          size={15}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}