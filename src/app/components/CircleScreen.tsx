import { motion } from "motion/react";
import {
  Search,
  UserPlus,
  User,
  UserMinus,
  Trash2,
  Mail,
  Clock,
} from "lucide-react";
import { BottomNav } from "./BottomNav";
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
import { useState } from "react";
import { toast } from "sonner";

interface CircleScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function CircleScreen({
  onNavigate,
}: CircleScreenProps) {
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
    },
    {
      id: 2,
      name: "Mike Chen",
      mutualFriends: 8,
      interests: ["Coffee", "Tech"],
      avatar: "/avatars/mike.jpg",
      fallback: "MC",
      status: "connected",
    },
    {
      id: 3,
      name: "Emily Roberts",
      mutualFriends: 15,
      interests: ["Art", "Music"],
      avatar: "/avatars/emily.jpg",
      fallback: "ER",
      status: "connected",
    },
    {
      id: 4,
      name: "Alex Martinez",
      mutualFriends: 6,
      interests: ["Fitness", "Travel"],
      avatar: "/avatars/alex.jpg",
      fallback: "AM",
      status: "connected",
    },
    {
      id: 5,
      name: "Kaden Dyer",
      mutualFriends: 8,
      interests: ["Chess", "Gymnastics"],
      fallback: "KD",
      status: "connected",
    },
    {
      id: 6,
      name: "Gael Clay",
      mutualFriends: 3,
      interests: ["Wizardry", "Dance"],
      fallback: "GC",
      status: "connected",
    },
    {
      id: 7,
      name: "Augustine Munoz",
      mutualFriends: 3,
      interests: ["Film", "Cooking"],
      fallback: "AM",
      status: "connected",
    },
    {
      id: 8,
      name: "Gracelyn Daniel",
      mutualFriends: 5,
      interests: ["Sports", "Trivia"],
      fallback: "GD",
      status: "connected",
    },
    {
      id: 9,
      name: "Jordan Lee",
      mutualFriends: 0,
      interests: ["Reading", "Cooking"],
      fallback: "JL",
      status: "suggested",
    },
    {
      id: 10,
      name: "Taylor Swift",
      mutualFriends: 3,
      interests: ["Music", "Fashion"],
      fallback: "TS",
      status: "suggested",
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

  const handleRemoveFromCircle = (id: number, name: string) => {
    setConnections(connections.filter((c) => c.id !== id));
    toast.success(`${name} removed from your circle`, {
      description: "They won't be notified about this change.",
    });
  };

  const handleAddToCircle = (id: number, name: string) => {
    setConnections(
      connections.map((c) =>
        c.id === id ? { ...c, status: "connected" } : c,
      ),
    );
    toast.success(`${name} added to your circle!`, {
      description: "You can now introduce them to others.",
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

  const connectedUsers = filteredConnections.filter(
    (c) => c.status === "connected",
  );
  const suggestedUsers = filteredConnections.filter(
    (c) => c.status === "suggested",
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#77d75b] to-[#5cb844] px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-4">
          <Button
            onClick={() => onNavigate("add-to-circle")}
            className="bg-white/20 hover:bg-white/25 text-white border-0 rounded-full shadow-sm px-6"
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

      {/* Content */}
      <div className="px-6 mt-6">
        <Tabs defaultValue="circle" className="w-full">
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
              Intros Given ({pendingInvitations.length})
            </TabsTrigger>
          </TabsList>

          {/* My Circle Tab */}
          <TabsContent value="circle" className="space-y-6">
            {/* Connected Users */}
            <div>
              <h3 className="mb-3">
                In Your Circle ({connectedUsers.length})
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
                      <Avatar className="w-14 h-14 border-2 border-[#77d75b]/20">
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
                      <div className="flex-1">
                        <div className="mb-1">
                          {connection.name}
                        </div>
                        <p className="text-sm text-gray-500">
                          {connection.mutualFriends} shared
                          circles
                        </p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {connection.interests.map(
                            (interest) => (
                              <span
                                key={interest}
                                className="px-3 py-1 bg-[#F0F9ED] text-[#77d75b] rounded-full text-xs"
                              >
                                {interest}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() =>
                            onNavigate("send-introduction", {
                              person: {
                                id: connection.id,
                                name: connection.name,
                                avatar: connection.avatar,
                                fallback: connection.fallback,
                                interests: connection.interests,
                              },
                            })
                          }
                          className="bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white rounded-full px-6 border-0 shadow-sm whitespace-nowrap"
                        >
                          Introduce
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full px-4"
                            >
                              <UserMinus size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-3xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove from Circle?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove{" "}
                                {connection.name} from your
                                circle? You can always add them
                                back later.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-full">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleRemoveFromCircle(
                                    connection.id,
                                    connection.name,
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
                ))}
              </div>
            </div>

            {/* Suggested Connections */}
            {suggestedUsers.length > 0 && (
              <div>
                <h3 className="mb-3">People You May Know</h3>
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
                        <Avatar className="w-14 h-14 border-2 border-[#77d75b]/20">
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
                        <div className="flex-1">
                          <div className="mb-1">
                            {connection.name}
                          </div>
                          <p className="text-sm text-gray-500">
                            {connection.mutualFriends > 0
                              ? `${connection.mutualFriends} mutual connections`
                              : "Recommended for you"}
                          </p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {connection.interests.map(
                              (interest) => (
                                <span
                                  key={interest}
                                  className="px-3 py-1 bg-[#F0F9ED] text-[#77d75b] rounded-full text-xs"
                                >
                                  {interest}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            handleAddToCircle(
                              connection.id,
                              connection.name,
                            )
                          }
                          className="bg-[#F0F9ED] text-[#77d75b] hover:bg-[#77d75b] hover:text-white rounded-full px-6 border-0 shadow-sm"
                        >
                          <UserPlus
                            size={16}
                            className="mr-2"
                          />
                          Add
                        </Button>
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
                  exit={{ opacity: 0, x: -100 }}
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
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav active="circle" onNavigate={onNavigate} />
    </div>
  );
}