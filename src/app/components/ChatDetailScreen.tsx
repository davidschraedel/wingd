import { motion } from 'motion/react';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppStore } from '../context/AppContext';

interface ChatDetailScreenProps {
  onNavigate: (screen: string) => void;
}

export function ChatDetailScreen({ onNavigate }: ChatDetailScreenProps) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { activeChat, messagesByChatId, sendMessage, openChatWithPerson } =
    useAppStore();

  // If passed directly via route state, ensure active chat is set
  useEffect(() => {
    const routePerson = (location.state as any)?.person;
    if (routePerson && (!activeChat || activeChat.name !== routePerson.name)) {
      openChatWithPerson(routePerson);
    }
  }, [location.state]);

  const chat = activeChat || {
    id: 'chat-jessica',
    name: 'Jessica Barnes',
    avatar: '/avatars/sarah.jpg',
    fallback: 'JB',
    online: true,
    lastMessage: "That's great!",
    time: 'New',
    unread: false,
    type: 'dating',
  };

  const currentMessages = messagesByChatId[chat.id] || [
    {
      id: 'm1',
      sender: 'them' as const,
      text: 'Hey! Thanks for accepting the intro 😊',
      time: '10:30 AM',
    },
    {
      id: 'm2',
      sender: 'me' as const,
      text: 'Of course! Sarah said great things about you',
      time: '10:32 AM',
    },
    {
      id: 'm3',
      sender: 'them' as const,
      text: "That's so nice! I love hiking too. Have you been to Rocky Mountain?",
      time: '10:35 AM',
    },
    {
      id: 'm4',
      sender: 'me' as const,
      text: 'Yes! Last summer. The trails were amazing',
      time: '10:36 AM',
    },
    {
      id: 'm5',
      sender: 'them' as const,
      text: 'We should plan a hike sometime!',
      time: '10:38 AM',
    },
  ];

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(chat.id, message);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1da6e0] to-[#05638f] px-6 pt-12 pb-4 shadow-sm">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate('chats')}
            className="text-white cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Back to chats"
          >
            <ArrowLeft size={24} />
          </button>
          <Avatar className="w-10 h-10 bg-white/20 border border-white/30">
            {chat.avatar && <AvatarImage src={chat.avatar} alt={chat.name} />}
            <AvatarFallback className="text-white font-medium">
              {chat.fallback || chat.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-white font-medium leading-snug">
              {chat.name}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`w-2 h-2 rounded-full ${chat.online ? 'bg-[#86EFAC]' : 'bg-gray-300'
                  }`}
              />
              <p className="text-white/80 text-xs">
                {chat.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          {/* <button
            className="text-white cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="More options"
          >
            <MoreVertical size={24} />
          </button> */}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto space-y-4">
          {currentMessages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.sender === 'me'
                    ? 'bg-white text-gray-800 shadow-sm border border-gray-100'
                    : 'bg-gradient-to-r from-[#1da6e0] to-[#05638f] text-white shadow-sm'
                  }`}
              >
                <p
                  className={`text-sm leading-relaxed ${msg.sender === 'me' ? 'text-gray-800' : 'text-white'
                    }`}
                >
                  {msg.text}
                </p>
                <span
                  className={`text-[10px] mt-1 block ${msg.sender === 'me' ? 'text-gray-400' : 'text-white/80'
                    }`}
                >
                  {msg.time}
                </span>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-[#F5F5F7] px-6 py-4 shadow-sm">
        <div className="w-full md:w-2/3 max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-100 border-0 rounded-full px-6 py-6 text-sm focus-visible:ring-2 focus-visible:ring-[#1da6e0]"
            />
            <Button
              type="submit"
              disabled={!message.trim()}
              className="bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white rounded-full w-12 h-12 p-0 border-0 shadow-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send size={20} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}