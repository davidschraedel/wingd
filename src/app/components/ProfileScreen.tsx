import { motion } from "motion/react";
import {
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
  Camera,
  X,
  Plus,
  Shield,
  Sliders,
  RotateCcw,
  Sparkles,
  Info,
  Check,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({
  onNavigate,
}: ProfileScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Profile Data State
  const [profile, setProfile] = useState({
    name: "Sam Doe",
    email: "sam.doe@email.com",
    bio: "Wingman enthusiast & outdoor adventurer. Always looking to connect good people!",
    interests: ["Hiking", "Photography", "Travel"],
  });

  // Modal States
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editInterests, setEditInterests] = useState<string[]>([...profile.interests]);
  const [newTagInput, setNewTagInput] = useState("");

  // Account Settings Form State
  const [ghostMode, setGhostMode] = useState(false);
  const [showMutual, setShowMutual] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [wingmanMode, setWingmanMode] = useState(true);
  const [discoveryRadius, setDiscoveryRadius] = useState([25]);

  const suggestedTags = ["Coffee", "Fitness", "Design", "Music", "Foodie", "Biking"];

  const handleOpenEditProfile = () => {
    setEditName(profile.name);
    setEditEmail(profile.email);
    setEditBio(profile.bio);
    setEditInterests([...profile.interests]);
    setNewTagInput("");
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setProfile({
      name: editName.trim(),
      email: editEmail.trim(),
      bio: editBio.trim(),
      interests: editInterests,
    });
    setIsEditProfileOpen(false);
    toast.success("Profile updated successfully!");
  };

  const handleAddInterest = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (editInterests.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Interest tag already added");
      return;
    }
    setEditInterests([...editInterests, trimmed]);
    setNewTagInput("");
  };

  const handleRemoveInterest = (tagToRemove: string) => {
    setEditInterests(editInterests.filter((t) => t !== tagToRemove));
  };

  const getInitials = (fullName: string) => {
    return (
      fullName
        .split(" ")
        .map((n) => n[0])
        .filter(Boolean)
        .join("")
        .toUpperCase()
        .slice(0, 2) || "WD"
    );
  };

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
    { label: "Given", value: "42" },
    { label: "Matches", value: "5" },
  ];

  const handleMenuClick = (action?: string) => {
    if (!action) return;
    if (action === "edit-profile") {
      handleOpenEditProfile();
    } else if (action === "settings") {
      setIsSettingsOpen(true);
    } else if (action === "help") {
      setIsHelpOpen(true);
    } else {
      onNavigate(action);
    }
  };

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
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-2 border-white/20">
                  <AvatarImage src="" alt={profile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white text-2xl font-semibold">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() =>
                    toast.info("Photo updating is disabled in this prototype")
                  }
                  title="Photo update disabled in prototype"
                  className="absolute bottom-0 right-0 w-7 h-7 bg-gradient-to-br from-[#1da6e0] to-[#05638f] text-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform"
                >
                  <Camera size={14} />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl font-bold text-gray-900 truncate">
                    {profile.name}
                  </h2>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleOpenEditProfile}
                    className="text-xs text-[#1da6e0] hover:bg-[#1da6e0]/10 h-7 px-2.5 rounded-lg flex items-center gap-1"
                  >
                    <Edit size={12} />
                    Edit
                  </Button>
                </div>
                <p className="text-gray-500 text-sm mb-2 truncate">
                  {profile.email}
                </p>
                {profile.bio && (
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2 italic">
                    &ldquo;{profile.bio}&rdquo;
                  </p>
                )}
                <div className="flex gap-1.5 flex-wrap">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2.5 py-0.5 bg-[#EDE9FE] text-[#7c5ce9] font-medium rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-lg font-bold text-[#7c5ce9] mb-0.5">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
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
              <h3 className="mb-3 font-semibold text-gray-700 text-sm">
                {section.title}
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (!item.toggle) {
                          handleMenuClick(item.action);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors ${index !== section.items.length - 1
                        ? "border-b border-gray-100"
                        : ""
                        }`}
                    >
                      <div className="w-10 h-10 bg-[#EDE9FE] rounded-full flex items-center justify-center">
                        <Icon
                          size={18}
                          className="text-[#7c5ce9]"
                        />
                      </div>
                      <span className="flex-1 text-left text-gray-800 font-medium text-sm">
                        {item.label}
                      </span>
                      {item.toggle ? (
                        <Switch
                          defaultChecked={notificationsEnabled}
                          onCheckedChange={(checked) => {
                            setNotificationsEnabled(checked);
                            toast(
                              checked
                                ? "Notifications enabled"
                                : "Notifications disabled"
                            );
                          }}
                        />
                      ) : (
                        <ChevronRight
                          size={18}
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
              className="w-full bg-red-50 border border-red-100 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-2xl py-6 shadow-sm font-medium"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. EDIT PROFILE DIALOG */}
      {/* ========================================================= */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6">
          <DialogHeader className="text-left mb-2">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#EDE9FE] text-[#7c5ce9] rounded-xl">
                <Edit size={18} />
              </span>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  Edit Profile
                </DialogTitle>
                <DialogDescription className="text-xs text-gray-500">
                  Update your display name, bio, and interests
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Photo Note */}
          <div className="flex items-center gap-2.5 p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-500">
            <Info size={16} className="text-[#1da6e0] shrink-0" />
            <span>Profile photo upload is disabled in this prototype.</span>
          </div>

          <div className="space-y-4 py-2">
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Full Name
              </label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-xl border-gray-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Email
              </label>
              <Input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="sam.doe@email.com"
                className="rounded-xl border-gray-200"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                About / Wingman Bio
              </label>
              <Textarea
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Tell friends what kind of connections you're looking to make..."
                className="rounded-xl border-gray-200 text-sm"
              />
            </div>

            {/* Interests Tag Manager */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Interests &amp; Passions
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2.5 min-h-[32px] p-2 bg-gray-50 border border-gray-200 rounded-xl">
                {editInterests.length === 0 ? (
                  <span className="text-xs text-gray-400 italic">No interests added yet</span>
                ) : (
                  editInterests.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE9FE] text-[#7c5ce9] text-xs font-medium rounded-full shadow-2xs"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(tag)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Add Custom Tag */}
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddInterest(newTagInput);
                    }
                  }}
                  placeholder="Add custom interest (e.g. Climbing)"
                  className="rounded-xl border-gray-200 text-xs h-9"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddInterest(newTagInput)}
                  className="rounded-xl border-gray-200 hover:bg-gray-100 text-xs h-9 px-3 shrink-0"
                >
                  <Plus size={14} className="mr-1" />
                  Add
                </Button>
              </div>

              {/* Suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-gray-400">Suggestions:</span>
                {suggestedTags
                  .filter((tag) => !editInterests.includes(tag))
                  .slice(0, 4)
                  .map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleAddInterest(suggestion)}
                      className="text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 transition-colors"
                    >
                      + {suggestion}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-end gap-2 pt-2 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditProfileOpen(false)}
              className="rounded-xl border-gray-200 text-xs px-4"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-[#1da6e0] to-[#05638f] text-white hover:opacity-95 rounded-xl text-xs px-4 shadow-sm"
            >
              <Check size={14} className="mr-1" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========================================================= */}
      {/* 2. ACCOUNT SETTINGS DIALOG */}
      {/* ========================================================= */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6">
          <DialogHeader className="text-left mb-2">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#EDE9FE] text-[#7c5ce9] rounded-xl">
                <Sliders size={18} />
              </span>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  Account Settings
                </DialogTitle>
                <DialogDescription className="text-xs text-gray-500">
                  Manage privacy, matchmaking preferences, and prototype options
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Privacy Section */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                <Shield size={12} />
                Privacy &amp; Visibility
              </div>

              <div className="space-y-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Ghost Mode
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Temporarily pause your profile and introductions
                    </p>
                  </div>
                  <Switch
                    checked={ghostMode}
                    onCheckedChange={(val) => {
                      setGhostMode(val);
                      toast(val ? "Ghost mode active" : "Ghost mode disabled");
                    }}
                  />
                </div>

                <div className="border-t border-gray-200/60 pt-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Read Receipts
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Show when you have read messages in chat
                    </p>
                  </div>
                  <Switch
                    checked={readReceipts}
                    onCheckedChange={(val) => {
                      setReadReceipts(val);
                      toast(val ? "Read receipts enabled" : "Read receipts off");
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Prototype Utilities */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                <RotateCcw size={12} />
                Prototype Controls
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setGhostMode(false);
                    setShowMutual(true);
                    setReadReceipts(true);
                    setWingmanMode(true);
                    setDiscoveryRadius([25]);
                    toast.success("Settings reset to prototype defaults");
                  }}
                  className="w-1/2 rounded-xl text-xs border-gray-200"
                >
                  Reset Defaults
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success("Temporary session cache cleared")}
                  className="w-1/2 rounded-xl text-xs border-gray-200"
                >
                  Clear Cache
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2 border-t border-gray-100">
            <Button
              type="button"
              onClick={() => {
                setIsSettingsOpen(false);
                toast.success("Settings saved");
              }}
              className="w-full bg-gradient-to-r from-[#1da6e0] to-[#05638f] text-white hover:opacity-95 rounded-xl text-xs font-medium shadow-sm py-4"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========================================================= */}
      {/* 3. HELP CENTER & FAQ DIALOG */}
      {/* ========================================================= */}
      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6">
          <DialogHeader className="text-left mb-2">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#EDE9FE] text-[#7c5ce9] rounded-xl">
                <HelpCircle size={18} />
              </span>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  Help Center &amp; FAQs
                </DialogTitle>
                <DialogDescription className="text-xs text-gray-500">
                  Frequently asked questions about Wingd &amp; this demo
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-2">
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem
                value="item-1"
                className="border border-gray-100 rounded-xl px-3 bg-gray-50/70"
              >
                <AccordionTrigger className="text-xs font-semibold text-gray-800 hover:no-underline py-3">
                  How do introductions work on Wingd?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 leading-relaxed pb-3">
                  Instead of cold swiping, trusted mutual friends in your Circle act as your wingmen. When a friend introduces you, both you and the candidate receive a blurb describing why you&apos;d hit it off. If you both accept, a private chat opens!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border border-gray-100 rounded-xl px-3 bg-gray-50/70"
              >
                <AccordionTrigger className="text-xs font-semibold text-gray-800 hover:no-underline py-3">
                  Who can see the people in my Circle?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 leading-relaxed pb-3">
                  Your Circle is completely private to you and the friends you mutually add. Random users cannot search your contact list or browse your connections.
                </AccordionContent>
              </AccordionItem>



              <AccordionItem
                value="item-4"
                className="border border-gray-100 rounded-xl px-3 bg-gray-50/70"
              >
                <AccordionTrigger className="text-xs font-semibold text-gray-800 hover:no-underline py-3">
                  Is my personal contact info shared?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 leading-relaxed pb-3">
                  No. All communication happens securely inside Wingd chats. Your phone number, email address, and exact location are never broadcast.
                </AccordionContent>
              </AccordionItem>


            </Accordion>
          </div>

          {/* Prototype Support Card */}
          <div className="p-3.5 bg-gradient-to-r from-[#1da6e0]/10 to-[#05638f]/10 border border-[#1da6e0]/20 rounded-2xl flex items-center justify-between gap-3 mt-1">
            <div>
              <p className="text-xs font-semibold text-gray-900">
                Have feedback on this prototype?
              </p>
              <p className="text-[11px] text-gray-600">
                Let the team know what you think of the flow.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() =>
                toast.success("Thank you! Your feedback was logged for the prototype.")
              }
              className="bg-gradient-to-r from-[#1da6e0] to-[#05638f] text-white hover:opacity-95 text-xs rounded-xl shrink-0 h-8 px-3"
            >
              Feedback
            </Button>
          </div>

          <DialogFooter className="pt-2 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsHelpOpen(false)}
              className="w-full rounded-xl text-xs border-gray-200 py-4"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}