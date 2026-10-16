import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { HomeScreen } from './components/HomeScreen';
import { CircleScreen } from './components/CircleScreen';
import { IntroductionsScreen } from './components/IntroductionsScreen';
import { ChatsScreen } from './components/ChatsScreen';
import { ChatDetailScreen } from './components/ChatDetailScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SendIntroductionScreen } from './components/SendIntroductionScreen';
import { AddToCircleScreen } from './components/AddToCircleScreen';
import { Toaster } from './components/ui/sonner';

export type Person = {
  id: number;
  name: string;
  avatar?: string;
  fallback: string;
  interests: string[];
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [preSelectedPerson, setPreSelectedPerson] = useState<Person | null>(null);

  const handleNavigate = (screen: string, data?: any) => {
    if (screen === 'send-introduction' && data?.person) {
      setPreSelectedPerson(data.person);
    } else if (screen !== 'send-introduction') {
      setPreSelectedPerson(null);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onNavigate={handleNavigate} />;
      case 'signup':
        return <SignupScreen onNavigate={handleNavigate} />;
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'circle':
      case 'network':
        return <CircleScreen onNavigate={handleNavigate} />;
      case 'introductions':
        return <IntroductionsScreen onNavigate={handleNavigate} />;
      case 'chats':
        return <ChatsScreen onNavigate={handleNavigate} />;
      case 'chat-detail':
        return <ChatDetailScreen onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      case 'send-introduction':
        return <SendIntroductionScreen onNavigate={handleNavigate} preSelectedPerson={preSelectedPerson} />;
      case 'add-to-circle':
        return <AddToCircleScreen onNavigate={handleNavigate} />;
      default:
        return <LoginScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      <Toaster position="top-center" richColors />
    </div>
  );
}