
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import SocialFeed from '@/components/SocialFeed';
import SwipeRecommendation from '@/components/SwipeRecommendation';
import ProfileView from '@/components/ProfileView';
import SearchView from '@/components/SearchView';
import PointsView from '@/components/PointsView';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <SocialFeed />;
      case 'search':
        return <SearchView />;
      case 'post':
        // For now, we'll just show the points view when post is clicked
        // In a real app, this would open a camera/upload interface
        return <PointsView />;
      case 'recommendations':
        return <SwipeRecommendation />;
      case 'profile':
        return <ProfileView />;
      default:
        return <SocialFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <h1 className="text-xl font-bold text-center text-ktoon-primary">クトゥーンプラス</h1>
      </header>
      
      <main className="pt-14">
        {renderContent()}
      </main>
      
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
