import React, { useState, useEffect } from 'react';
import { Brain, Save, X, RotateCcw } from 'lucide-react';

const NeuronEditor = ({ 
  neuron, 
  onSave, 
  onCancel, 
  onDelete,
  layerType 
}) => {
  const [editedNeuron, setEditedNeuron] = useState(neuron);
  const [originalNeuron, setOriginalNeuron] = useState(neuron);

  useEffect(() => {
    setEditedNeuron(neuron);
    setOriginalNeuron(neuron);
  }, [neuron]);

  const handleSave = () => {
    onSave(editedNeuron);
  };

  const handleReset = () => {
    setEditedNeuron(originalNeuron);
  };

  const handleInputChange = (field, value) => {
    setEditedNeuron(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePositionChange = (axis, value) => {
    setEditedNeuron(prev => ({
      ...prev,
      position: {
        ...prev.position,
        [axis]: parseFloat(value) || 0
      }
    }));
  };

  const getColorForLayerType = (type) => {
    const colors = {
      input: 'border-green-500 bg-green-500/10',
      hidden: 'border-blue-500 bg-blue-500/10', 
      output: 'border-amber-500 bg-amber-500/10'
    };
    return colors[type] || colors.hidden;
  };

  return (
    <div className="bg-dark-100 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-neural-500" />
          <h3 className="text-lg font-semibold text-white">Éditeur de Neurone</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className={`border rounded-lg p-3 ${getColorForLayerType(layerType)}`}>
        <div className="text-sm font-medium text-white mb-2">
          Neurone ID: {neuron.id} ({layerType})
        </div>
        
        {/* Label */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Libellé</label>
          <input
            type="text"
            value={editedNeuron.label || ''}
            onChange={(e) => handleInputChange('label', e.target.value)}
            className="w-full bg-dark-200 border border-dark-300 rounded px-3 py-2 text-white text-sm focus:border-neural-500 focus:outline-none"
            placeholder="Nom du neurone"
          />
        </div>

        {/* Activation */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">
            Activation: {editedNeuron.activation.toFixed(3)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={editedNeuron.activation}
            onChange={(e) => handleInputChange('activation', parseFloat(e.target.value))}
            className="w-full accent-neural-500"
          />
          <input
            type="number"
            min="0"
            max="1"
            step="0.001"
            value={editedNeuron.activation}
            onChange={(e) => handleInputChange('activation', parseFloat(e.target.value) || 0)}
            className="w-full bg-dark-200 border border-dark-300 rounded px-3 py-2 text-white text-sm focus:border-neural-500 focus:outline-none"
          />
        </div>

        {/* Position */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Position 3D</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-400">X</label>
              <input
                type="number"
                step="0.1"
                value={editedNeuron.position.x}
                onChange={(e) => handlePositionChange('x', e.target.value)}
                className="w-full bg-dark-200 border border-dark-300 rounded px-2 py-1 text-white text-sm focus:border-neural-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Y</label>
              <input
                type="number"
                step="0.1"
                value={editedNeuron.position.y}
                onChange={(e) => handlePositionChange('y', e.target.value)}
                className="w-full bg-dark-200 border border-dark-300 rounded px-2 py-1 text-white text-sm focus:border-neural-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Z</label>
              <input
                type="number"
                step="0.1"
                value={editedNeuron.position.z}
                onChange={(e) => handlePositionChange('z', e.target.value)}
                className="w-full bg-dark-200 border border-dark-300 rounded px-2 py-1 text-white text-sm focus:border-neural-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Properties simulation */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Propriétés avancées</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Biais</div>
              <div className="text-white font-mono">
                {((Math.random() - 0.5) * 2).toFixed(4)}
              </div>
            </div>
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Gradient</div>
              <div className="text-white font-mono">
                {((Math.random() - 0.5) * 0.1).toFixed(6)}
              </div>
            </div>
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Somme d'entrée</div>
              <div className="text-white font-mono">
                {(Math.random() * 2 - 1).toFixed(4)}
              </div>
            </div>
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Fonction</div>
              <div className="text-white">ReLU</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded transition-colors"
        >
          <Save className="w-4 h-4" />
          Sauvegarder
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-dark-200 hover:bg-dark-300 text-white px-3 py-2 rounded transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        {onDelete && (
          <button
            onClick={() => onDelete(neuron.id)}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NeuronEditor;
