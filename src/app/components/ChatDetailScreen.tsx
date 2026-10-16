import { motion } from 'motion/react';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

interface ChatDetailScreenProps {
  onNavigate: (screen: string) => void;
}

export function ChatDetailScreen({ onNavigate }: ChatDetailScreenProps) {
  const [message, setMessage] = useState('');
  
  const messages = [
    {
      id: 1,
      sender: 'them',
      text: 'Hey! Thanks for accepting the intro 😊',
      time: '10:30 AM',
    },
    {
      id: 2,
      sender: 'me',
      text: 'Of course! Sarah said great things about you',
      time: '10:32 AM',
    },
    {
      id: 3,
      sender: 'them',
      text: 'That\'s so nice! I love hiking too. Have you been to Rocky Mountain?',
      time: '10:35 AM',
    },
    {
      id: 4,
      sender: 'me',
      text: 'Yes! Last summer. The trails were amazing',
      time: '10:36 AM',
    },
    {
      id: 5,
      sender: 'them',
      text: 'We should plan a hike sometime!',
      time: '10:38 AM',
    },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1da6e0] to-[#05638f] px-6 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('chats')}
            className="text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <Avatar className="w-10 h-10 bg-white/20">
            <AvatarImage src="/avatars/sarah.jpg" alt="Jessica Barnes" />
            <AvatarFallback className="text-white/90">JB</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-white">Jessica Barnes</div>
            <p className="text-white/80 text-xs">Online</p>
          </div>
          <button className="text-white">
            <MoreVertical size={24} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.sender === 'me'
                  ? 'bg-white text-gray-800 shadow-sm border border-gray-100'
                  : 'bg-gradient-to-r from-[#1da6e0] to-[#05638f] text-white shadow-sm'
              }`}
            >
              <p className={msg.sender === 'me' ? 'text-gray-800' : 'text-white'}>
                {msg.text}
              </p>
              <span
                className={`text-xs mt-1 block ${
                  msg.sender === 'me' ? 'text-gray-400' : 'text-white/80'
                }`}
              >
                {msg.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-[#F5F5F7] px-6 py-4 shadow-sm">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-100 border-0 rounded-full px-6 py-6"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#1da6e0] to-[#05638f] hover:from-[#05638f] hover:to-[#1da6e0] text-white rounded-full w-12 h-12 p-0 border-0 shadow-sm"
          >
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}