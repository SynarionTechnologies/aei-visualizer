import React, { useState } from 'react';
import {
  Brain,
  Activity,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Eye,
  EyeOff,
  Layers,
  Edit3,
  Save
} from 'lucide-react';
import LayerInfo from '../3d/LayerInfo';
import NeuronEditor from './NeuronEditor';
import ConnectionEditor from './ConnectionEditor';
import NetworkControls from './NetworkControls';

const Sidebar = ({
  networkData,
  selectedNeuron,
  selectedConnection,
  onNeuronSelect,
  onStepNetwork,
  onRefreshNetwork,
  isPlaying,
  onTogglePlay,
  showLabels,
  onToggleLabels,
  showWeights,
  onToggleWeights,
  isLoading,
  onNetworkUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingMode, setEditingMode] = useState(null); // 'neuron', 'connection', or null

  const handleStartEdit = (type) => {
    setIsEditing(true);
    setEditingMode(type);
  };

  const handleSaveNeuron = (updatedNeuron) => {
    if (onNetworkUpdate && networkData) {
      const updatedNetwork = { ...networkData };
      updatedNetwork.layers.forEach(layer => {
        const neuronIndex = layer.neurons.findIndex(n => n.id === updatedNeuron.id);
        if (neuronIndex !== -1) {
          layer.neurons[neuronIndex] = updatedNeuron;
        }
      });
      onNetworkUpdate(updatedNetwork);
    }
    setIsEditing(false);
    setEditingMode(null);
  };

  const handleSaveConnection = (updatedConnection) => {
    if (onNetworkUpdate && networkData) {
      const updatedNetwork = { ...networkData };
      const connectionIndex = updatedNetwork.connections.findIndex(c => c.id === updatedConnection.id);
      if (connectionIndex !== -1) {
        updatedNetwork.connections[connectionIndex] = updatedConnection;
      }
      onNetworkUpdate(updatedNetwork);
    }
    setIsEditing(false);
    setEditingMode(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingMode(null);
  };

  const getSelectedLayerType = () => {
    if (!selectedNeuron || !networkData) return 'hidden';
    const layer = networkData.layers.find(layer =>
      layer.neurons.some(n => n.id === selectedNeuron.id)
    );
    return layer?.type || 'hidden';
  };
  return (
    <div className="w-80 bg-dark-50 border-r border-dark-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-dark-200">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-neural-500" />
          <div>
            <h1 className="text-xl font-bold text-white">AEIF Visualizer</h1>
            <p className="text-sm text-gray-400">Neural Network Dashboard</p>
          </div>
        </div>
        
        {/* Network Stats */}
        {networkData?.metadata && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-dark-100 rounded p-2">
              <div className="text-gray-400">Accuracy</div>
              <div className="text-white font-semibold">
                {(networkData.metadata.accuracy * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-dark-100 rounded p-2">
              <div className="text-gray-400">Loss</div>
              <div className="text-white font-semibold">
                {networkData.metadata.loss.toFixed(4)}
              </div>
            </div>
            <div className="bg-dark-100 rounded p-2">
              <div className="text-gray-400">Epoch</div>
              <div className="text-white font-semibold">
                {networkData.metadata.epoch}
              </div>
            </div>
            <div className="bg-dark-100 rounded p-2">
              <div className="text-gray-400">Learning Rate</div>
              <div className="text-white font-semibold">
                {networkData.metadata.learningRate}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-dark-200">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Controls
        </h3>
        
        <div className="space-y-3">
          {/* Play/Pause and Step */}
          <div className="flex gap-2">
            <button
              onClick={onTogglePlay}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-neural-600 hover:bg-neural-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button
              onClick={onStepNetwork}
              disabled={isLoading || isPlaying}
              className="flex items-center justify-center gap-2 bg-dark-200 hover:bg-dark-300 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded transition-colors"
            >
              <Activity className="w-4 h-4" />
              Step
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={onRefreshNetwork}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-dark-200 hover:bg-dark-300 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Network
          </button>

          {/* View Options */}
          <div className="space-y-2">
            <button
              onClick={onToggleLabels}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors ${
                showLabels 
                  ? 'bg-neural-600 hover:bg-neural-500 text-white' 
                  : 'bg-dark-200 hover:bg-dark-300 text-gray-300'
              }`}
            >
              {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {showLabels ? 'Hide' : 'Show'} Labels
            </button>
            
            <button
              onClick={onToggleWeights}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors ${
                showWeights
                  ? 'bg-neural-600 hover:bg-neural-500 text-white'
                  : 'bg-dark-200 hover:bg-dark-300 text-gray-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              {showWeights ? 'Masquer' : 'Afficher'} Poids
            </button>
          </div>

          {/* Edit Mode Toggle */}
          <div className="border-t border-dark-300 pt-3 mt-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors ${
                isEditing
                  ? 'bg-green-600 hover:bg-green-500 text-white'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? 'Mode Lecture' : 'Mode Édition'}
            </button>

            {isEditing && (selectedNeuron || selectedConnection) && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {selectedNeuron && (
                  <button
                    onClick={() => handleStartEdit('neuron')}
                    className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-sm transition-colors"
                  >
                    <Brain className="w-3 h-3" />
                    Neurone
                  </button>
                )}
                {selectedConnection && (
                  <button
                    onClick={() => handleStartEdit('connection')}
                    className="flex items-center justify-center gap-1 bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 rounded text-sm transition-colors"
                  >
                    <Layers className="w-3 h-3" />
                    Connexion
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Network Controls */}
        {isEditing && (
          <div className="mb-6">
            <NetworkControls
              networkData={networkData}
              onNetworkUpdate={onNetworkUpdate}
              onResetNetwork={onRefreshNetwork}
            />
          </div>
        )}

        {/* Editors */}
        {isEditing && editingMode === 'neuron' && selectedNeuron && (
          <div className="mb-6">
            <NeuronEditor
              neuron={selectedNeuron}
              layerType={getSelectedLayerType()}
              onSave={handleSaveNeuron}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        {isEditing && editingMode === 'connection' && selectedConnection && (
          <div className="mb-6">
            <ConnectionEditor
              connection={selectedConnection}
              networkData={networkData}
              onSave={handleSaveConnection}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        {/* Layer Information */}
        {networkData?.layers ? (
          <LayerInfo
            layers={networkData.layers}
            selectedNeuron={selectedNeuron}
            onNeuronSelect={onNeuronSelect}
          />
        ) : (
          <div className="text-gray-400 text-sm">Aucune donnée de réseau disponible</div>
        )}
      </div>

      {/* Selected Item Details */}
      {(selectedNeuron || selectedConnection) && !isEditing && (
        <div className="border-t border-dark-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">
              {selectedNeuron ? 'Détails du Neurone' : 'Détails de la Connexion'}
            </h3>
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs bg-amber-600 hover:bg-amber-500 text-white px-2 py-1 rounded transition-colors"
            >
              Éditer
            </button>
          </div>
          
          {selectedNeuron && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">ID:</span>
                <span className="text-white">{selectedNeuron.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Libellé:</span>
                <span className="text-white">{selectedNeuron.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Activation:</span>
                <span className="text-white">{selectedNeuron.activation.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Position:</span>
                <span className="text-white">
                  ({selectedNeuron.position.x}, {selectedNeuron.position.y}, {selectedNeuron.position.z})
                </span>
              </div>
            </div>
          )}
          
          {selectedConnection && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">ID:</span>
                <span className="text-white">{selectedConnection.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">De:</span>
                <span className="text-white">Neurone {selectedConnection.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Vers:</span>
                <span className="text-white">Neurone {selectedConnection.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Poids:</span>
                <span className={`font-semibold ${
                  selectedConnection.weight >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedConnection.weight.toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Force:</span>
                <span className="text-white">{selectedConnection.strength.toFixed(4)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
