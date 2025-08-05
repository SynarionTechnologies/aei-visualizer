import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Text } from '@react-three/drei';
import Neuron from './Neuron';
import Connection from './Connection';
import { getNeuronById } from '../../data/mockApi';

const NeuralNetworkScene = ({ 
  networkData, 
  onNeuronClick, 
  onConnectionClick,
  selectedNeuron = null,
  selectedConnection = null,
  showLabels = true,
  showWeights = false 
}) => {
  const [hoveredNeuron, setHoveredNeuron] = useState(null);

  // Create lookup map for neurons
  const neuronMap = useMemo(() => {
    const map = new Map();
    networkData?.layers?.forEach(layer => {
      layer.neurons.forEach(neuron => {
        map.set(neuron.id, neuron);
      });
    });
    return map;
  }, [networkData]);

  // Handle neuron clicks
  const handleNeuronClick = (neuron) => {
    onNeuronClick?.(neuron);
  };

  // Handle connection clicks
  const handleConnectionClick = (connection) => {
    onConnectionClick?.(connection);
  };

  if (!networkData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">Loading network...</div>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ 
        position: [8, 5, 8], 
        fov: 50,
        near: 0.1,
        far: 1000 
      }}
      style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4f46e5" />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Grid for reference */}
      <Grid 
        args={[20, 20]} 
        position={[0, -5, 0]}
        cellColor="#374151"
        sectionColor="#6b7280"
        fadeDistance={30}
        fadeStrength={1}
      />

      {/* Render connections first (so they appear behind neurons) */}
      {networkData.connections?.map((connection) => {
        const fromNeuron = neuronMap.get(connection.from);
        const toNeuron = neuronMap.get(connection.to);
        
        if (!fromNeuron || !toNeuron) return null;

        return (
          <Connection
            key={connection.id}
            connection={connection}
            fromNeuron={fromNeuron}
            toNeuron={toNeuron}
            onClick={handleConnectionClick}
            isSelected={selectedConnection?.id === connection.id}
            showWeights={showWeights}
          />
        );
      })}

      {/* Render neurons */}
      {networkData.layers?.map((layer) => (
        <group key={layer.id}>
          {/* Layer label */}
          <Text
            position={[layer.position.x, layer.position.y + 4, layer.position.z]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            {layer.name}
          </Text>
          
          {/* Layer neurons */}
          {layer.neurons.map((neuron) => (
            <Neuron
              key={neuron.id}
              neuron={neuron}
              layerType={layer.type}
              onClick={handleNeuronClick}
              isSelected={selectedNeuron?.id === neuron.id}
              showLabels={showLabels}
            />
          ))}
        </group>
      ))}

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={50}
        maxPolarAngle={Math.PI}
      />
    </Canvas>
  );
};

export default NeuralNetworkScene;
