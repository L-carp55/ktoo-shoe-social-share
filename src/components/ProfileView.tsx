
import React from 'react';
import { Settings, Award, Gift, Camera, Star } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const ProfileView: React.FC = () => {
  // Dummy data
  const userProfile = {
    name: 'たろう',
    username: 'taro_fashion',
    avatar: 'https://source.unsplash.com/random/100x100/?avatar',
    points: 2450,
    nextTier: 3000,
    tier: 'シルバー',
    posts: 12,
    reservations: 2,
    completedRentals: 8
  };

  const rewards = [
    { 
      id: '1', 
      title: 'ログインボーナス', 
      description: '本日のログインボーナスを受け取る', 
      points: 50, 
      icon: <Gift size={24} className="text-ktoon-accent" /> 
    },
    { 
      id: '2', 
      title: '写真を投稿する', 
      description: 'レンタルした靴の写真を投稿する', 
      points: 100, 
      icon: <Camera size={24} className="text-ktoon-secondary" /> 
    },
    { 
      id: '3', 
      title: 'レビューを書く', 
      description: 'レンタルした靴のレビューを投稿する', 
      points: 150, 
      icon: <Star size={24} className="text-yellow-500" /> 
    }
  ];

  return (
    <div className="pb-20 pt-2 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">プロフィール</h2>
        <button className="text-gray-600" aria-label="Settings">
          <Settings size={24} />
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center">
          <Avatar className="h-16 w-16">
            <img src={userProfile.avatar} alt={userProfile.name} className="rounded-full object-cover" />
          </Avatar>
          <div className="ml-4">
            <h3 className="font-bold text-lg">{userProfile.name}</h3>
            <p className="text-gray-600">@{userProfile.username}</p>
          </div>
        </div>
        
        <div className="flex justify-around mt-6 text-center">
          <div>
            <p className="font-bold text-lg">{userProfile.posts}</p>
            <p className="text-sm text-gray-600">投稿</p>
          </div>
          <div>
            <p className="font-bold text-lg">{userProfile.reservations}</p>
            <p className="text-sm text-gray-600">予約中</p>
          </div>
          <div>
            <p className="font-bold text-lg">{userProfile.completedRentals}</p>
            <p className="text-sm text-gray-600">レンタル履歴</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center mb-4">
          <Award size={20} className="text-ktoon-primary mr-2" />
          <h3 className="font-bold">ポイント & ランク</h3>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-1">
            <p className="font-bold">{userProfile.points} ポイント</p>
            <p className="text-sm text-gray-600">{userProfile.tier}会員</p>
          </div>
          <div className="mb-1">
            <Progress value={(userProfile.points / userProfile.nextTier) * 100} />
          </div>
          <p className="text-xs text-right text-gray-600">
            次のランクまであと {userProfile.nextTier - userProfile.points} ポイント
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">タスクでポイントを獲得しよう</h4>
          {rewards.map(reward => (
            <div key={reward.id} className="flex items-center mb-4 last:mb-0">
              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                {reward.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{reward.title}</p>
                <p className="text-xs text-gray-600">{reward.description}</p>
              </div>
              <button className="bg-ktoon-primary text-white text-sm py-1 px-3 rounded-full">
                +{reward.points}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
