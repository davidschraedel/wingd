import { useEffect, useState } from 'react';
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
import { BottomNav } from './components/BottomNav';
import { Toaster } from './components/ui/sonner';

export type Person = {
  id: number;
  name: string;
  avatar?: string;
  fallback: string;
  interests: string[];
};

const AUTH_KEY = 'wingd_authenticated';

function getInitialAuthState(): boolean {
  try {
    return window.sessionStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

function setStoredAuthState(authenticated: boolean) {
  try {
    if (authenticated) {
      window.sessionStorage.setItem(AUTH_KEY, 'true');
    } else {
      window.sessionStorage.removeItem(AUTH_KEY);
    }
  } catch {
    // sessionStorage unavailable or restricted
  }
}

function ProtectedRouteWrapper({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: React.ReactNode;
}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function PublicOnlyRouteWrapper({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: React.ReactNode;
}) {
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
}

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getInitialAuthState);

  const handleLoginSuccess = () => {
    setStoredAuthState(true);
    setIsAuthenticated(true);
    navigate('/home', { replace: true });
  };

  const handleLogout = () => {
    setStoredAuthState(false);
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  const handleNavigate = (screen: string, data?: any) => {
    if (screen === 'back') {
      navigate(-1);
      return;
    }
    if (screen === 'login' || screen === '/login') {
      handleLogout();
      return;
    }
    let path = screen.startsWith('/') ? screen : `/${screen}`;
    if (path === '/network') {
      path = '/circle';
    }
    if (
      (location.pathname === '/login' || location.pathname === '/signup') &&
      path === '/home'
    ) {
      handleLoginSuccess();
      return;
    }
    if (location.pathname === path && !data) {
      return;
    }
    navigate(path, { state: data });
  };

  const navMap: Record<string, string> = {
    '/home': 'home',
    '/circle': 'circle',
    '/network': 'circle',
    '/introductions': 'introductions',
    '/chats': 'chats',
    '/profile': 'profile',
  };
  const activeNav = navMap[location.pathname];

  return (
    <div className="min-h-screen bg-[#FAFAFA] w-full">
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? '/home' : '/login'} replace />
              }
            />
            <Route
              path="/login"
              element={
                <PublicOnlyRouteWrapper isAuthenticated={isAuthenticated}>
                  <LoginScreen
                    onNavigate={handleNavigate}
                    onLogin={handleLoginSuccess}
                  />
                </PublicOnlyRouteWrapper>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicOnlyRouteWrapper isAuthenticated={isAuthenticated}>
                  <SignupScreen
                    onNavigate={handleNavigate}
                    onLogin={handleLoginSuccess}
                  />
                </PublicOnlyRouteWrapper>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  <HomeScreen onNavigate={handleNavigate} />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/circle"
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  <CircleScreen onNavigate={handleNavigate} />
                </ProtectedRouteWrapper>
              }
            />
            <Route path="/network" element={<Navigate to="/circle" replace />} />
            <Route
              path="/introductions"
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  <IntroductionsScreen onNavigate={handleNavigate} />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/chats"
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  <ChatsScreen onNavigate={handleNavigate} />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/chat-detail"
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  <ChatDetailScreen onNavigate={handleNavigate} />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  <ProfileScreen
                    onNavigate={handleNavigate}
                    onLogout={handleLogout}
                  />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/send-introduction"
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  <SendIntroductionRoute onNavigate={handleNavigate} />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/add-to-circle"
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  <AddToCircleScreen onNavigate={handleNavigate} />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  <NotFoundRoute onNavigate={handleNavigate} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
      {isAuthenticated && activeNav && (
        <BottomNav active={activeNav} onNavigate={handleNavigate} />
      )}
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