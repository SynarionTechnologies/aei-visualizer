import React, { useState, useEffect, useCallback } from 'react';
import NeuralNetworkScene from './components/3d/NeuralNetworkScene';
import Sidebar from './components/ui/Sidebar';
import Header from './components/ui/Header';
import Loading from './components/ui/Loading';
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

  // Handle network updates from editing
  const handleNetworkUpdate = useCallback((updatedNetwork) => {
    setNetworkData(updatedNetwork);
  }, []);

  if (isLoading && !networkData) {
    return <Loading />;
  }

  return (
    <div className="app h-screen bg-dark-50 text-white overflow-hidden">
      {/* Header */}
      <Header
        networkData={networkData}
        isConnected={isConnected}
        lastUpdated={networkData?.metadata?.lastUpdated}
      />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar
          networkData={networkData}
          selectedNeuron={selectedNeuron}
          selectedConnection={selectedConnection}
          onNeuronSelect={handleNeuronClick}
          onStepNetwork={handleStepNetwork}
          onRefreshNetwork={handleRefreshNetwork}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          showLabels={showLabels}
          onToggleLabels={handleToggleLabels}
          showWeights={showWeights}
          onToggleWeights={handleToggleWeights}
          isLoading={isLoading}
          onNetworkUpdate={handleNetworkUpdate}
        />

        {/* 3D Visualization */}
        <div className="flex-1 relative">
          {networkData ? (
            <NeuralNetworkScene
              networkData={networkData}
              onNeuronClick={handleNeuronClick}
              onConnectionClick={handleConnectionClick}
              selectedNeuron={selectedNeuron}
              selectedConnection={selectedConnection}
              showLabels={showLabels}
              showWeights={showWeights}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-red-400 mb-2">Failed to load network</div>
                <button
                  onClick={handleRefreshNetwork}
                  className="bg-neural-600 hover:bg-neural-500 text-white px-4 py-2 rounded transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {isLoading && networkData && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-dark-100 rounded-lg p-6">
                <Loading message="Updating network..." />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
