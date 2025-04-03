
import React, { useState } from 'react';
import { Search, Camera, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SearchCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface PopularShoe {
  id: string;
  name: string;
  imageUrl: string;
  brand: string;
  popularity: number;
}

const SearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories: SearchCategory[] = [
    { id: 'school', name: '学校' },
    { id: 'sports', name: 'スポーツ' },
    { id: 'casual', name: 'カジュアル' },
    { id: 'party', name: 'パーティー' },
    { id: 'outdoor', name: '屋外' },
    { id: 'winter', name: '冬' },
    { id: 'summer', name: '夏' },
    { id: 'rainy', name: '雨の日' },
  ];
  
  const popularShoes: PopularShoe[] = [
    {
      id: '1',
      name: 'キッズランニングシューズ',
      imageUrl: 'https://source.unsplash.com/random/200x200/?kids-running-shoes',
      brand: 'KtoonBrand',
      popularity: 98
    },
    {
      id: '2',
      name: 'ジュニアスポーツシューズ',
      imageUrl: 'https://source.unsplash.com/random/200x200/?kids-sport-shoes',
      brand: 'SportyKids',
      popularity: 92
    },
    {
      id: '3',
      name: 'カラフルスニーカー',
      imageUrl: 'https://source.unsplash.com/random/200x200/?colorful-sneakers',
      brand: 'RainbowKicks',
      popularity: 85
    },
    {
      id: '4',
      name: 'ウォーターレジスタントブーツ',
      imageUrl: 'https://source.unsplash.com/random/200x200/?kids-boots',
      brand: 'KtoonBrand',
      popularity: 79
    }
  ];
  
  const seasonalShoes: PopularShoe[] = [
    {
      id: '5',
      name: '春の軽量シューズ',
      imageUrl: 'https://source.unsplash.com/random/200x200/?spring-shoes',
      brand: 'SeasonalKids',
      popularity: 95
    },
    {
      id: '6',
      name: '夏のサンダル',
      imageUrl: 'https://source.unsplash.com/random/200x200/?kids-sandals',
      brand: 'SummerStep',
      popularity: 91
    }
  ];

  return (
    <div className="pb-20 pt-2 px-4">
      <h2 className="text-xl font-bold mb-4">検索</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          className="pl-10 pr-14 py-6 border-gray-200 rounded-full bg-gray-50" 
          placeholder="靴を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 p-1.5 rounded-full">
          <Camera size={18} className="text-gray-700" />
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h3 className="font-medium mb-3">シーン別検索</h3>
        <div className="grid grid-cols-4 gap-2">
          {categories.map(category => (
            <button 
              key={category.id}
              className="bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-3 text-sm text-center transition"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">近くの店舗を探す</h3>
          <button className="text-ktoon-primary text-sm">すべて表示</button>
        </div>
        <button className="w-full flex items-center justify-center space-x-2 border border-ktoon-primary text-ktoon-primary py-2 rounded-lg">
          <MapPin size={18} />
          <span>現在地から検索</span>
        </button>
      </div>
      
      <Tabs defaultValue="popular" className="mb-6">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="popular" className="flex-1">人気ランキング</TabsTrigger>
          <TabsTrigger value="seasonal" className="flex-1">季節のおすすめ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="popular" className="bg-white rounded-lg shadow-sm p-4">
          {popularShoes.map((shoe, index) => (
            <div key={shoe.id} className="flex items-center mb-4 last:mb-0">
              <div className="text-xl font-bold w-8 text-center">{index + 1}</div>
              <div className="w-16 h-16 rounded overflow-hidden mr-3">
                <img src={shoe.imageUrl} alt={shoe.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{shoe.name}</h4>
                <p className="text-sm text-gray-600">{shoe.brand}</p>
              </div>
              <div className="text-sm text-ktoon-accent font-medium">
                {shoe.popularity}%
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="seasonal" className="bg-white rounded-lg shadow-sm p-4">
          {seasonalShoes.map((shoe, index) => (
            <div key={shoe.id} className="flex items-center mb-4 last:mb-0">
              <div className="text-xl font-bold w-8 text-center">{index + 1}</div>
              <div className="w-16 h-16 rounded overflow-hidden mr-3">
                <img src={shoe.imageUrl} alt={shoe.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{shoe.name}</h4>
                <p className="text-sm text-gray-600">{shoe.brand}</p>
              </div>
              <div className="text-sm text-ktoon-accent font-medium">
                {shoe.popularity}%
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchView;
