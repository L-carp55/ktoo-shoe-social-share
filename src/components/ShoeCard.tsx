
import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

export interface ShoePost {
  id: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  description: string;
  likes: number;
  comments: number;
  liked: boolean;
  timestamp: string;
  parentReview?: string;
  childReview?: string;
}

interface ShoeCardProps {
  post: ShoePost;
  onLike: (id: string) => void;
}

const ShoeCard: React.FC<ShoeCardProps> = ({ post, onLike }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 mb-4">
      {/* Card Header */}
      <div className="flex items-center p-3">
        <Avatar className="h-8 w-8">
          <img src={post.userAvatar} alt={post.username} className="rounded-full object-cover" />
        </Avatar>
        <span className="ml-2 font-medium text-sm">{post.username}</span>
        <span className="ml-auto text-xs text-gray-500">{post.timestamp}</span>
      </div>
      
      {/* Card Image */}
      <div className="relative">
        <img 
          src={post.imageUrl} 
          alt="Posted shoe" 
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Card Actions */}
      <div className="flex items-center p-3">
        <button 
          className={`mr-4 ${post.liked ? 'text-ktoon-accent' : 'text-gray-600'}`}
          onClick={() => onLike(post.id)}
          aria-label="Like"
        >
          <Heart size={24} fill={post.liked ? "#F43F5E" : "none"} />
        </button>
        <button className="mr-4 text-gray-600" aria-label="Comment">
          <MessageCircle size={24} />
        </button>
        <button className="text-gray-600" aria-label="Share">
          <Share2 size={24} />
        </button>
        <span className="ml-auto text-sm font-medium">{post.likes} いいね</span>
      </div>

      {/* Description */}
      <div className="px-3 pb-2">
        <p className="text-sm">
          <span className="font-medium">{post.username}</span> {post.description}
        </p>
      </div>

      {/* Reviews section */}
      {(post.parentReview || post.childReview) && (
        <div className="p-3 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">レビュー</h4>
          {post.parentReview && (
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-600">親の視点:</span>
              <p className="text-sm">{post.parentReview}</p>
            </div>
          )}
          {post.childReview && (
            <div>
              <span className="text-xs font-medium text-gray-600">子供の視点:</span>
              <p className="text-sm">{post.childReview}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoeCard;
