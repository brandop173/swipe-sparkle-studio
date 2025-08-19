import { VideoFeed } from '@/components/VideoFeed';
import { Suspense } from 'react';

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Suspense fallback={
        <div className="w-full h-screen bg-gradient-secondary flex items-center justify-center">
          <div className="text-white text-lg">Loading amazing videos...</div>
        </div>
      }>
        <VideoFeed />
      </Suspense>
    </div>
  );
};

export default Index;
