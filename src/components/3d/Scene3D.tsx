import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { FloatingIcon } from './FloatingIcon';

interface Scene3DProps {
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  className?: string;
}

export const Scene3D = ({ onLike, onComment, onShare, className }: Scene3DProps) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        
        <Environment preset="night" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <FloatingIcon 
            position={[2, 1, 0]} 
            icon="♥" 
            color="#ff1744"
            onClick={onLike}
          />
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
          <FloatingIcon 
            position={[2, -0.5, 0]} 
            icon="💬" 
            color="#2196f3"
            onClick={onComment}
          />
        </Float>
        
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <FloatingIcon 
            position={[2, -2, 0]} 
            icon="📤" 
            color="#4caf50"
            onClick={onShare}
          />
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};