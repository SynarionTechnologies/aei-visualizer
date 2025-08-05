import React, { useState } from 'react';
import { 
  Settings, 
  Shuffle, 
  RotateCcw, 
  Download, 
  Upload, 
  Zap,
  Brain,
  Plus,
  Minus
} from 'lucide-react';

const NetworkControls = ({ 
  networkData, 
  onNetworkUpdate,
  onRandomizeActivations,
  onRandomizeWeights,
  onResetNetwork,
  onExportData,
  onImportData
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [learningRate, setLearningRate] = useState(0.001);

  const handleRandomizeActivations = () => {
    const updatedNetwork = { ...networkData };
    updatedNetwork.layers.forEach(layer => {
      layer.neurons.forEach(neuron => {
        neuron.activation = Math.random();
      });
    });
    onNetworkUpdate(updatedNetwork);
    onRandomizeActivations?.();
  };

  const handleRandomizeWeights = () => {
    const updatedNetwork = { ...networkData };
    updatedNetwork.connections.forEach(connection => {
      connection.weight = (Math.random() - 0.5) * 2; // -1 to 1
      connection.strength = Math.abs(connection.weight);
    });
    onNetworkUpdate(updatedNetwork);
    onRandomizeWeights?.();
  };

  const handleScaleActivations = (factor) => {
    const updatedNetwork = { ...networkData };
    updatedNetwork.layers.forEach(layer => {
      layer.neurons.forEach(neuron => {
        neuron.activation = Math.min(1, Math.max(0, neuron.activation * factor));
      });
    });
    onNetworkUpdate(updatedNetwork);
  };

  const handleScaleWeights = (factor) => {
    const updatedNetwork = { ...networkData };
    updatedNetwork.connections.forEach(connection => {
      connection.weight = Math.min(1, Math.max(-1, connection.weight * factor));
      connection.strength = Math.abs(connection.weight);
    });
    onNetworkUpdate(updatedNetwork);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(networkData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `neural_network_${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    onExportData?.();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          onNetworkUpdate(importedData);
          onImportData?.(importedData);
        } catch (error) {
          console.error('Erreur lors de l\'importation:', error);
          alert('Erreur lors de l\'importation du fichier JSON');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-dark-100 rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-white hover:bg-dark-200 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-neural-500" />
          <span className="font-medium">Contrôles Réseau</span>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <Plus className="w-4 h-4" />
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-dark-300 space-y-4">
          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Actions rapides</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleRandomizeActivations}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                <Brain className="w-4 h-4" />
                Activations aléatoires
              </button>
              <button
                onClick={handleRandomizeWeights}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                <Zap className="w-4 h-4" />
                Poids aléatoires
              </button>
            </div>
          </div>

          {/* Scale Controls */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Mise à l'échelle</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300 w-20">Activations:</span>
                <button
                  onClick={() => handleScaleActivations(0.8)}
                  className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  ×0.8
                </button>
                <button
                  onClick={() => handleScaleActivations(1.2)}
                  className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs"
                >
                  ×1.2
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300 w-20">Poids:</span>
                <button
                  onClick={() => handleScaleWeights(0.8)}
                  className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  ×0.8
                </button>
                <button
                  onClick={() => handleScaleWeights(1.2)}
                  className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs"
                >
                  ×1.2
                </button>
              </div>
            </div>
          </div>

          {/* Learning Rate */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Paramètres</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300 w-24">Taux d'apprentissage:</span>
              <input
                type="number"
                min="0.0001"
                max="1"
                step="0.0001"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="flex-1 bg-dark-200 border border-dark-300 rounded px-2 py-1 text-white text-sm focus:border-neural-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Gestion des données</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Exporter
              </button>
              <label className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                Importer
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={onResetNetwork}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser le réseau
          </button>

          {/* Network Stats */}
          <div className="bg-dark-200 rounded p-3">
            <h4 className="text-sm font-medium text-white mb-2">Statistiques</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-400">Total neurones:</div>
                <div className="text-white font-semibold">
                  {networkData?.layers?.reduce((sum, layer) => sum + layer.neurons.length, 0) || 0}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Total connexions:</div>
                <div className="text-white font-semibold">
                  {networkData?.connections?.length || 0}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Poids moyen:</div>
                <div className="text-white font-semibold">
                  {networkData?.connections?.length > 0 
                    ? (networkData.connections.reduce((sum, c) => sum + Math.abs(c.weight), 0) / networkData.connections.length).toFixed(3)
                    : '0.000'
                  }
                </div>
              </div>
              <div>
                <div className="text-gray-400">Activation moy.:</div>
                <div className="text-white font-semibold">
                  {networkData?.layers?.length > 0 
                    ? (networkData.layers.flatMap(l => l.neurons).reduce((sum, n) => sum + n.activation, 0) / 
                       networkData.layers.flatMap(l => l.neurons).length).toFixed(3)
                    : '0.000'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkControls;
