
import React, { useState } from 'react';
import { X, Heart, Bookmark, Info, Star } from 'lucide-react';

interface Shoe {
  id: string;
  name: string;
  imageUrl: string;
  brand: string;
  size: string;
  description: string;
  rating: number;
  waitingCount?: number;
}

const dummyShoes: Shoe[] = [
  {
    id: '1',
    name: 'キッズ スポーツシューズ',
    imageUrl: 'https://source.unsplash.com/random/400x500/?kids-sneakers',
    brand: 'KtoonBrand',
    size: '18cm',
    description: '軽量で丈夫なスポーツシューズ。運動会や普段使いにぴったり！',
    rating: 4.5,
    waitingCount: 3
  },
  {
    id: '2',
    name: 'ジュニア ランニングシューズ',
    imageUrl: 'https://source.unsplash.com/random/400x500/?running-shoes',
    brand: 'SpeedKids',
    size: '20cm',
    description: 'クッション性抜群のランニングシューズ。長時間の使用でも快適です。',
    rating: 4.2,
    waitingCount: 5
  },
  {
    id: '3',
    name: 'キッズ カジュアルシューズ',
    imageUrl: 'https://source.unsplash.com/random/400x500/?kids-casual-shoes',
    brand: 'KtoonBrand',
    size: '19cm',
    description: 'カラフルでおしゃれなカジュアルシューズ。どんな服装にも合います。',
    rating: 4.8,
    waitingCount: 7
  }
];

const SwipeRecommendation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState('');
  const [likedShoes, setLikedShoes] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const currentShoe = dummyShoes[currentIndex];

  const handleSwipe = (liked: boolean) => {
    setAnimation(liked ? 'animate-slide-right' : 'animate-slide-left');
    
    if (liked) {
      setLikedShoes([...likedShoes, currentShoe.id]);
    }
    
    // Reset animation and move to next shoe after animation completes
    setTimeout(() => {
      setAnimation('');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyShoes.length);
      setShowDetails(false);
    }, 300);
  };

  if (!currentShoe) return null;

  return (
    <div className="pb-20 pt-2 px-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-center">あなたへのおすすめ</h2>
      
      <div className="relative flex-1 flex items-center justify-center">
        <div 
          className={`relative w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg ${animation}`}
        >
          <img 
            src={currentShoe.imageUrl} 
            alt={currentShoe.name} 
            className="w-full aspect-[3/4] object-cover"
          />
          
          <div className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md">
            <button onClick={() => setShowDetails(!showDetails)} aria-label="Show details">
              <Info size={24} className="text-ktoon-primary" />
            </button>
          </div>
          
          {showDetails ? (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6">
              <div className="bg-white rounded-lg p-4 w-full max-w-xs">
                <h3 className="font-bold text-lg mb-1">{currentShoe.name}</h3>
                <p className="text-sm text-gray-600 mb-2">ブランド: {currentShoe.brand}</p>
                <p className="text-sm text-gray-600 mb-2">サイズ: {currentShoe.size}</p>
                <p className="text-sm mb-3">{currentShoe.description}</p>
                <div className="flex items-center mb-2">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm">{currentShoe.rating}</span>
                </div>
                {currentShoe.waitingCount !== undefined && (
                  <p className="text-sm text-ktoon-accent">
                    現在の待ち人数: {currentShoe.waitingCount}人
                  </p>
                )}
                <button 
                  className="mt-3 w-full py-2 bg-ktoon-primary text-white rounded-lg"
                  onClick={() => setShowDetails(false)}
                >
                  閉じる
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="font-bold text-lg">{currentShoe.name}</h3>
              <p className="text-sm text-gray-600">{currentShoe.brand} • {currentShoe.size}</p>
              <div className="flex items-center mt-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="ml-1 text-sm">{currentShoe.rating}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center space-x-8 mt-6 mb-4">
        <button 
          className="bg-white p-3 rounded-full shadow-md text-red-500 hover:bg-red-50 transition"
          onClick={() => handleSwipe(false)}
          aria-label="Dislike"
        >
          <X size={32} />
        </button>
        <button 
          className="bg-white p-3 rounded-full shadow-md text-ktoon-primary hover:bg-indigo-50 transition"
          onClick={() => handleSwipe(true)}
          aria-label="Like"
        >
          <Heart size={32} />
        </button>
      </div>
      
      {likedShoes.length > 0 && (
        <div className="mt-2 flex justify-center">
          <div className="flex items-center text-sm text-gray-600">
            <Bookmark size={16} className="mr-1" />
            <span>{likedShoes.length}個の靴をお気に入りに追加しました</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipeRecommendation;
