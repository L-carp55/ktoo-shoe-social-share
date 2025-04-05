
import React from 'react';
import { Badge, Calendar, Award, Gift } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const PointsView: React.FC = () => {
  const userPoints = {
    current: 2450,
    nextLevel: 3000,
    level: 'シルバー',
    nextLevel: 'ゴールド',
    streak: 5
  };
  
  const pointHistory = [
    { id: '1', title: 'ログインボーナス', date: '今日', points: 50, type: 'earned' },
    { id: '2', title: '写真投稿ボーナス', date: '昨日', points: 100, type: 'earned' },
    { id: '3', title: 'シューズレンタル', date: '3日前', points: -500, type: 'spent' },
    { id: '4', title: 'レビュー投稿ボーナス', date: '先週', points: 150, type: 'earned' },
    { id: '5', title: '友達紹介ボーナス', date: '先週', points: 200, type: 'earned' }
  ];
  
  const upcomingTasks = [
    { id: '1', title: '3日連続ログイン', reward: 150, progress: 2, total: 3 },
    { id: '2', title: '5件のレビューを投稿', reward: 300, progress: 3, total: 5 },
    { id: '3', title: '10枚の写真をシェア', reward: 500, progress: 6, total: 10 }
  ];

  return (
    <div className="pb-20 pt-2 px-4">
      <h2 className="text-xl font-bold mb-4">ポイント</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">現在のポイント</h3>
          <span className="font-bold text-xl text-ktoon-primary">{userPoints.current}</span>
        </div>
        
        <div className="mb-1">
          <Progress value={(userPoints.current / userPoints.nextLevel) * 100} />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{userPoints.level}会員</span>
          <span>{userPoints.nextLevel}会員まであと{userPoints.nextLevel - userPoints.current}ポイント</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center mb-4">
          <Calendar size={20} className="text-ktoon-primary mr-2" />
          <h3 className="font-medium">デイリーチェックイン</h3>
        </div>
        
        <div className="flex justify-between mb-2">
          <div className="text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${userPoints.streak >= 1 ? 'bg-ktoon-primary text-white' : 'bg-gray-100'}`}>
              月
            </div>
          </div>
          <div className="text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${userPoints.streak >= 2 ? 'bg-ktoon-primary text-white' : 'bg-gray-100'}`}>
              火
            </div>
          </div>
          <div className="text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${userPoints.streak >= 3 ? 'bg-ktoon-primary text-white' : 'bg-gray-100'}`}>
              水
            </div>
          </div>
          <div className="text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${userPoints.streak >= 4 ? 'bg-ktoon-primary text-white' : 'bg-gray-100'}`}>
              木
            </div>
          </div>
          <div className="text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${userPoints.streak >= 5 ? 'bg-ktoon-primary text-white' : 'bg-gray-100'}`}>
              金
            </div>
          </div>
          <div className="text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${userPoints.streak >= 6 ? 'bg-ktoon-primary text-white' : 'bg-gray-100'}`}>
              土
            </div>
          </div>
          <div className="text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${userPoints.streak >= 7 ? 'bg-ktoon-primary text-white' : 'bg-gray-100'}`}>
              日
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <button className="bg-ktoon-primary text-white py-2 px-6 rounded-full">
            今日のボーナスをゲット (50ポイント)
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center mb-4">
          <Award size={20} className="text-ktoon-primary mr-2" />
          <h3 className="font-medium">タスク達成でポイントを獲得</h3>
        </div>
        
        {upcomingTasks.map(task => (
          <div key={task.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm">{task.title}</p>
              <span className="text-sm text-ktoon-accent">+{task.reward}</span>
            </div>
            <div className="mb-1">
              <Progress value={(task.progress / task.total) * 100} />
            </div>
            <p className="text-xs text-right text-gray-600">
              {task.progress}/{task.total} 完了
            </p>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center mb-4">
          <Gift size={20} className="text-ktoon-primary mr-2" />
          <h3 className="font-medium">ポイント履歴</h3>
        </div>
        
        {pointHistory.map(item => (
          <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-600">{item.date}</p>
            </div>
            <span className={`font-medium ${item.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
              {item.type === 'earned' ? '+' : '-'}{item.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsView;
