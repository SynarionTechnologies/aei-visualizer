import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import './App.css';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        AEIF Visualizer
      </Text>
      <OrbitControls />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>AEIF Visualizer</h1>
        <p>Interactive 3D Neural Network Dashboard</p>
      </header>
      <div className="canvas-container">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
