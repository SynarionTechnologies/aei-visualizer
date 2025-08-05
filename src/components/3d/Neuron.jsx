import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Neuron = ({ 
  neuron, 
  layerType, 
  onClick, 
  isSelected = false,
  showLabels = true 
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Animation based on activation
  useFrame((state) => {
    if (meshRef.current) {
      const baseScale = 0.3 + neuron.activation * 0.4;
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1 * neuron.activation;
      meshRef.current.scale.setScalar(baseScale * pulseScale);
    }
  });

  // Color based on layer type and activation
  const getColor = () => {
    const colors = {
      input: new THREE.Color(0x10b981),   // green
      hidden: new THREE.Color(0x3b82f6),  // blue
      output: new THREE.Color(0xf59e0b)   // amber
    };
    
    const baseColor = colors[layerType] || colors.hidden;
    const intensity = 0.3 + neuron.activation * 0.7;
    
    if (isSelected) {
      return new THREE.Color(0xff6b6b); // red when selected
    }
    
    if (hovered) {
      return baseColor.clone().multiplyScalar(1.5);
    }
    
    return baseColor.clone().multiplyScalar(intensity);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    onClick?.(neuron);
  };

  return (
    <group position={[neuron.position.x, neuron.position.y, neuron.position.z]}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={getColor()}
          emissive={getColor().clone().multiplyScalar(0.2)}
          transparent
          opacity={0.8 + neuron.activation * 0.2}
        />
      </mesh>
      
      {/* Glow effect for high activation */}
      {neuron.activation > 0.7 && (
        <mesh scale={[1.5, 1.5, 1.5]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={getColor()}
            transparent
            opacity={0.2}
          />
        </mesh>
      )}
      
      {/* Label */}
      {showLabels && (
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {neuron.label}
        </Text>
      )}
      
      {/* Activation value */}
      {(hovered || isSelected) && (
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {neuron.activation.toFixed(3)}
        </Text>
      )}
    </group>
  );
};

export default Neuron;
