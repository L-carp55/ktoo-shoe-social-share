
import React from 'react';
import { Home, Search, Heart, User, Plus, Ruler, Calendar } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center px-2 py-2 ${
        active ? 'text-ktoon-primary' : 'text-gray-500'
      }`}
      onClick={onClick}
      aria-label={label}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-10 overflow-x-auto">
      <NavItem 
        icon={<Home size={22} />} 
        label="ホーム" 
        active={activeTab === 'home'} 
        onClick={() => onTabChange('home')} 
      />
      <NavItem 
        icon={<Search size={22} />} 
        label="検索" 
        active={activeTab === 'search'} 
        onClick={() => onTabChange('search')} 
      />
      <NavItem 
        icon={
          <div className="bg-ktoon-primary text-white rounded-full p-2">
            <Plus size={20} />
          </div>
        } 
        label="投稿" 
        active={activeTab === 'post'} 
        onClick={() => onTabChange('post')} 
      />
      <NavItem 
        icon={<Heart size={22} />} 
        label="おすすめ" 
        active={activeTab === 'recommendations'} 
        onClick={() => onTabChange('recommendations')} 
      />
      <NavItem 
        icon={<Ruler size={22} />} 
        label="成長記録" 
        active={activeTab === 'growth'} 
        onClick={() => onTabChange('growth')} 
      />
      <NavItem 
        icon={<Calendar size={22} />} 
        label="記念日" 
        active={activeTab === 'memories'} 
        onClick={() => onTabChange('memories')} 
      />
      <NavItem 
        icon={<User size={22} />} 
        label="プロフィール" 
        active={activeTab === 'profile'} 
        onClick={() => onTabChange('profile')} 
      />
    </div>
  );
};

export default Navbar;
