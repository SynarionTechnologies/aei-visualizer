import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Connection = ({ 
  connection, 
  fromNeuron, 
  toNeuron, 
  onClick,
  isSelected = false,
  showWeights = false 
}) => {
  const lineRef = useRef();
  
  // Calculate line geometry
  const { points, distance } = useMemo(() => {
    const start = new THREE.Vector3(
      fromNeuron.position.x,
      fromNeuron.position.y,
      fromNeuron.position.z
    );
    const end = new THREE.Vector3(
      toNeuron.position.x,
      toNeuron.position.y,
      toNeuron.position.z
    );
    
    return {
      points: [start, end],
      distance: start.distanceTo(end)
    };
  }, [fromNeuron.position, toNeuron.position]);

  // Animate based on signal strength
  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material;
      const pulseSpeed = 3;
      const time = state.clock.elapsedTime;
      
      // Animate opacity based on weight strength and time
      const baseOpacity = 0.3 + Math.abs(connection.weight) * 0.4;
      const pulse = Math.sin(time * pulseSpeed) * 0.2 + 0.8;
      material.opacity = baseOpacity * pulse;
    }
  });

  // Color based on weight (positive = green, negative = red)
  const getColor = () => {
    if (isSelected) {
      return new THREE.Color(0xffffff); // white when selected
    }
    
    return connection.weight >= 0 
      ? new THREE.Color(0x22c55e) // positive weights are green
      : new THREE.Color(0xef4444); // negative weights are red
  };

  // Line width based on weight strength
  const getLineWidth = () => {
    return Math.max(0.01, Math.abs(connection.weight) * 0.05);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    onClick?.(connection);
  };

  return (
    <group>
      {/* Main connection line */}
      <line onClick={handleClick}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineRef}
          color={getColor()}
          transparent
          opacity={0.6}
          linewidth={getLineWidth()}
        />
      </line>
      
      {/* Tube for better visibility and clicking */}
      <mesh onClick={handleClick}>
        <cylinderGeometry 
          args={[
            getLineWidth() * 2, 
            getLineWidth() * 2, 
            distance, 
            8
          ]} 
        />
        <meshBasicMaterial
          color={getColor()}
          transparent
          opacity={isSelected ? 0.8 : 0.3}
        />
        {/* Position and rotate the cylinder to connect the neurons */}
        <primitive 
          object={(() => {
            const cylinder = new THREE.Object3D();
            const start = points[0];
            const end = points[1];
            const midpoint = start.clone().add(end).multiplyScalar(0.5);
            
            cylinder.position.copy(midpoint);
            cylinder.lookAt(end);
            cylinder.rotateX(Math.PI / 2);
            
            return cylinder;
          })()} 
        />
      </mesh>

      {/* Weight label */}
      {showWeights && (
        <group>
          {/* Position text at midpoint of connection */}
          <primitive
            object={(() => {
              const textGroup = new THREE.Object3D();
              const start = points[0];
              const end = points[1];
              const midpoint = start.clone().add(end).multiplyScalar(0.5);
              textGroup.position.copy(midpoint);
              return textGroup;
            })()}
          >
            {/* Using HTML overlay would be better for text, but this works for now */}
          </primitive>
        </group>
      )}
    </group>
  );
};

export default Connection;
