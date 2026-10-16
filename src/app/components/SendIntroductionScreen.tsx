import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Send,
  Check,
  Mail,
  User,
  Search,
  X,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Person } from "../App";
import { useAppStore } from "../context/AppContext";

interface SendIntroductionScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  preSelectedPerson?: Person | null;
}

type SelectedPerson = {
  type: "circle" | "email";
  id?: string;
  email?: string;
  name?: string;
  avatar?: string;
  fallback?: string;
  interests?: string[];
};

export function SendIntroductionScreen({
  onNavigate,
  preSelectedPerson,
}: SendIntroductionScreenProps) {
  const { addIntroGiven } = useAppStore();
  const [selectedPerson1, setSelectedPerson1] =
    useState<SelectedPerson | null>(null);
  const [selectedPerson2, setSelectedPerson2] =
    useState<SelectedPerson | null>(null);
  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [emailInput1, setEmailInput1] = useState("");
  const [emailInput2, setEmailInput2] = useState("");
  const [nameInput1, setNameInput1] = useState("");
  const [nameInput2, setNameInput2] = useState("");
  const [showEmailInput1, setShowEmailInput1] = useState(false);
  const [showEmailInput2, setShowEmailInput2] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Set the first person if preSelectedPerson is provided
  useEffect(() => {
    if (preSelectedPerson) {
      setSelectedPerson1({
        type: "circle",
        id: preSelectedPerson.id.toString(),
        name: preSelectedPerson.name,
        avatar: preSelectedPerson.avatar,
        fallback: preSelectedPerson.fallback,
        interests: preSelectedPerson.interests,
      });
    }
  }, [preSelectedPerson]);

  const people = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      fallback: "SJ",
      interests: ["Hiking", "Photography"],
      type: "circle",
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      fallback: "MC",
      interests: ["Coffee", "Tech"],
      type: "circle",
    },
    {
      id: "3",
      name: "Emily Roberts",
      avatar: "/avatars/emily.jpg",
      fallback: "ER",
      interests: ["Art", "Music"],
      type: "circle",
    },
    {
      id: "4",
      name: "Alex Martinez",
      avatar: "/avatars/alex.jpg",
      fallback: "AM",
      interests: ["Fitness", "Travel"],
      type: "circle",
    },
    {
      id: "5",
      name: "Kaden Dyer",
      avatar: "",
      fallback: "KD",
      interests: ["Chess", "Gymnastics"],
      type: "circle",
    },
    {
      id: "6",
      name: "Gael Clay",
      avatar: "",
      fallback: "GC",
      interests: ["Wizardry", "Dance"],
      type: "circle",
    },
    {
      id: "7",
      name: "Augustine Munoz",
      avatar: "",
      fallback: "AM",
      interests: ["Film", "Cooking"],
      type: "circle",
    },
    {
      id: "8",
      name: "Gracelyn Daniel",
      avatar: "",
      fallback: "GD",
      interests: ["Sports", "Trivia"],
      type: "circle",
    },
    {
      id: "9",
      name: "Olivia Anderson",
      avatar: "",
      fallback: "OA",
      interests: ["Reading", "Yoga"],
      type: "circle",
    },
    {
      id: "10",
      name: "James Wilson",
      avatar: "",
      fallback: "JW",
      interests: ["Gaming", "Music"],
      type: "circle",
    },
    {
      id: "11",
      name: "Sophia Lee",
      avatar: "",
      fallback: "SL",
      interests: ["Fashion", "Art"],
      type: "circle",
    },
    {
      id: "12",
      name: "Daniel Brown",
      avatar: "",
      fallback: "DB",
      interests: ["Running", "Podcasts"],
      type: "circle",
    },
  ];

  const handleAddEmailPerson1 = () => {
    if (emailInput1 && nameInput1) {
      setSelectedPerson1({
        type: "email",
        email: emailInput1,
        name: nameInput1,
        fallback: nameInput1
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      });
      setShowEmailInput1(false);
      setShowPicker1(false);
      setEmailInput1("");
      setNameInput1("");
    }
  };

  const handleAddEmailPerson2 = () => {
    if (emailInput2 && nameInput2) {
      setSelectedPerson2({
        type: "email",
        email: emailInput2,
        name: nameInput2,
        fallback: nameInput2
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      });
      setShowEmailInput2(false);
      setShowPicker2(false);
      setEmailInput2("");
      setNameInput2("");
    }
  };

  const canSend =
    selectedPerson1 &&
    selectedPerson2 &&
    selectedPerson1 !== selectedPerson2;

  const handleSend = async () => {
    if (canSend) {
      setIsSending(true);

      // Simulate sending
      await new Promise((resolve) => setTimeout(resolve, 800));

      const hasEmailInvite =
        selectedPerson1.type === "email" ||
        selectedPerson2.type === "email";

      const p1Name = selectedPerson1.name || "Unknown";
      const p2Name = selectedPerson2.name || "Unknown";

      addIntroGiven({
        person1: {
          name: p1Name,
          email: selectedPerson1.type === "email" ? (selectedPerson1.email || null) : null,
          isUser: selectedPerson1.type === "circle",
          avatar: selectedPerson1.avatar || "",
          fallback: selectedPerson1.fallback || p1Name.slice(0, 2).toUpperCase(),
        },
        person2: {
          name: p2Name,
          email: selectedPerson2.type === "email" ? (selectedPerson2.email || null) : null,
          isUser: selectedPerson2.type === "circle",
          avatar: selectedPerson2.avatar || "",
          fallback: selectedPerson2.fallback || p2Name.slice(0, 2).toUpperCase(),
        },
        message: message.trim(),
        createdAt: "Just now",
        waitingFor: [
          ...(selectedPerson1.type === "email" && selectedPerson1.name ? [selectedPerson1.name] : []),
          ...(selectedPerson2.type === "email" && selectedPerson2.name ? [selectedPerson2.name] : []),
        ],
      });

      if (hasEmailInvite) {
        const emailRecipients = [];
        if (selectedPerson1.type === "email")
          emailRecipients.push(selectedPerson1.name);
        if (selectedPerson2.type === "email")
          emailRecipients.push(selectedPerson2.name);

        toast.success("Introduction created!", {
          description: `Email invitation${emailRecipients.length > 1 ? "s" : ""} sent to ${emailRecipients.join(" and ")}. Added to your Intros Given list!`,
          icon: <Mail className="text-[#1da6e0]" />,
        });
      } else {
        toast.success("Introduction sent successfully!", {
          description: `${p1Name} and ${p2Name} will be notified. Added to your Intros Given list!`,
          icon: <Check className="text-green-500" />,
        });
      }

      setIsSending(false);
      onNavigate("circle", { tab: "invites" });
    }
  };

  const renderPersonPicker = (
    selectedPerson: SelectedPerson | null,
    setSelectedPerson: (person: SelectedPerson | null) => void,
    showPicker: boolean,
    setShowPicker: (show: boolean) => void,
    searchQuery: string,
    setSearchQuery: (query: string) => void,
    showEmailInput: boolean,
    setShowEmailInput: (show: boolean) => void,
    emailInput: string,
    setEmailInput: (email: string) => void,
    nameInput: string,
    setNameInput: (name: string) => void,
    handleAddEmail: () => void,
    label: string,
    color: string,
    excludePersonId?: string,
  ) => {
    const filteredPeople = people
      .filter((p) => p.id !== excludePersonId)
      .filter(
        (p) =>
          p.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          p.interests.some((i) =>
            i.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );

    return (
      <div className="mb-6">
        <Label className="text-sm text-gray-600 mb-2 block">
          {label}
        </Label>

        {/* Selected Person Display or Trigger */}
        {selectedPerson ? (
          <div
            className={`bg-white rounded-2xl p-4 shadow-sm border-2 border-[${color}]/20`}
          >
            <div className="flex items-center gap-3">
              {selectedPerson.type === "email" ? (
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-[${color}] to-[${color}]/70 rounded-full flex items-center justify-center`}
                >
                  <Mail className="text-white" size={20} />
                </div>
              ) : (
                <Avatar
                  className={`w-12 h-12 border-2 border-[${color}]/30`}
                >
                  {selectedPerson.avatar && (
                    <AvatarImage
                      src={selectedPerson.avatar}
                      alt={selectedPerson.name}
                    />
                  )}
                  <AvatarFallback
                    className={`bg-gradient-to-br from-[${color}] to-[${color}]/70 text-white`}
                  >
                    {selectedPerson.fallback}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                <div>{selectedPerson.name}</div>
                {selectedPerson.type === "email" && (
                  <p className="text-xs text-gray-500">
                    {selectedPerson.email}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedPerson(null);
                  setShowPicker(false);
                  setSearchQuery("");
                }}
                className="text-gray-400 hover:text-gray-600 rounded-full"
              >
                Change
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowPicker(!showPicker)}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-dashed border-gray-300 rounded-2xl py-6 justify-start"
          >
            <User size={18} className="mr-2" />
            Select from Circle or invite by email
          </Button>
        )}

        {/* Picker Dropdown */}
        <AnimatePresence>
          {showPicker && !selectedPerson && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden"
            >
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Search by name or interest..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    className="pl-10 pr-10 bg-[#FAFAFA] border-0 rounded-xl"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Invite by Email Option */}
              {!showEmailInput && (
                <button
                  onClick={() => setShowEmailInput(true)}
                  className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-200 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1da6e0] to-[#05638f] rounded-full flex items-center justify-center">
                    <Mail className="text-white" size={16} />
                  </div>
                  <div>
                    <div className="text-sm">
                      Invite by Email
                    </div>
                    <p className="text-xs text-gray-500">
                      Send invitation to join Wingd
                    </p>
                  </div>
                </button>
              )}

              {/* Email Input Form */}
              {showEmailInput && (
                <div className="p-4 border-b border-gray-200 bg-[#F0F9FF]">
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-3 border border-[#1da6e0]/10">
                      <Input
                        type="text"
                        placeholder="Name"
                        value={nameInput}
                        onChange={(e) =>
                          setNameInput(e.target.value)
                        }
                        className="bg-transparent border-0 text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0 p-0"
                      />
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-[#1da6e0]/10">
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={emailInput}
                        onChange={(e) =>
                          setEmailInput(e.target.value)
                        }
                        className="bg-transparent border-0 text-[#3A3A45] placeholder:text-[#71717A] focus-visible:ring-0 p-0"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setShowEmailInput(false);
                          setEmailInput("");
                          setNameInput("");
                        }}
                        variant="outline"
                        className="flex-1 rounded-xl"
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddEmail}
                        disabled={!emailInput || !nameInput}
                        className="flex-1 bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white rounded-xl border-0"
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Scrollable People List */}
              <div className="max-h-[320px] overflow-y-auto">
                {filteredPeople.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <p className="text-sm">No matches found</p>
                    <p className="text-xs mt-1">
                      Try a different search term
                    </p>
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <button
                      key={person.id}
                      onClick={() => {
                        setSelectedPerson({
                          type: "circle",
                          id: person.id,
                          name: person.name,
                          avatar: person.avatar,
                          fallback: person.fallback,
                          interests: person.interests,
                        });
                        setShowPicker(false);
                        setSearchQuery("");
                      }}
                      className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-0 flex items-center gap-3"
                    >
                      <Avatar
                        className={`w-10 h-10 border-2 border-[${color}]/20`}
                      >
                        {person.avatar && (
                          <AvatarImage
                            src={person.avatar}
                            alt={person.name}
                          />
                        )}
                        <AvatarFallback
                          className={`bg-gradient-to-br from-[${color}] to-[${color}]/70 text-white text-xs`}
                        >
                          {person.fallback}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm mb-0.5">
                          {person.name}
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          {person.interests
                            .slice(0, 2)
                            .map((interest) => (
                              <span
                                key={interest}
                                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                              >
                                {interest}
                              </span>
                            ))}
                          {person.interests.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{person.interests.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1da6e0] to-[#05638f] px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onNavigate("back")}
              className="text-white hover:scale-110 transition-transform cursor-pointer"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-white flex-1">
              Make Introduction
            </h1>
          </div>
          <p className="text-white/90 text-sm">
            Connect two people who might hit it off - from your
            circle or invite them to join
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
        {preSelectedPerson ? (
          <>
            <h3 className="mb-3">
              Select Someone to Introduce to{" "}
              {preSelectedPerson.name}
            </h3>

            {/* Pre-selected Person Display */}
            <div className="mb-6">
              <Label className="text-sm text-gray-600 mb-2 block">
                Introducing
              </Label>
              <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-[#77d75b]/20">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-[#77d75b]/30">
                    {preSelectedPerson.avatar && (
                      <AvatarImage
                        src={preSelectedPerson.avatar}
                        alt={preSelectedPerson.name}
                      />
                    )}
                    <AvatarFallback className="bg-gradient-to-br from-[#77d75b] to-[#a0e88b] text-white">
                      {preSelectedPerson.fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div>{preSelectedPerson.name}</div>
                    <div className="flex gap-2 mt-1">
                      {preSelectedPerson.interests.map(
                        (interest) => (
                          <span
                            key={interest}
                            className="px-2 py-1 bg-[#F0F9ED] text-[#77d75b] rounded-full text-xs"
                          >
                            {interest}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Select Second Person */}
            {renderPersonPicker(
              selectedPerson2,
              setSelectedPerson2,
              showPicker2,
              setShowPicker2,
              searchQuery2,
              setSearchQuery2,
              showEmailInput2,
              setShowEmailInput2,
              emailInput2,
              setEmailInput2,
              nameInput2,
              setNameInput2,
              handleAddEmailPerson2,
              "Introduce To",
              "#ff9883",
              selectedPerson1?.id,
            )}
          </>
        ) : (
          <>
            <h3 className="mb-3">Select Two People</h3>

            {/* Person 1 Selection */}
            {renderPersonPicker(
              selectedPerson1,
              setSelectedPerson1,
              showPicker1,
              setShowPicker1,
              searchQuery1,
              setSearchQuery1,
              showEmailInput1,
              setShowEmailInput1,
              emailInput1,
              setEmailInput1,
              nameInput1,
              setNameInput1,
              handleAddEmailPerson1,
              "First Person",
              "#A78BFA",
              selectedPerson2?.id,
            )}

            {/* Person 2 Selection */}
            {renderPersonPicker(
              selectedPerson2,
              setSelectedPerson2,
              showPicker2,
              setShowPicker2,
              searchQuery2,
              setSearchQuery2,
              showEmailInput2,
              setShowEmailInput2,
              emailInput2,
              setEmailInput2,
              nameInput2,
              setNameInput2,
              handleAddEmailPerson2,
              "Second Person",
              "#F0ABFC",
              selectedPerson1?.id,
            )}
          </>
        )}

        {/* Message Section */}
        {canSend && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Label className="text-sm text-gray-600 mb-2 block">
              Add a Message (Optional)
            </Label>
            <Textarea
              placeholder="Tell them why you think they'd be a great match... (e.g., 'You both love hiking and have similar senses of humor!')"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none rounded-2xl border-2 border-gray-200 focus:border-[#1da6e0] transition-colors"
            />
            <p className="text-xs text-gray-500 mt-2">
              Your message will help them break the ice!
            </p>
          </motion.div>
        )}

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!canSend || isSending}
          className="w-full bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white rounded-2xl py-6 shadow-md border-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Send size={18} />
              </motion.div>
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send size={18} />
              {selectedPerson1?.type === "email" ||
              selectedPerson2?.type === "email"
                ? "Send Invitation & Create Introduction"
                : "Send Introduction"}
            </span>
          )}
        </Button>
        </div>
      </div>
    </div>
  );
}