import { Home, Users, Heart, MessageCircle, User } from 'lucide-react';

interface BottomNavProps {
  active: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'circle', icon: Users, label: 'Circle' },
    { id: 'introductions', icon: Heart, label: 'Introduced' },
    { id: 'chats', icon: MessageCircle, label: 'Chats' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F5F5F7] px-2 sm:px-4 py-2 z-50 shadow-sm">
      <div className="w-full md:w-2/3 max-w-4xl mx-auto grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-1 py-1 transition-colors bg-[rgba(0,0,0,0)] cursor-pointer"
            >
              <Icon
                size={20}
                className={isActive ? 'text-[#1da6e0]' : 'text-[#A1A1AA]'}
              />
              <span className={`text-xs whitespace-nowrap ${isActive ? 'text-[#1da6e0]' : 'text-[#A1A1AA]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}