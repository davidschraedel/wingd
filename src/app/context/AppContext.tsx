import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  interests: string[];
}

export interface IntroPerson {
  id: number;
  name: string;
  age: number;
  introducedBy: string;
  interests: string[];
  avatar?: string;
  fallback: string;
  bio?: string;
  message?: string;
  date?: string;
}

export interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar?: string;
  fallback: string;
  online: boolean;
  type: string;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface IntroGivenItem {
  id: number;
  person1: {
    name: string;
    email?: string | null;
    isUser: boolean;
    avatar?: string;
    fallback: string;
  };
  person2: {
    name: string;
    email?: string | null;
    isUser: boolean;
    avatar?: string;
    fallback: string;
  };
  message?: string;
  createdAt: string;
  waitingFor: string[];
}

export interface CircleConnection {
  id: number;
  name: string;
  mutualFriends: number;
  interests: string[];
  avatar?: string;
  fallback: string;
  status: 'connected' | 'suggested' | 'pending';
  bio: string;
}

export interface MatchedInvitation {
  id: number;
  person1: {
    id: number;
    name: string;
    avatar?: string;
    fallback: string;
  };
  person2: {
    id: number;
    name: string;
    avatar?: string;
    fallback: string;
  };
  createdAt: string;
}

interface AppContextType {
  // User Profile
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;

  // Introductions (Received & Matches)
  pendingIntros: IntroPerson[];
  acceptedIntros: IntroPerson[];
  acceptIntro: (id: number) => void;
  rejectIntro: (id: number) => void;
  removeAcceptedIntro: (id: number) => void;

  // Chats
  chats: ChatItem[];
  activeChat: ChatItem | null;
  messagesByChatId: Record<string, ChatMessage[]>;
  openChatWithPerson: (person: {
    id?: string | number;
    name: string;
    avatar?: string;
    fallback?: string;
    online?: boolean;
    type?: string;
  }) => void;
  sendMessage: (chatId: string, text: string) => void;

  // Intros Given
  introsGiven: IntroGivenItem[];
  matchedInvitations: MatchedInvitation[];
  addIntroGiven: (intro: Omit<IntroGivenItem, 'id'>) => void;
  cancelIntroGiven: (id: number) => void;

  // Circle Connections
  circleConnections: CircleConnection[];
  setCircleConnections: React.Dispatch<
    React.SetStateAction<CircleConnection[]>
  >;

  // Calculated stats helpers
  circleCount: number;
  totalIntrosGiven: number;
  matchesCount: number;

  // Global Reset
  resetAllData: () => void;
}

const STORAGE_KEY = 'wingd_demo_state_v1';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Sam Doe',
  email: 'sam.doe@email.com',
  bio: 'Outdoor adventurer and pastry chef. Always open to new friends!',
  interests: ['Hiking', 'Photography', 'Travel'],
};

const DEFAULT_PENDING_INTROS: IntroPerson[] = [
  {
    id: 1,
    name: 'Alex Martinez',
    age: 26,
    introducedBy: 'Sarah',
    interests: ['Hiking', 'Photography'],
    avatar: '/avatars/alex.jpg',
    fallback: 'AM',
    bio: 'Loves outdoor adventures and capturing moments through the lens.',
    message:
      "You both love hiking and photography! I think you'd have great conversations about travel.",
  },
  {
    id: 2,
    name: 'Brady Doyle',
    age: 28,
    introducedBy: 'Mike',
    interests: ['Coffee', 'Tech'],
    avatar: '/avatars/chris.jpg',
    fallback: 'BD',
    bio: 'Coffee enthusiast and tech startup founder.',
    message:
      'Both passionate about startups and tech. You might want to grab coffee together!',
  },
  {
    id: 3,
    name: 'Lena Bennett',
    age: 25,
    introducedBy: 'Emily',
    interests: ['Art', 'Music'],
    avatar: '/avatars/diana.jpg',
    fallback: 'LB',
    bio: 'Artist and musician with a passion for creative expression.',
    message:
      'Lena has an amazing art studio and loves live music, just like you!',
  },
];

const DEFAULT_ACCEPTED_INTROS: IntroPerson[] = [
  {
    id: 4,
    name: 'Jordan Smith',
    age: 27,
    introducedBy: 'Alex',
    interests: ['Fitness', 'Travel'],
    avatar: '/avatars/jordan.jpg',
    fallback: 'JS',
    date: 'Accepted 3 days ago',
  },
  {
    id: 5,
    name: 'Taylor Brown',
    age: 29,
    introducedBy: 'Jordan',
    interests: ['Music', 'Food'],
    avatar: '/avatars/olivia.jpg',
    fallback: 'TB',
    date: 'Accepted 1 week ago',
  },
];

const DEFAULT_CHATS: ChatItem[] = [
  {
    id: 'chat-jessica',
    name: 'Jessica Barnes',
    lastMessage: "That's great!",
    time: 'New',
    unread: true,
    avatar: '/avatars/sarah.jpg',
    fallback: 'JB',
    online: true,
    type: 'dating',
  },
  {
    id: 'chat-jordan',
    name: 'Jordan Smith',
    lastMessage: 'Hey! Nice to connect with you 😊',
    time: '3d',
    unread: false,
    avatar: '/avatars/jordan.jpg',
    fallback: 'JS',
    online: true,
    type: 'dating',
  },
  {
    id: 'chat-taylor',
    name: 'Taylor Brown',
    lastMessage: "Sounds like a plan! Let me know when you're free.",
    time: '1w',
    unread: false,
    avatar: '/avatars/olivia.jpg',
    fallback: 'TB',
    online: false,
    type: 'dating',
  },
  {
    id: 'chat-harry',
    name: 'Harry Owens',
    lastMessage: "Next week I have a trip planned. I'm so excited 🥲",
    time: '2h',
    unread: false,
    avatar: '/avatars/mike.jpg',
    fallback: 'HO',
    online: false,
    type: 'dating',
  },
  {
    id: 'chat-blake',
    name: 'Blake Owens',
    lastMessage: 'Well, that would be optimal ;)',
    time: '1d',
    unread: false,
    avatar: '/avatars/alex.jpg',
    fallback: 'BO',
    online: false,
    type: 'dating',
  },
  {
    id: 'chat-mina',
    name: 'Mina Patel',
    lastMessage:
      "They decided on a spontaneous adventure and now I can't find them anywhere, hahaha",
    time: '3d',
    unread: false,
    avatar: '/avatars/emily.jpg',
    fallback: 'MP',
    online: false,
    type: 'dating',
  },
  {
    id: 'chat-vanessa',
    name: 'Vanessa Boyd',
    lastMessage: '🙃',
    time: '1w',
    unread: false,
    avatar: '/avatars/jordan.jpg',
    fallback: 'VB',
    online: true,
    type: 'dating',
  },
];

const DEFAULT_SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'them',
    text: 'Hey! Thanks for accepting the intro 😊',
    time: '10:30 AM',
  },
  {
    id: 'm2',
    sender: 'me',
    text: 'Of course! Sarah said great things about you',
    time: '10:32 AM',
  },
  {
    id: 'm3',
    sender: 'them',
    text: "That's so nice! I love hiking too. Have you been to Rocky Mountain?",
    time: '10:35 AM',
  },
  {
    id: 'm4',
    sender: 'me',
    text: 'Yes! Last summer. The trails were amazing',
    time: '10:36 AM',
  },
  {
    id: 'm5',
    sender: 'them',
    text: 'We should plan a hike sometime!',
    time: '10:38 AM',
  },
];

const DEFAULT_MESSAGES_MAP: Record<string, ChatMessage[]> = {
  'chat-jessica': DEFAULT_SAMPLE_MESSAGES,
  'chat-jordan': [
    {
      id: 'jm1',
      sender: 'them',
      text: 'Hey! Nice to connect with you 😊 Alex told me we both love fitness and travel.',
      time: '2:15 PM',
    },
    {
      id: 'jm2',
      sender: 'me',
      text: 'Hey Jordan! Yes, big into hiking and exploring new cities.',
      time: '2:20 PM',
    },
    {
      id: 'jm3',
      sender: 'them',
      text: 'Awesome! Any bucket list trips coming up?',
      time: '2:24 PM',
    },
  ],
  'chat-taylor': [
    {
      id: 'tm1',
      sender: 'them',
      text: 'Hey there! Jordan said you love live music!',
      time: '11:00 AM',
    },
    {
      id: 'tm2',
      sender: 'me',
      text: 'Hey Taylor! Definitely, concerts are the best.',
      time: '11:05 AM',
    },
    {
      id: 'tm3',
      sender: 'them',
      text: "Sounds like a plan! Let me know when you're free.",
      time: '11:12 AM',
    },
  ],
};

const DEFAULT_INTROS_GIVEN: IntroGivenItem[] = [
  {
    id: 101,
    person1: {
      name: 'Sarah Johnson',
      email: null,
      isUser: true,
      avatar: '/avatars/sarah.jpg',
      fallback: 'SJ',
    },
    person2: {
      name: 'David Chen',
      email: 'david.chen@email.com',
      isUser: false,
      fallback: 'DC',
    },
    message: 'You both love startups and tech! Would be great to connect.',
    createdAt: '2 days ago',
    waitingFor: ['David Chen'],
  },
  {
    id: 102,
    person1: {
      name: 'Lisa Park',
      email: 'lisa.park@email.com',
      isUser: false,
      fallback: 'LP',
    },
    person2: {
      name: 'James Wilson',
      email: 'james.w@email.com',
      isUser: false,
      fallback: 'JW',
    },
    message: 'Both amazing photographers who I think would hit it off!',
    createdAt: '5 days ago',
    waitingFor: ['Lisa Park', 'James Wilson'],
  },
  {
    id: 103,
    person1: {
      name: 'Mike Chen',
      email: null,
      isUser: true,
      avatar: '/avatars/mike.jpg',
      fallback: 'MC',
    },
    person2: {
      name: 'Emily Roberts',
      email: null,
      isUser: true,
      avatar: '/avatars/emily.jpg',
      fallback: 'ER',
    },
    message:
      "You both share a passion for art and coffee. I think you'd really enjoy each other's company!",
    createdAt: '1 week ago',
    waitingFor: [],
  },
];

const DEFAULT_MATCHED_INVITATIONS: MatchedInvitation[] = [
  {
    id: 201,
    person1: {
      id: 4,
      name: 'Alex Martinez',
      avatar: '/avatars/alex.jpg',
      fallback: 'AM',
    },
    person2: {
      id: 9,
      name: 'Jordan Lee',
      avatar: '/avatars/jordan.jpg',
      fallback: 'JL',
    },
    createdAt: '3 days ago',
  },
];

const DEFAULT_CONNECTIONS: CircleConnection[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    mutualFriends: 12,
    interests: ['Hiking', 'Photography'],
    avatar: '/avatars/sarah.jpg',
    fallback: 'SJ',
    status: 'connected',
    bio: 'Landscape photographer and trail runner. Always happy to meet fellow creators and hikers!',
  },
  {
    id: 2,
    name: 'Mike Chen',
    mutualFriends: 8,
    interests: ['Coffee', 'Tech'],
    avatar: '/avatars/mike.jpg',
    fallback: 'MC',
    status: 'connected',
    bio: 'Software engineer & specialty coffee enthusiast. Exploring new tech and roasters in the city.',
  },
  {
    id: 3,
    name: 'Emily Roberts',
    mutualFriends: 15,
    interests: ['Art', 'Music'],
    avatar: '/avatars/emily.jpg',
    fallback: 'ER',
    status: 'connected',
    bio: 'Illustrator and vinyl collector. Passionate about community art projects and live indie music.',
  },
  {
    id: 4,
    name: 'Alex Martinez',
    mutualFriends: 6,
    interests: ['Fitness', 'Travel'],
    avatar: '/avatars/alex.jpg',
    fallback: 'AM',
    status: 'connected',
    bio: 'Personal trainer and travel blogger. Exploring 30 countries and counting!',
  },
  {
    id: 5,
    name: 'Kaden Dyer',
    mutualFriends: 8,
    interests: ['Chess', 'Gymnastics'],
    fallback: 'KD',
    status: 'connected',
    bio: 'Chess strategist and former competitive gymnast. Always down for a match or puzzle.',
  },
  {
    id: 6,
    name: 'Gael Clay',
    mutualFriends: 3,
    interests: ['Wizardry', 'Dance'],
    fallback: 'GC',
    status: 'connected',
    bio: 'Contemporary dancer and theatre fan. Exploring movement, performance art, and storytelling.',
  },
  {
    id: 7,
    name: 'Augustine Munoz',
    mutualFriends: 3,
    interests: ['Film', 'Cooking'],
    fallback: 'AM',
    status: 'connected',
    bio: 'Indie filmmaker and home chef. Exploring culinary traditions and short-form documentaries.',
  },
  {
    id: 8,
    name: 'Gracelyn Daniel',
    mutualFriends: 5,
    interests: ['Sports', 'Trivia'],
    fallback: 'GD',
    status: 'connected',
    bio: 'Sports fanatic and pub trivia host. Love organizing team game nights and casual hangouts.',
  },
  {
    id: 9,
    name: 'Jordan Lee',
    mutualFriends: 4,
    interests: ['Reading', 'Cooking'],
    avatar: '/avatars/jordan.jpg',
    fallback: 'JL',
    status: 'connected',
    bio: 'Book lover and amateur baker. Looking to exchange book recommendations and sourdough recipes.',
  },
  {
    id: 10,
    name: 'Taylor Swift',
    mutualFriends: 3,
    interests: ['Music', 'Fashion'],
    fallback: 'TS',
    status: 'suggested',
    bio: 'Songwriter, musician, and storyteller. Believer in warm connections and creative sparks.',
  },
  {
    id: 11,
    name: 'Chris Anderson',
    mutualFriends: 2,
    interests: ['Running', 'Books'],
    avatar: '/avatars/chris.jpg',
    fallback: 'CA',
    status: 'suggested',
    bio: 'Marathon runner and bookstore browser. Always looking for new routes and great reads.',
  },
];

function getStoredState() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore parsing errors
  }
  return null;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const stored = getStoredState();

  const [userProfile, setUserProfile] = useState<UserProfile>(
    stored?.userProfile || DEFAULT_PROFILE
  );
  const [pendingIntros, setPendingIntros] = useState<IntroPerson[]>(
    stored?.pendingIntros || DEFAULT_PENDING_INTROS
  );
  const [acceptedIntros, setAcceptedIntros] = useState<IntroPerson[]>(
    stored?.acceptedIntros || DEFAULT_ACCEPTED_INTROS
  );
  const [chats, setChats] = useState<ChatItem[]>(
    stored?.chats || DEFAULT_CHATS
  );
  const [activeChat, setActiveChat] = useState<ChatItem | null>(
    stored?.activeChat || DEFAULT_CHATS[0]
  );
  const [messagesByChatId, setMessagesByChatId] = useState<
    Record<string, ChatMessage[]>
  >(stored?.messagesByChatId || DEFAULT_MESSAGES_MAP);
  const [introsGiven, setIntrosGiven] = useState<IntroGivenItem[]>(
    stored?.introsGiven || DEFAULT_INTROS_GIVEN
  );
  const [matchedInvitations, setMatchedInvitations] = useState<
    MatchedInvitation[]
  >(stored?.matchedInvitations || DEFAULT_MATCHED_INVITATIONS);
  const [circleConnections, setCircleConnections] = useState<
    CircleConnection[]
  >(stored?.circleConnections || DEFAULT_CONNECTIONS);

  // Sync to sessionStorage on every change
  useEffect(() => {
    try {
      const payload = {
        userProfile,
        pendingIntros,
        acceptedIntros,
        chats,
        activeChat,
        messagesByChatId,
        introsGiven,
        matchedInvitations,
        circleConnections,
      };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // storage unavailable or quota exceeded
    }
  }, [
    userProfile,
    pendingIntros,
    acceptedIntros,
    chats,
    activeChat,
    messagesByChatId,
    introsGiven,
    matchedInvitations,
    circleConnections,
  ]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const createChatIdForPerson = (name: string) => {
    return `chat-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  };

  const acceptIntro = (id: number) => {
    const intro = pendingIntros.find((i) => i.id === id);
    if (!intro) return;

    // Remove from pending
    setPendingIntros((prev) => prev.filter((i) => i.id !== id));

    // Add to accepted (Matches)
    const acceptedItem: IntroPerson = {
      ...intro,
      date: 'Just accepted',
    };
    setAcceptedIntros((prev) => [acceptedItem, ...prev]);

    // Add or activate in chats
    const chatId = createChatIdForPerson(intro.name);
    setChats((prev) => {
      const existing = prev.find(
        (c) => c.name.toLowerCase() === intro.name.toLowerCase()
      );
      if (existing) {
        return prev;
      }
      const newChat: ChatItem = {
        id: chatId,
        name: intro.name,
        lastMessage: 'You matched! Say hello to each other 👋',
        time: 'New',
        unread: true,
        avatar: intro.avatar,
        fallback: intro.fallback,
        online: true,
        type: 'dating',
      };
      return [newChat, ...prev];
    });

    // Provide default initial messages for this newly matched chat if none exist
    setMessagesByChatId((prev) => {
      if (prev[chatId]) return prev;
      return {
        ...prev,
        [chatId]: [
          {
            id: 'm1',
            sender: 'them',
            text: `Hey! Thanks for accepting the intro 😊`,
            time: '10:30 AM',
          },
          {
            id: 'm2',
            sender: 'me',
            text: `Of course! ${intro.introducedBy} said great things about you`,
            time: '10:32 AM',
          },
          {
            id: 'm3',
            sender: 'them',
            text: `That's so nice! I love ${intro.interests[0] || 'exploring'} too. Have you been around lately?`,
            time: '10:35 AM',
          },
          {
            id: 'm4',
            sender: 'me',
            text: 'Yes! Been having a great week.',
            time: '10:36 AM',
          },
          {
            id: 'm5',
            sender: 'them',
            text: 'We should grab coffee or hang out sometime!',
            time: '10:38 AM',
          },
        ],
      };
    });
  };

  const rejectIntro = (id: number) => {
    setPendingIntros((prev) => prev.filter((i) => i.id !== id));
  };

  const removeAcceptedIntro = (id: number) => {
    setAcceptedIntros((prev) => prev.filter((i) => i.id !== id));
  };

  const openChatWithPerson = (person: {
    id?: string | number;
    name: string;
    avatar?: string;
    fallback?: string;
    online?: boolean;
    type?: string;
  }) => {
    const chatId =
      typeof person.id === 'string' && person.id.startsWith('chat-')
        ? person.id
        : createChatIdForPerson(person.name);

    let chat = chats.find(
      (c) =>
        c.id === chatId || c.name.toLowerCase() === person.name.toLowerCase()
    );

    if (!chat) {
      chat = {
        id: chatId,
        name: person.name,
        lastMessage: 'You matched! Say hello to each other 👋',
        time: 'Just now',
        unread: false,
        avatar: person.avatar,
        fallback:
          person.fallback || person.name.slice(0, 2).toUpperCase(),
        online: person.online ?? true,
        type: person.type || 'dating',
      };
      setChats((prev) => [chat!, ...prev]);
    } else {
      // Mark as read
      if (chat.unread) {
        setChats((prev) =>
          prev.map((c) => (c.id === chat!.id ? { ...c, unread: false } : c))
        );
      }
    }

    // Ensure sample messages exist for this chat
    setMessagesByChatId((prev) => {
      if (prev[chat.id]) return prev;
      return {
        ...prev,
        [chat.id]: [
          {
            id: 'm1',
            sender: 'them',
            text: 'Hey! Thanks for accepting the intro 😊',
            time: '10:30 AM',
          },
          {
            id: 'm2',
            sender: 'me',
            text: 'Of course! Sarah said great things about you',
            time: '10:32 AM',
          },
          {
            id: 'm3',
            sender: 'them',
            text: "That's so nice! I love hiking too. Have you been to Rocky Mountain?",
            time: '10:35 AM',
          },
          {
            id: 'm4',
            sender: 'me',
            text: 'Yes! Last summer. The trails were amazing',
            time: '10:36 AM',
          },
          {
            id: 'm5',
            sender: 'them',
            text: 'We should plan a hike sometime!',
            time: '10:38 AM',
          },
        ],
      };
    });

    setActiveChat(chat);
  };

  const sendMessage = (chatId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'me',
      text: trimmed,
      time: currentTime,
    };

    setMessagesByChatId((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMsg],
    }));

    // Update lastMessage and time in chats list
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              lastMessage: trimmed,
              time: 'Just now',
            }
          : c
      )
    );
  };

  const addIntroGiven = (intro: Omit<IntroGivenItem, 'id'>) => {
    const newItem: IntroGivenItem = {
      ...intro,
      id: Date.now(),
    };
    setIntrosGiven((prev) => [newItem, ...prev]);
  };

  const cancelIntroGiven = (id: number) => {
    setIntrosGiven((prev) => prev.filter((item) => item.id !== id));
  };

  const circleCount = circleConnections.filter(
    (c) => c.status === 'connected'
  ).length;
  const totalIntrosGiven = introsGiven.length + matchedInvitations.length;
  const matchesCount = acceptedIntros.length;

  const resetAllData = () => {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setUserProfile(DEFAULT_PROFILE);
    setPendingIntros(DEFAULT_PENDING_INTROS);
    setAcceptedIntros(DEFAULT_ACCEPTED_INTROS);
    setChats(DEFAULT_CHATS);
    setActiveChat(DEFAULT_CHATS[0]);
    setMessagesByChatId(DEFAULT_MESSAGES_MAP);
    setIntrosGiven(DEFAULT_INTROS_GIVEN);
    setMatchedInvitations(DEFAULT_MATCHED_INVITATIONS);
    setCircleConnections(DEFAULT_CONNECTIONS);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateProfile,
        pendingIntros,
        acceptedIntros,
        acceptIntro,
        rejectIntro,
        removeAcceptedIntro,
        chats,
        activeChat,
        messagesByChatId,
        openChatWithPerson,
        sendMessage,
        introsGiven,
        matchedInvitations,
        addIntroGiven,
        cancelIntroGiven,
        circleConnections,
        setCircleConnections,
        circleCount,
        totalIntrosGiven,
        matchesCount,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
