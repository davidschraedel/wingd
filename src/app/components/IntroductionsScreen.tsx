import { motion, AnimatePresence } from "motion/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";

interface IntroductionsScreenProps {
  onNavigate: (screen: string) => void;
}

export function IntroductionsScreen({
  onNavigate,
}: IntroductionsScreenProps) {
  const location = useLocation();
  const initialTab = (location.state as any)?.tab || "pending";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if ((location.state as any)?.tab) {
      setActiveTab((location.state as any).tab);
    }
  }, [location.state]);

  const [collapsedIntros, setCollapsedIntros] = useState<number[]>([]);

  const toggleIntro = (id: number) => {
    setCollapsedIntros((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const [pendingIntros, setPendingIntros] = useState([
    {
      id: 1,
      name: "Alex Martinez",
      age: 26,
      introducedBy: "Sarah",
      interests: ["Hiking", "Photography"],
      avatar: "/avatars/alex.jpg",
      fallback: "AM",
      bio: "Loves outdoor adventures and capturing moments through the lens.",
      message:
        "You both love hiking and photography! I think you'd have great conversations about travel.",
    },
    {
      id: 2,
      name: "Brady Doyle",
      age: 28,
      introducedBy: "Mike",
      interests: ["Coffee", "Tech"],
      avatar: "/avatars/chris.jpg",
      fallback: "BD",
      bio: "Coffee enthusiast and tech startup founder.",
      message:
        "Both passionate about startups and tech. You might want to grab coffee together!",
    },
    {
      id: 3,
      name: "Lena Bennett",
      age: 25,
      introducedBy: "Emily",
      interests: ["Art", "Music"],
      avatar: "/avatars/diana.jpg",
      fallback: "LB",
      bio: "Artist and musician with a passion for creative expression.",
      message:
        "Lena has an amazing art studio and loves live music, just like you!",
    },
  ]);

  const [acceptedIntros, setAcceptedIntros] = useState([
    {
      id: 4,
      name: "Jordan Smith",
      age: 27,
      introducedBy: "Alex",
      interests: ["Fitness", "Travel"],
      avatar: "/avatars/jordan.jpg",
      fallback: "JS",
      date: "Accepted 3 days ago",
    },
    {
      id: 5,
      name: "Taylor Brown",
      age: 29,
      introducedBy: "Jordan",
      interests: ["Music", "Food"],
      avatar: "/avatars/olivia.jpg",
      fallback: "TB",
      date: "Accepted 1 week ago",
    },
  ]);

  const handleAccept = (id: number, name: string) => {
    const intro = pendingIntros.find((i) => i.id === id);
    if (intro) {
      setPendingIntros(
        pendingIntros.filter((i) => i.id !== id),
      );
      setAcceptedIntros([
        {
          id: intro.id,
          name: intro.name,
          age: intro.age,
          introducedBy: intro.introducedBy,
          interests: intro.interests,
          avatar: intro.avatar,
          fallback: intro.fallback,
          date: "Just accepted",
        },
        ...acceptedIntros,
      ]);
      toast.success(`You accepted the introduction!`, {
        description: `${name} has been notified. They're now in your Matches!`,
        icon: <Check className="text-green-500" />,
      });
    }
  };

  const handleReject = (id: number, name: string) => {
    setPendingIntros(pendingIntros.filter((i) => i.id !== id));
    toast.success(`Introduction declined`, {
      description: `${name} won't be notified about this.`,
    });
  };

  const handleRemoveDatingConnection = (
    id: number,
    name: string,
  ) => {
    setAcceptedIntros(
      acceptedIntros.filter((i) => i.id !== id),
    );
    toast.success(`${name} removed from dating connections`, {
      description: "They won't be notified about this change.",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1da6e0] to-[#05638f] px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">Introduced</h1>
          <p className="text-white/90 text-sm mt-1">
            People introduced to you by your circle
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-6">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white rounded-2xl p-1 shadow-sm">
              <TabsTrigger
                value="pending"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1da6e0] data-[state=active]:to-[#05638f] data-[state=active]:text-white"
              >
                Pending ({pendingIntros.length})
              </TabsTrigger>
              <TabsTrigger
                value="accepted"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1da6e0] data-[state=active]:to-[#05638f] data-[state=active]:text-white"
              >
                Matches ({acceptedIntros.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingIntros.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F0ABFC] to-[#F5D0FE] rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
                    <Check size={32} className="text-white" />
                  </div>
                  <p className="text-gray-500">
                    No pending introductions
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                pendingIntros.map((intro, index) => (
                  <motion.div
                    key={intro.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#1da6e0]/10"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16 border-2 border-[#1da6e0]/30">
                        {intro.avatar && (
                          <AvatarImage
                            src={intro.avatar}
                            alt={intro.name}
                          />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-[#1da6e0] to-[#5cc2f0] text-white">
                          {intro.fallback}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{intro.name}</span>
                          <span className="text-gray-500">
                            {intro.age}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          Introduced by{" "}
                          <span className="text-[#1da6e0]">
                            {intro.introducedBy}
                          </span>
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {intro.interests.map((interest) => (
                            <span
                              key={interest}
                              className="px-3 py-1 bg-[#E3F5FF] text-[#1da6e0] rounded-full text-xs"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleIntro(intro.id)}
                        className="text-gray-400 hover:text-[#1da6e0] transition-colors"
                        aria-label={!collapsedIntros.includes(intro.id) ? "Collapse introduction details" : "Expand introduction details"}
                      >
                        {!collapsedIntros.includes(intro.id) ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {!collapsedIntros.includes(intro.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4 overflow-hidden"
                        >
                          <div className="bg-[#E3F5FF]/30 rounded-xl p-4">
                            <p className="text-sm text-gray-700 mb-3">
                              {intro.bio}
                            </p>
                            {intro.message && (
                              <div className="bg-white rounded-lg p-3 border border-[#1da6e0]/20">
                                <p className="text-xs text-[#1da6e0] mb-1">
                                  Message from{" "}
                                  {intro.introducedBy}:
                                </p>
                                <p className="text-sm text-gray-600 italic">
                                  "{intro.message}"
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-3">
                      <Button
                        onClick={() =>
                          handleReject(intro.id, intro.name)
                        }
                        className="flex-1 bg-[#FEF2F2] text-[#EF4444] hover:bg-[#EF4444] hover:text-white rounded-full py-6 border-0 shadow-sm"
                      >
                        <X size={18} className="mr-2" />
                        Decline
                      </Button>
                      <Button
                        onClick={() =>
                          handleAccept(intro.id, intro.name)
                        }
                        className="flex-1 bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white rounded-full py-6 border-0 shadow-sm"
                      >
                        <Check size={18} className="mr-2" />
                        Match
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-4">
              {acceptedIntros.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1da6e0] to-[#5cc2f0] rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
                    <Check size={32} className="text-white" />
                  </div>
                  <p className="text-gray-500">
                    No dating connections yet
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Accept an introduction to get started!
                  </p>
                </div>
              ) : (
                acceptedIntros.map((intro, index) => (
                  <motion.div
                    key={intro.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-[#1da6e0]/10"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 border-2 border-[#1da6e0]/30">
                        {intro.avatar && (
                          <AvatarImage
                            src={intro.avatar}
                            alt={intro.name}
                          />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-[#1da6e0] to-[#5cc2f0] text-white">
                          {intro.fallback}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className="flex-1"
                        onClick={() => onNavigate("chats")}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{intro.name}</span>
                          <span className="text-gray-500">
                            {intro.age}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">
                          Introduced by{" "}
                          <span className="text-[#1da6e0]">
                            {intro.introducedBy}
                          </span>
                        </p>
                        <p className="text-xs text-[#1da6e0]">
                          {intro.date}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => onNavigate("chats")}
                          className="bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white rounded-full border-0 shadow-sm px-6"
                        >
                          Chat
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full px-4"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-3xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove Dating Connection?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove{" "}
                                {intro.name} from your dating
                                connections? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-full">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleRemoveDatingConnection(
                                    intro.id,
                                    intro.name,
                                  )
                                }
                                className="bg-red-500 hover:bg-red-600 rounded-full"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

    </div>
  );
}
