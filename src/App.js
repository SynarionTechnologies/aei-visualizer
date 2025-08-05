import React, { useState, useEffect, useCallback } from 'react';
import TestLucide from './TestLucide';
// import NeuralNetworkScene from './components/3d/NeuralNetworkScene';
// import Sidebar from './components/ui/Sidebar';
// import Header from './components/ui/Header';
// import Loading from './components/ui/Loading';
import { mockApi } from './data/mockApi';
import './App.css';

function App() {
  const [networkData, setNetworkData] = useState(null);
  const [selectedNeuron, setSelectedNeuron] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [showWeights, setShowWeights] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Load initial network data
  useEffect(() => {
    const loadNetwork = async () => {
      try {
        setIsLoading(true);
        const data = await mockApi.fetchNetwork();
        setNetworkData(data);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to load network:', error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadNetwork();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isPlaying && networkData) {
      interval = setInterval(async () => {
        try {
          const updatedData = await mockApi.stepNetwork();
          setNetworkData(updatedData);
        } catch (error) {
          console.error('Failed to step network:', error);
          setIsPlaying(false);
        }
      }, 2000); // Update every 2 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, networkData]);

  // Handle neuron selection
  const handleNeuronClick = useCallback((neuron) => {
    setSelectedNeuron(prev => prev?.id === neuron.id ? null : neuron);
    setSelectedConnection(null); // Clear connection selection
  }, []);

  // Handle connection selection
  const handleConnectionClick = useCallback((connection) => {
    setSelectedConnection(prev => prev?.id === connection.id ? null : connection);
    setSelectedNeuron(null); // Clear neuron selection
  }, []);

  // Step network manually
  const handleStepNetwork = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const updatedData = await mockApi.stepNetwork();
      setNetworkData(updatedData);
    } catch (error) {
      console.error('Failed to step network:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Refresh network
  const handleRefreshNetwork = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const data = await mockApi.fetchNetwork();
      setNetworkData(data);
      setSelectedNeuron(null);
      setSelectedConnection(null);
    } catch (error) {
      console.error('Failed to refresh network:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Toggle play/pause
  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Toggle labels visibility
  const handleToggleLabels = useCallback(() => {
    setShowLabels(prev => !prev);
  }, []);

  // Toggle weights visibility
  const handleToggleWeights = useCallback(() => {
    setShowWeights(prev => !prev);
  }, []);

  if (isLoading && !networkData) {
    return <Loading />;
  }

  return (
    <div className="app h-screen bg-gray-900 text-white overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <TestLucide />
      </div>
    </div>
  );
}

export default App;
