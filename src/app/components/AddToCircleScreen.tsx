import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  UserPlus,
  Mail,
  Users,
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
import { useState } from "react";
import { toast } from "sonner";

interface AddToCircleScreenProps {
  onNavigate: (screen: string) => void;
}

export function AddToCircleScreen({
  onNavigate,
}: AddToCircleScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const [suggestedPeople, setSuggestedPeople] = useState([
    {
      id: 11,
      name: "Chris Anderson",
      mutualFriends: 7,
      interests: ["Running", "Books"],
      avatar: "/avatars/chris.jpg",
      fallback: "CA",
    },
    {
      id: 12,
      name: "Diana Williams",
      mutualFriends: 4,
      interests: ["Yoga", "Design"],
      avatar: "/avatars/diana.jpg",
      fallback: "DW",
    },
    {
      id: 13,
      name: "Ryan Thompson",
      mutualFriends: 9,
      interests: ["Gaming", "Coding"],
      avatar: "/avatars/ryan.jpg",
      fallback: "RT",
    },
    {
      id: 14,
      name: "Olivia Parker",
      mutualFriends: 2,
      interests: ["Fashion", "Travel"],
      avatar: "/avatars/olivia.jpg",
      fallback: "OP",
    },
    {
      id: 15,
      name: "Marcus Johnson",
      mutualFriends: 5,
      interests: ["Basketball", "Movies"],
      avatar: "/avatars/marcus.jpg",
      fallback: "MJ",
    },
  ]);

  const handleAddToCircle = (id: number, name: string) => {
    setSuggestedPeople(suggestedPeople.filter((p) => p.id !== id));
    toast.success(`Request sent to ${name}!`, {
      description: "Once they accept, they'll be added to your circle.",
    });
  };

  const handleSendEmailInvite = () => {
    if (!emailInput.trim() || !nameInput.trim()) {
      toast.error("Please enter both name and email");
      return;
    }

    toast.success(`Invitation sent to ${nameInput}!`, {
      description: "They'll be added to your circle when they join Wingd.",
    });
    setEmailInput("");
    setNameInput("");
  };

  const filteredPeople = suggestedPeople.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#77d75b] to-[#5cb844] px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate("circle")}
            className="mb-4 text-white flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft size={20} />
            <span>Back to Circle</span>
          </button>
          <h2 className="text-white mb-2">Add to Circle</h2>
          <p className="text-white/90 text-sm">
            Browse people you may know or invite via email
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white rounded-2xl p-1 shadow-sm">
              <TabsTrigger
                value="browse"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#77d75b] data-[state=active]:to-[#5cb844] data-[state=active]:text-white"
              >
                <Users size={16} className="mr-2" />
                Browse
              </TabsTrigger>
              <TabsTrigger
                value="invite"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#77d75b] data-[state=active]:to-[#5cb844] data-[state=active]:text-white"
              >
                <Mail size={16} className="mr-2" />
                Invite via Email
              </TabsTrigger>
            </TabsList>

            {/* Browse Tab */}
            <TabsContent value="browse" className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Search people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white border-[#77d75b]/20 rounded-2xl py-6 shadow-sm"
                />
              </div>

              {/* People List */}
              <div className="space-y-3">
                <h3 className="mb-3">
                  People You May Know ({filteredPeople.length})
                </h3>
                {filteredPeople.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#77d75b] to-[#a0e88b] rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
                      <Users size={32} className="text-white" />
                    </div>
                    <p className="text-gray-500">No people found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try a different search or invite someone by email
                    </p>
                  </div>
                ) : (
                  filteredPeople.map((person, index) => (
                    <motion.div
                      key={person.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-14 h-14 border-2 border-[#77d75b]/20">
                          {person.avatar && (
                            <AvatarImage
                              src={person.avatar}
                              alt={person.name}
                            />
                          )}
                          <AvatarFallback className="bg-gradient-to-br from-[#E3F5FF] to-[#F0F9FF] text-gray-600">
                            {person.fallback}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="mb-1">{person.name}</div>
                          <p className="text-sm text-gray-500">
                            {person.mutualFriends > 0
                              ? `${person.mutualFriends} mutual connections`
                              : "Recommended for you"}
                          </p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {person.interests.map((interest) => (
                              <span
                                key={interest}
                                className="px-3 py-1 bg-[#F0F9ED] text-[#77d75b] rounded-full text-xs"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            handleAddToCircle(person.id, person.name)
                          }
                          className="bg-[#F0F9ED] text-[#77d75b] hover:bg-[#77d75b] hover:text-white rounded-full px-6 border-0 shadow-sm"
                        >
                          <UserPlus size={16} className="mr-2" />
                          Add to Circle
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Invite Tab */}
            <TabsContent value="invite" className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#77d75b] to-[#5cb844] rounded-full flex items-center justify-center">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1">Invite by Email</h3>
                    <p className="text-sm text-gray-500">
                      Send an invitation to join your circle
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#77d75b]/10">
                    <Input
                      type="text"
                      placeholder="Friend's Name"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="bg-transparent border-0 text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0"
                    />
                  </div>

                  <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#77d75b]/10">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="bg-transparent border-0 text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0"
                    />
                  </div>

                  <Button
                    onClick={handleSendEmailInvite}
                    className="w-full bg-gradient-to-r from-[#77d75b] to-[#5cb844] hover:from-[#5cb844] hover:to-[#77d75b] text-white rounded-2xl py-6 shadow-md border-0"
                  >
                    <Mail size={18} className="mr-2" />
                    Send Invitation
                  </Button>
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-[#F0F9ED] rounded-2xl p-5 border border-[#77d75b]/20">
                <h4 className="text-[#77d75b] mb-2">How it works</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-[#77d75b]">•</span>
                    <span>
                      Your friend will receive an email invitation to join
                      Wingd
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#77d75b]">•</span>
                    <span>
                      Once they join, they'll automatically be added to your
                      circle
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#77d75b]">•</span>
                    <span>
                      You can then introduce them to others in your circle
                    </span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
