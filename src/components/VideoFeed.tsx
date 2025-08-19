import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { VideoCard } from './VideoCard';

// Mock video data
const mockVideos = [
  {
    id: '1',
    username: 'sarah_creates',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b788?w=100',
    description: 'Dancing to my favorite beat! 💃 Who else loves this song? #dance #vibes #music',
    music: 'Levitating - Dua Lipa',
    likes: 12500,
    comments: 847,
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400'
  },
  {
    id: '2',
    username: 'tech_wizard',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    description: 'Mind-blowing tech hack that will change your life! 🚀 Try this at home',
    music: 'Cyberpunk 2077 OST',
    likes: 8920,
    comments: 523,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400'
  },
  {
    id: '3',
    username: 'foodie_adventures',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    description: 'The most satisfying pasta making process 🍝 Recipe in my bio!',
    music: 'Italian Tarantella',
    likes: 15780,
    comments: 1240,
    thumbnail: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400'
  },
  {
    id: '4',
    username: 'adventure_seeker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    description: 'Epic mountain view from 3000ft! 🏔️ Nature is incredible #adventure #hiking',
    music: 'Epic Cinematic Music',
    likes: 22100,
    comments: 892,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  }
];

export const VideoFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-100, 0, 100], [0.5, 1, 0.5]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (newDirection > 0 && currentIndex < mockVideos.length - 1) {
      setDirection(newDirection);
      setCurrentIndex(currentIndex + 1);
    } else if (newDirection < 0 && currentIndex > 0) {
      setDirection(newDirection);
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        paginate(-1);
      } else if (e.key === 'ArrowDown') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Handle wheel events for desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-secondary"
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.y, velocity.y);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <VideoCard 
            video={mockVideos[currentIndex]} 
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-30">
        {mockVideos.map((_, index) => (
          <motion.div
            key={index}
            className={`w-1 h-8 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white shadow-glow-primary' 
                : 'bg-white/30'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      {currentIndex === 0 && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Swipe up for next video ↑
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};