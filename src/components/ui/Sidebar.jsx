import React from 'react';
import { 
  Brain, 
  Activity, 
  Settings, 
  RefreshCw, 
  Play, 
  Pause,
  Eye,
  EyeOff,
  Layers
} from 'lucide-react';
import LayerInfo from '../3d/LayerInfo';

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
  isLoading
}) => {
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
              {showWeights ? 'Hide' : 'Show'} Weights
            </button>
          </div>
        </div>
      </div>

      {/* Layer Information */}
      <div className="flex-1 overflow-y-auto p-6">
        {networkData?.layers ? (
          <LayerInfo 
            layers={networkData.layers}
            selectedNeuron={selectedNeuron}
            onNeuronSelect={onNeuronSelect}
          />
        ) : (
          <div className="text-gray-400 text-sm">No network data available</div>
        )}
      </div>

      {/* Selected Item Details */}
      {(selectedNeuron || selectedConnection) && (
        <div className="border-t border-dark-200 p-6">
          <h3 className="text-sm font-semibold text-white mb-3">
            {selectedNeuron ? 'Neuron Details' : 'Connection Details'}
          </h3>
          
          {selectedNeuron && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">ID:</span>
                <span className="text-white">{selectedNeuron.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Label:</span>
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
                <span className="text-gray-400">From:</span>
                <span className="text-white">Neuron {selectedConnection.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">To:</span>
                <span className="text-white">Neuron {selectedConnection.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Weight:</span>
                <span className={`font-semibold ${
                  selectedConnection.weight >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedConnection.weight.toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Strength:</span>
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
