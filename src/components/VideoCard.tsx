import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, Music, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VideoCardProps {
  video: {
    id: string;
    username: string;
    avatar: string;
    description: string;
    music: string;
    likes: number;
    comments: number;
    thumbnail: string;
  };
  isActive?: boolean;
}

export const VideoCard = ({ video, isActive = false }: VideoCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <motion.div 
      className="relative w-full h-screen bg-gradient-card glass-card overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: isActive ? 1 : 0.95, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Video Background Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${video.thumbnail})`,
          filter: 'brightness(0.8)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* User Info */}
      <motion.div 
        className="absolute bottom-20 left-4 right-20 z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-12 h-12 border-2 border-white/20">
            <AvatarImage src={video.avatar} />
            <AvatarFallback>
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-white font-semibold text-lg">{video.username}</h3>
          </div>
        </div>
        
        <p className="text-white/90 text-sm mb-3 leading-relaxed">
          {video.description}
        </p>
        
        <div className="flex items-center gap-2 text-white/80">
          <Music className="w-4 h-4" />
          <span className="text-sm truncate">{video.music}</span>
        </div>
      </motion.div>

      {/* Interaction Buttons */}
      <motion.div 
        className="absolute right-4 bottom-32 flex flex-col gap-6 z-20"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="flex flex-col items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full glass btn-3d ${
              liked 
                ? 'bg-red-500/20 text-red-400 shadow-glow-primary' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            onClick={handleLike}
          >
            <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
          </Button>
          <span className="text-white text-xs font-medium">{likeCount}</span>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full glass btn-3d bg-white/10 text-white hover:bg-white/20"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <span className="text-white text-xs font-medium">{video.comments}</span>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full glass btn-3d bg-white/10 text-white hover:bg-white/20"
          >
            <Share className="w-6 h-6" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating Music Icon */}
      <motion.div
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Music className="w-6 h-6 text-white" />
      </motion.div>
    </motion.div>
  );
};