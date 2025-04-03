
import React, { useState } from 'react';
import ShoeCard, { ShoePost } from './ShoeCard';

// Dummy data for demonstration
const initialPosts: ShoePost[] = [
  {
    id: '1',
    username: 'Yuki_123',
    userAvatar: 'https://source.unsplash.com/random/100x100/?avatar',
    imageUrl: 'https://source.unsplash.com/random/400x400/?sneakers',
    description: '新しい靴をレンタルしました！とても履き心地がいいです。😊 #ktoonplus #shoes',
    likes: 24,
    comments: 5,
    liked: false,
    timestamp: '1時間前',
    parentReview: 'サイズ調整が簡単で、デザインも素敵です。こどもも大喜び！',
    childReview: 'かっこいい！はきごこちがいいよ！'
  },
  {
    id: '2',
    username: 'TaroFashion',
    userAvatar: 'https://source.unsplash.com/random/100x100/?profile',
    imageUrl: 'https://source.unsplash.com/random/400x400/?kids-shoes',
    description: '息子の運動会用にレンタルしました。とても喜んでいます！ #ktoonplus',
    likes: 18,
    comments: 3,
    liked: true,
    timestamp: '3時間前',
    parentReview: '丈夫な作りで安心です。子供も走りやすいと言っています。'
  },
  {
    id: '3',
    username: 'Hana_style',
    userAvatar: 'https://source.unsplash.com/random/100x100/?woman',
    imageUrl: 'https://source.unsplash.com/random/400x400/?colorful-shoes',
    description: '娘が選んだカラフルな靴！毎日履きたがっています♪ #ktoonplus #kidsfashion',
    likes: 42,
    comments: 7,
    liked: false,
    timestamp: '5時間前',
    childReview: 'カラフルでかわいい！おともだちにじまんしたよ！'
  }
];

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<ShoePost[]>(initialPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="pb-20 pt-2 px-4">
      {posts.map(post => (
        <ShoeCard key={post.id} post={post} onLike={handleLike} />
      ))}
    </div>
  );
};

export default SocialFeed;
