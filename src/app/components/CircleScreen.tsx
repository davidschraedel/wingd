import { motion } from "motion/react";
import {
  Search,
  UserPlus,
  User,
  UserMinus,
  Trash2,
  Mail,
  Clock,
  SlidersHorizontal,
  Minus,
  Check,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";

function formatNamesList(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

interface CircleScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function CircleScreen({
  onNavigate,
}: CircleScreenProps) {
  const location = useLocation();
  const initialTab = (location.state as any)?.tab || "circle";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [connections, setConnections] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      mutualFriends: 12,
      interests: ["Hiking", "Photography"],
      avatar: "/avatars/sarah.jpg",
      fallback: "SJ",
      status: "connected",
      bio: "Landscape photographer and trail runner. Always happy to meet fellow creators and hikers!",
    },
    {
      id: 2,
      name: "Mike Chen",
      mutualFriends: 8,
      interests: ["Coffee", "Tech"],
      avatar: "/avatars/mike.jpg",
      fallback: "MC",
      status: "connected",
      bio: "Software engineer & specialty coffee enthusiast. Exploring new tech and roasters in the city.",
    },
    {
      id: 3,
      name: "Emily Roberts",
      mutualFriends: 15,
      interests: ["Art", "Music"],
      avatar: "/avatars/emily.jpg",
      fallback: "ER",
      status: "connected",
      bio: "Illustrator and vinyl collector. Passionate about community art projects and live indie music.",
    },
    {
      id: 4,
      name: "Alex Martinez",
      mutualFriends: 6,
      interests: ["Fitness", "Travel"],
      avatar: "/avatars/alex.jpg",
      fallback: "AM",
      status: "connected",
      bio: "Personal trainer and travel blogger. Exploring 30 countries and counting!",
    },
    {
      id: 5,
      name: "Kaden Dyer",
      mutualFriends: 8,
      interests: ["Chess", "Gymnastics"],
      fallback: "KD",
      status: "connected",
      bio: "Chess strategist and former competitive gymnast. Always down for a match or puzzle.",
    },
    {
      id: 6,
      name: "Gael Clay",
      mutualFriends: 3,
      interests: ["Wizardry", "Dance"],
      fallback: "GC",
      status: "connected",
      bio: "Contemporary dancer and theatre fan. Exploring movement, performance art, and storytelling.",
    },
    {
      id: 7,
      name: "Augustine Munoz",
      mutualFriends: 3,
      interests: ["Film", "Cooking"],
      fallback: "AM",
      status: "connected",
      bio: "Indie filmmaker and home chef. Exploring culinary traditions and short-form documentaries.",
    },
    {
      id: 8,
      name: "Gracelyn Daniel",
      mutualFriends: 5,
      interests: ["Sports", "Trivia"],
      fallback: "GD",
      status: "connected",
      bio: "Sports fanatic and pub trivia host. Love organizing team game nights and casual hangouts.",
    },
    {
      id: 9,
      name: "Jordan Lee",
      mutualFriends: 4,
      interests: ["Reading", "Cooking"],
      avatar: "/avatars/jordan.jpg",
      fallback: "JL",
      status: "connected",
      bio: "Book lover and amateur baker. Looking to exchange book recommendations and sourdough recipes.",
    },
    {
      id: 10,
      name: "Taylor Swift",
      mutualFriends: 3,
      interests: ["Music", "Fashion"],
      fallback: "TS",
      status: "suggested",
      bio: "Songwriter, musician, and storyteller. Believer in warm connections and creative sparks.",
    },
    {
      id: 11,
      name: "Chris Anderson",
      mutualFriends: 2,
      interests: ["Running", "Books"],
      avatar: "/avatars/chris.jpg",
      fallback: "CA",
      status: "suggested",
      bio: "Marathon runner and bookstore browser. Always looking for new routes and great reads.",
    },
  ]);

  const [pendingInvitations, setPendingInvitations] = useState([
    {
      id: 101,
      person1: {
        name: "Sarah Johnson",
        email: null,
        isUser: true,
        avatar: "/avatars/sarah.jpg",
        fallback: "SJ",
      },
      person2: {
        name: "David Chen",
        email: "david.chen@email.com",
        isUser: false,
        fallback: "DC",
      },
      message:
        "You both love startups and tech! Would be great to connect.",
      createdAt: "2 days ago",
      waitingFor: ["David Chen"],
    },
    {
      id: 102,
      person1: {
        name: "Lisa Park",
        email: "lisa.park@email.com",
        isUser: false,
        fallback: "LP",
      },
      person2: {
        name: "James Wilson",
        email: "james.w@email.com",
        isUser: false,
        fallback: "JW",
      },
      message:
        "Both amazing photographers who I think would hit it off!",
      createdAt: "5 days ago",
      waitingFor: ["Lisa Park", "James Wilson"],
    },
    {
      id: 103,
      person1: {
        name: "Mike Chen",
        email: null,
        isUser: true,
        avatar: "/avatars/mike.jpg",
        fallback: "MC",
      },
      person2: {
        name: "Emily Roberts",
        email: null,
        isUser: true,
        avatar: "/avatars/emily.jpg",
        fallback: "ER",
      },
      message:
        "You both share a passion for art and coffee. I think you'd really enjoy each other's company!",
      createdAt: "1 week ago",
      waitingFor: [],
    },
  ]);

  const [matchedInvitations, setMatchedInvitations] = useState([
    {
      id: 201,
      person1: {
        id: 4,
        name: "Alex Martinez",
        avatar: "/avatars/alex.jpg",
        fallback: "AM",
      },
      person2: {
        id: 9,
        name: "Jordan Lee",
        avatar: "/avatars/jordan.jpg",
        fallback: "JL",
      },
      createdAt: "3 days ago",
    },
  ]);

  const [isManageMode, setIsManageMode] = useState(false);
  const [selectedToRemove, setSelectedToRemove] = useState<Set<number>>(new Set());
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<typeof connections[0] | null>(null);

  useEffect(() => {
    const state = location.state as any;
    if (state?.tab) {
      setActiveTab(state.tab);
    }
    if (state?.personId) {
      const person = connections.find((c) => c.id === state.personId);
      if (person) {
        setSelectedProfile(person);
      }
    }
  }, [location.state, connections]);

  const toggleSelectToRemove = (id: number) => {
    setSelectedToRemove((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleBatchRemove = () => {
    const count = selectedToRemove.size;
    setConnections(connections.filter((c) => !selectedToRemove.has(c.id)));
    setIsConfirmRemoveOpen(false);
    setIsManageMode(false);
    setSelectedToRemove(new Set());
    toast.success(
      count === 1
        ? "Member removed from your circle"
        : `${count} members removed from your circle`,
      {
        description: "They won't be notified about this change.",
      },
    );
  };

  const handleAddToCircle = (id: number, name: string) => {
    setConnections(
      connections.map((c) =>
        c.id === id ? { ...c, status: "pending" } : c,
      ),
    );
    toast.success(`Request sent to ${name}!`, {
      description: "Once they accept, they'll be added to your circle.",
    });
  };

  const handleCancelInvitation = (id: number) => {
    setPendingInvitations(
      pendingInvitations.filter((i) => i.id !== id),
    );
    toast.success("Invitation cancelled", {
      description: "The pending introduction has been removed.",
    });
  };

  const filteredConnections = connections.filter((conn) =>
    conn.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedNames = connections
    .filter((c) => selectedToRemove.has(c.id))
    .map((c) => c.name);

  const connectedUsers = filteredConnections.filter(
    (c) => c.status === "connected",
  );
  const suggestedUsers = filteredConnections.filter(
    (c) => c.status === "suggested" || c.status === "pending",
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#77d75b] to-[#5cb844] px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-4">
            <Button
              onClick={() => onNavigate("add-to-circle")}
              className="bg-white/20 hover:bg-white text-white hover:text-[#5cb844] border-0 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 px-6"
            >
              <UserPlus size={20} className="mr-2" />
              Add to Circle
            </Button>
            <Button
              onClick={() => onNavigate("send-introduction")}
              className="bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white border-0 rounded-full shadow-sm min-w-24"
            >
              <User size={20} /> {"->"} <User size={20} />
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
              placeholder="Search your circle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-white/95 border-0 rounded-2xl py-6 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white rounded-2xl p-1 shadow-sm">
              <TabsTrigger
                value="circle"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#77d75b] data-[state=active]:to-[#5cb844] data-[state=active]:text-white"
              >
                My Circle ({connectedUsers.length})
              </TabsTrigger>
              <TabsTrigger
                value="invites"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#77d75b] data-[state=active]:to-[#5cb844] data-[state=active]:text-white"
              >
                Intros Given ({pendingInvitations.length + matchedInvitations.length})
              </TabsTrigger>
            </TabsList>

            {/* My Circle Tab */}
            <TabsContent value="circle" className="space-y-6">
              {/* Connected Users */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">
                    In Your Circle ({connectedUsers.length})
                  </h3>
                  {connectedUsers.length > 0 && (
                    !isManageMode ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsManageMode(true);
                          setSelectedToRemove(new Set());
                        }}
                        className="text-[#5cb844] hover:text-[#4a9737] hover:bg-[#F0F9ED] rounded-full text-xs font-medium h-8 px-3"
                      >
                        <SlidersHorizontal size={14} className="mr-1.5" />
                        Manage
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setIsManageMode(false);
                            setSelectedToRemove(new Set());
                          }}
                          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full text-xs h-8 px-3"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          disabled={selectedToRemove.size === 0}
                          onClick={() => setIsConfirmRemoveOpen(true)}
                          className="bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:hover:bg-red-500 text-white rounded-full text-xs h-8 px-3 shadow-sm transition-all"
                        >
                          Remove {selectedToRemove.size > 0 ? `(${selectedToRemove.size})` : ""}
                        </Button>
                      </div>
                    )
                  )}
                </div>

                {isManageMode && (
                  <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 mb-3 text-xs text-amber-800 flex items-center justify-between">
                    <span>Select members you wish to remove from your circle.</span>
                    {selectedToRemove.size > 0 && (
                      <button
                        onClick={() => setSelectedToRemove(new Set())}
                        className="font-medium text-amber-900 underline hover:text-amber-700 ml-2 whitespace-nowrap"
                      >
                        Deselect all
                      </button>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  {connectedUsers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200 p-6">
                      <p className="text-gray-500 text-sm">Your circle is currently empty.</p>
                      <Button
                        onClick={() => onNavigate("add-to-circle")}
                        className="mt-3 bg-[#77d75b] hover:bg-[#5cb844] text-white rounded-full text-xs px-4"
                      >
                        <UserPlus size={14} className="mr-1.5" />
                        Add People to Circle
                      </Button>
                    </div>
                  ) : (
                    connectedUsers.map((connection, index) => {
                      const isSelected = selectedToRemove.has(connection.id);
                      return (
                        <motion.div
                          key={connection.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            if (isManageMode) {
                              toggleSelectToRemove(connection.id);
                            }
                          }}
                          className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all ${isManageMode
                            ? isSelected
                              ? "border-2 border-red-300 bg-red-50/20 cursor-pointer"
                              : "border-2 border-transparent hover:border-gray-200 cursor-pointer"
                            : "border-2 border-transparent"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              onClick={(e) => {
                                if (!isManageMode) {
                                  e.stopPropagation();
                                  setSelectedProfile(connection);
                                }
                              }}
                              className={`w-14 h-14 border-2 border-[#77d75b]/20 flex-shrink-0 ${!isManageMode ? "cursor-pointer hover:scale-105 transition-transform" : ""
                                }`}
                            >
                              {connection.avatar && (
                                <AvatarImage
                                  src={connection.avatar}
                                  alt={connection.name}
                                />
                              )}
                              <AvatarFallback className="bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white">
                                {connection.fallback}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="mb-1">
                                <span
                                  onClick={(e) => {
                                    if (!isManageMode) {
                                      e.stopPropagation();
                                      setSelectedProfile(connection);
                                    }
                                  }}
                                  className={`inline-block font-semibold text-gray-900 truncate max-w-full ${!isManageMode ? "cursor-pointer hover:text-[#5cb844] transition-colors" : ""
                                    }`}
                                >
                                  {connection.name}
                                </span>
                              </div>
                              <div className="flex gap-1.5 flex-wrap">
                                {connection.interests.map((interest) => (
                                  <span
                                    key={interest}
                                    className="px-2.5 py-0.5 bg-[#F0F9ED] text-[#77d75b] rounded-full text-xs font-medium"
                                  >
                                    {interest}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {!isManageMode ? (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigate("send-introduction", {
                                    person: {
                                      id: connection.id,
                                      name: connection.name,
                                      avatar: connection.avatar,
                                      fallback: connection.fallback,
                                      interests: connection.interests,
                                    },
                                  });
                                }}
                                className="bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white rounded-full px-6 border-0 shadow-sm whitespace-nowrap flex-shrink-0"
                              >
                                Introduce
                              </Button>
                            ) : (
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${isSelected
                                  ? "bg-red-500 text-white shadow-sm"
                                  : "border-2 border-gray-300 text-transparent hover:border-red-400"
                                  }`}
                              >
                                <Minus size={16} strokeWidth={3} />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Suggested Connections */}
              {suggestedUsers.length > 0 && !isManageMode && (
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900">People You May Know</h3>
                  <div className="space-y-3">
                    {suggestedUsers.map((connection, index) => (
                      <motion.div
                        key={connection.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            onClick={() => setSelectedProfile(connection)}
                            className="w-14 h-14 border-2 border-[#77d75b]/20 cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
                          >
                            {connection.avatar && (
                              <AvatarImage
                                src={connection.avatar}
                                alt={connection.name}
                              />
                            )}
                            <AvatarFallback className="bg-gradient-to-br from-[#E3F5FF] to-[#F0F9FF] text-gray-600">
                              {connection.fallback}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="mb-1">
                              <span
                                onClick={() => setSelectedProfile(connection)}
                                className="inline-block font-semibold text-gray-900 truncate max-w-full cursor-pointer hover:text-[#5cb844] transition-colors"
                              >
                                {connection.name}
                              </span>
                            </div>
                            <div className="flex gap-1.5 flex-wrap">
                              {connection.interests.map((interest) => (
                                <span
                                  key={interest}
                                  className="px-2.5 py-0.5 bg-[#F0F9ED] text-[#77d75b] rounded-full text-xs font-medium"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                          {connection.status === "pending" ? (
                            <Button
                              disabled
                              className="bg-gray-100 text-gray-500 rounded-full px-5 border-0 shadow-none cursor-default flex-shrink-0"
                            >
                              <Clock size={16} className="mr-1.5" />
                              Requested
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                handleAddToCircle(
                                  connection.id,
                                  connection.name,
                                )
                              }
                              className="bg-[#F0F9ED] text-[#77d75b] hover:bg-[#77d75b] hover:text-white rounded-full px-6 border-0 shadow-sm flex-shrink-0"
                            >
                              <UserPlus
                                size={16}
                                className="mr-2"
                              />
                              Add to Circle
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Pending Invites Tab */}
            <TabsContent value="invites" className="space-y-4">
              {pendingInvitations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#77d75b] to-[#a0e88b] rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
                    <Mail size={32} className="text-white" />
                  </div>
                  <p className="text-gray-500">
                    No pending invitations
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Invite people to join Wingd and make
                    introductions!
                  </p>
                </div>
              ) : (
                pendingInvitations.map((invitation, index) => (
                  <motion.div
                    key={invitation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#77d75b]/20"
                  >
                    <div className="mb-4">
                      {invitation.waitingFor.length > 0 ? (
                        <div className="flex items-center gap-2 mb-3">
                          <Clock
                            size={16}
                            className="text-[#77d75b]"
                          />
                          <p className="text-xs text-[#77d75b]">
                            Waiting for{" "}
                            {invitation.waitingFor.join(" and ")}{" "}
                            to join
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mb-3">
                          <Clock
                            size={16}
                            className="text-[#1da6e0]"
                          />
                          <p className="text-xs text-[#1da6e0]">
                            Introduction sent - both users
                            notified
                          </p>
                        </div>
                      )}

                      {/* Two people being introduced */}
                      <div className="space-y-3">
                        {/* Person 1 */}
                        <div className="flex items-center gap-3 p-3 bg-[#F0F9ED] rounded-xl">
                          {invitation.person1.isUser ? (
                            <Avatar className="w-12 h-12 border-2 border-[#77d75b]/30">
                              {invitation.person1.avatar && (
                                <AvatarImage
                                  src={invitation.person1.avatar}
                                  alt={invitation.person1.name}
                                />
                              )}
                              <AvatarFallback className="bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white">
                                {invitation.person1.fallback}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-[#77d75b] to-[#a0e88b] rounded-full flex items-center justify-center">
                              <Mail
                                className="text-white"
                                size={20}
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {invitation.person1.name}
                              </span>
                              {invitation.person1.isUser ? (
                                <span className="px-2 py-0.5 bg-[#77d75b]/30 text-[#77d75b] rounded-full text-xs">
                                  In your Circle
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-[#77d75b]/20 text-[#77d75b] rounded-full text-xs">
                                  Invited
                                </span>
                              )}
                            </div>
                            {invitation.person1.email && (
                              <p className="text-xs text-gray-500">
                                {invitation.person1.email}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Connector */}
                        <div className="flex justify-center">
                          <div className="w-px h-6 bg-gradient-to-b from-[#77d75b] to-transparent" />
                        </div>

                        {/* Person 2 */}
                        <div className="flex items-center gap-3 p-3 bg-[#F0F9ED] rounded-xl">
                          {invitation.person2.isUser ? (
                            <Avatar className="w-12 h-12 border-2 border-[#77d75b]/30">
                              {invitation.person2.avatar && (
                                <AvatarImage
                                  src={invitation.person2.avatar}
                                  alt={invitation.person2.name}
                                />
                              )}
                              <AvatarFallback className="bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white">
                                {invitation.person2.fallback}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-[#77d75b] to-[#a0e88b] rounded-full flex items-center justify-center">
                              <Mail
                                className="text-white"
                                size={20}
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {invitation.person2.name}
                              </span>
                              {invitation.person2.isUser ? (
                                <span className="px-2 py-0.5 bg-[#77d75b]/30 text-[#77d75b] rounded-full text-xs">
                                  In your Circle
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-[#77d75b]/20 text-[#77d75b] rounded-full text-xs">
                                  Invited
                                </span>
                              )}
                            </div>
                            {invitation.person2.email && (
                              <p className="text-xs text-gray-500">
                                {invitation.person2.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    {invitation.message && (
                      <div className="bg-[#E3F5FF]/30 rounded-xl p-3 mb-4">
                        <p className="text-xs text-[#1da6e0] mb-1">
                          Your message:
                        </p>
                        <p className="text-sm text-gray-600 italic">
                          "{invitation.message}"
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        Created {invitation.createdAt}
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Cancel
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-3xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Cancel Invitation?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel this
                              introduction invitation? The invited
                              person won't be notified.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-full">
                              Keep It
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleCancelInvitation(
                                  invitation.id,
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 rounded-full"
                            >
                              Cancel Invitation
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </motion.div>
                ))
              )}

              {/* Matched Introduction Entry */}
              {matchedInvitations.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (pendingInvitations.length + index) * 0.1,
                  }}
                  className="bg-white rounded-2xl p-5 sm:py-6 sm:px-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between gap-3 sm:gap-6">
                    {/* Person 1: Avatar & Name */}
                    <div
                      className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 min-w-0 cursor-pointer group shrink-0"
                      onClick={() => {
                        const person = connections.find(
                          (c) => c.id === match.person1.id,
                        );
                        if (person) setSelectedProfile(person);
                      }}
                    >
                      <Avatar className="w-12 h-12 sm:w-13 sm:h-13 border border-gray-200 shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                        {match.person1.avatar && (
                          <AvatarImage
                            src={match.person1.avatar}
                            alt={match.person1.name}
                          />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white font-medium text-xs sm:text-sm">
                          {match.person1.fallback}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 text-center sm:text-left">
                        <span className="font-semibold text-gray-900 text-xs sm:text-sm truncate block max-w-[90px] sm:max-w-none group-hover:text-[#5cb844] transition-colors">
                          {match.person1.name}
                        </span>
                      </div>
                    </div>

                    {/* Center Connector Bridge */}
                    <div className="flex-1 flex items-center justify-center min-w-0 px-2 sm:px-6">
                      {/* Left line */}
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#a0e88b] to-[#77d75b] min-w-4 sm:min-w-8" />

                      {/* Center Status Pill & Date */}
                      <div className="flex flex-col items-center justify-center px-2.5 sm:px-4 shrink-0">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F0F9ED] border border-[#77d75b]/30 text-[#5cb844] text-xs font-semibold whitespace-nowrap shadow-xs">
                          <Check size={13} strokeWidth={2.5} />
                          <span>Connected</span>
                        </div>
                        <span className="text-[11px] text-gray-400 mt-1.5 font-normal tracking-wide">
                          {match.createdAt}
                        </span>
                      </div>

                      {/* Right line */}
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#a0e88b] to-[#77d75b] min-w-4 sm:min-w-8" />
                    </div>

                    {/* Person 2: Avatar & Name */}
                    <div
                      className="flex flex-col-reverse sm:flex-row items-center gap-2 sm:gap-3 min-w-0 cursor-pointer group shrink-0 justify-end"
                      onClick={() => {
                        const person = connections.find(
                          (c) => c.id === match.person2.id,
                        );
                        if (person) setSelectedProfile(person);
                      }}
                    >
                      <div className="min-w-0 text-center sm:text-right">
                        <span className="font-semibold text-gray-900 text-xs sm:text-sm truncate block max-w-[90px] sm:max-w-none group-hover:text-[#5cb844] transition-colors">
                          {match.person2.name}
                        </span>
                      </div>
                      <Avatar className="w-12 h-12 sm:w-13 sm:h-13 border border-gray-200 shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                        {match.person2.avatar && (
                          <AvatarImage
                            src={match.person2.avatar}
                            alt={match.person2.name}
                          />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white font-medium text-xs sm:text-sm">
                          {match.person2.fallback}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Batch Removal Confirmation Dialog */}
      <AlertDialog open={isConfirmRemoveOpen} onOpenChange={setIsConfirmRemoveOpen}>
        <AlertDialogContent className="rounded-3xl max-w-sm sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Circle?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 leading-relaxed text-sm">
              You are removing{" "}
              <span className="font-semibold text-gray-900">
                {formatNamesList(selectedNames)}
              </span>
              . Are you sure you want to remove them from your circle?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBatchRemove}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Member Profile Modal */}
      <Dialog open={!!selectedProfile} onOpenChange={(open) => !open && setSelectedProfile(null)}>
        <DialogContent className="rounded-3xl max-w-sm sm:max-w-md p-6">
          <DialogHeader className="items-center text-center">
            <Avatar className="w-20 h-20 border-4 border-[#77d75b]/20 mb-2 shadow-sm">
              {selectedProfile?.avatar && (
                <AvatarImage src={selectedProfile.avatar} alt={selectedProfile.name} />
              )}
              <AvatarFallback className="bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white text-xl">
                {selectedProfile?.fallback}
              </AvatarFallback>
            </Avatar>
            <DialogTitle className="text-xl font-bold">{selectedProfile?.name}</DialogTitle>
            <DialogDescription className="text-gray-500 text-xs">
              {selectedProfile?.status === "connected" ? "In your circle" : "Recommended for you"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {selectedProfile?.bio && (
              <p className="text-sm text-gray-600 text-center italic px-2">
                &ldquo;{selectedProfile.bio}&rdquo;
              </p>
            )}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Interests & Topics
              </div>
              <div className="flex gap-2 flex-wrap">
                {selectedProfile?.interests?.map((interest: string) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-[#F0F9ED] text-[#77d75b] rounded-full text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
            {selectedProfile?.status === "connected" ? (
              <Button
                onClick={() => {
                  const person = selectedProfile;
                  setSelectedProfile(null);
                  if (person) {
                    onNavigate("send-introduction", { person });
                  }
                }}
                className="w-full bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white rounded-full py-5 shadow-sm"
              >
                <User size={16} className="mr-2" />
                Introduce {selectedProfile?.name?.split(" ")[0]}
              </Button>
            ) : selectedProfile?.status === "pending" ? (
              <Button
                disabled
                className="w-full bg-gray-100 text-gray-500 rounded-full py-5 cursor-default"
              >
                <Clock size={16} className="mr-2" />
                Request Pending
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (selectedProfile) {
                    handleAddToCircle(selectedProfile.id, selectedProfile.name);
                    setSelectedProfile(null);
                  }
                }}
                className="w-full bg-gradient-to-r from-[#77d75b] to-[#5cb844] hover:from-[#5cb844] hover:to-[#77d75b] text-white rounded-full py-5 shadow-sm"
              >
                <UserPlus size={16} className="mr-2" />
                Add to Circle
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}