import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text3D } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingIconProps {
  position: [number, number, number];
  icon: string;
  color: string;
  onClick?: () => void;
}

export const FloatingIcon = ({ position, icon, color, onClick }: FloatingIconProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      <Sphere ref={meshRef} args={[0.3, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Sphere>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.2}
        height={0.05}
        position={[-0.1, -0.1, 0.3]}
      >
        {icon}
        <meshStandardMaterial 
          color="white" 
          emissive="white"
          emissiveIntensity={0.3}
        />
      </Text3D>
    </group>
  );
};