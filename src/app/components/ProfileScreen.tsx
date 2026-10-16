import { motion } from "motion/react";
import {
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
  Camera,
} from "lucide-react";
import { BottomNav } from "./BottomNav";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({
  onNavigate,
}: ProfileScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: Edit,
          label: "Edit Profile",
          action: "edit-profile",
        },
        {
          icon: Settings,
          label: "Account Settings",
          action: "settings",
        },
        {
          icon: Bell,
          label: "Notifications",
          action: "notifications",
          toggle: true,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help Center",
          action: "help",
        },
      ],
    },
  ];

  const stats = [
    { label: "Circle", value: "24" },
    { label: "Intros Made", value: "42" },
    { label: "Dating", value: "5" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1da6e0] to-[#05638f] px-6 pt-12 pb-8 rounded-b-3xl shadow-sm">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <Avatar className="w-20 h-20 border-2 border-white/20">
                  <AvatarImage src="" alt="Sam Doe" />
                  <AvatarFallback className="bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white text-2xl">
                    SD
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-gradient-to-br from-[#1da6e0] to-[#05638f] text-white rounded-full flex items-center justify-center shadow-sm">
                  <Camera size={14} />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="mb-1">Sam Doe</h2>
                <p className="text-gray-500 mb-3">
                  sam.doe@email.com
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-[#EDE9FE] text-[#A78BFA] rounded-full text-xs">
                    Hiking
                  </span>
                  <span className="px-3 py-1 bg-[#EDE9FE] text-[#A78BFA] rounded-full text-xs">
                    Photography
                  </span>
                  <span className="px-3 py-1 bg-[#EDE9FE] text-[#A78BFA] rounded-full text-xs">
                    Travel
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-[#A78BFA] mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-6 mt-6 bg-[rgba(0,0,0,0)]">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="mb-3 font-normal not-italic">
                {section.title}
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (!item.toggle && item.action) {
                          onNavigate(item.action);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors ${
                        index !== section.items.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="w-10 h-10 bg-[#EDE9FE] rounded-full flex items-center justify-center">
                        <Icon
                          size={18}
                          className="text-[#A78BFA]"
                        />
                      </div>
                      <span className="flex-1 text-left">
                        {item.label}
                      </span>
                      {item.toggle ? (
                        <Switch
                          defaultChecked={notificationsEnabled}
                          onCheckedChange={(checked) => {
                            setNotificationsEnabled(checked);
                            toast(
                              checked ? "Notifications enabled" : "Notifications disabled"
                            );
                          }}
                        />
                      ) : (
                        <ChevronRight
                          size={20}
                          className="text-gray-400"
                        />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            </div>
          ))}

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={() => onNavigate("login")}
              className="w-full bg-red-50 border border-red-100 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-2xl py-6 shadow-sm"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </motion.div>
        </div>
      </div>

      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  );
}