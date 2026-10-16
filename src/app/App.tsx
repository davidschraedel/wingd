import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router';
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
import { NotFoundScreen } from './components/NotFoundScreen';
import { Toaster } from './components/ui/sonner';

export type Person = {
  id: number;
  name: string;
  avatar?: string;
  fallback: string;
  interests: string[];
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SendIntroductionRoute({
  onNavigate,
}: {
  onNavigate: (screen: string, data?: any) => void;
}) {
  const location = useLocation();
  const person = (location.state as any)?.person ?? null;
  return (
    <SendIntroductionScreen
      onNavigate={onNavigate}
      preSelectedPerson={person}
    />
  );
}

function NotFoundRoute({
  onNavigate,
}: {
  onNavigate: (screen: string) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  // Strip leading slash for display, e.g. "/settings" -> "settings"
  const unmatched = location.pathname.replace(/^\//, '') || 'unknown';

  return (
    <NotFoundScreen
      unmatchedScreen={unmatched}
      onNavigate={onNavigate}
      onGoBack={() => {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          onNavigate('home');
        }
      }}
    />
  );
}

export function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (screen: string, data?: any) => {
    if (screen === 'back') {
      navigate(-1);
      return;
    }
    let path = screen.startsWith('/') ? screen : `/${screen}`;
    if (path === '/network') {
      path = '/circle';
    }
    if (location.pathname === path && !data) {
      return;
    }
    navigate(path, { state: data });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] w-full">
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomeScreen onNavigate={handleNavigate} />} />
            <Route path="/circle" element={<CircleScreen onNavigate={handleNavigate} />} />
            <Route path="/network" element={<Navigate to="/circle" replace />} />
            <Route path="/introductions" element={<IntroductionsScreen onNavigate={handleNavigate} />} />
            <Route path="/chats" element={<ChatsScreen onNavigate={handleNavigate} />} />
            <Route path="/chat-detail" element={<ChatDetailScreen onNavigate={handleNavigate} />} />
            <Route path="/profile" element={<ProfileScreen onNavigate={handleNavigate} />} />
            <Route
              path="/send-introduction"
              element={<SendIntroductionRoute onNavigate={handleNavigate} />}
            />
            <Route path="/add-to-circle" element={<AddToCircleScreen onNavigate={handleNavigate} />} />
            <Route path="/login" element={<LoginScreen onNavigate={handleNavigate} />} />
            <Route path="/signup" element={<SignupScreen onNavigate={handleNavigate} />} />
            <Route path="*" element={<NotFoundRoute onNavigate={handleNavigate} />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  );
}