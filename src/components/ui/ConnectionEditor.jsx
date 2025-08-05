import React, { useState, useEffect } from 'react';
import { Zap, Save, X, RotateCcw } from 'lucide-react';

const ConnectionEditor = ({ 
  connection, 
  networkData,
  onSave, 
  onCancel, 
  onDelete 
}) => {
  const [editedConnection, setEditedConnection] = useState(connection);
  const [originalConnection, setOriginalConnection] = useState(connection);

  useEffect(() => {
    setEditedConnection(connection);
    setOriginalConnection(connection);
  }, [connection]);

  // Find neuron details
  const fromNeuron = networkData?.layers
    ?.flatMap(l => l.neurons)
    ?.find(n => n.id === connection.from);
  
  const toNeuron = networkData?.layers
    ?.flatMap(l => l.neurons)
    ?.find(n => n.id === connection.to);

  const handleSave = () => {
    onSave(editedConnection);
  };

  const handleReset = () => {
    setEditedConnection(originalConnection);
  };

  const handleInputChange = (field, value) => {
    setEditedConnection(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getWeightColor = (weight) => {
    if (weight > 0) return 'text-green-400';
    if (weight < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getStrengthBar = (strength) => {
    return (
      <div className="w-full bg-dark-400 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-300 bg-neural-500"
          style={{ width: `${Math.abs(strength) * 100}%` }}
        />
      </div>
    );
  };

  return (
    <div className="bg-dark-100 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-neural-500" />
          <h3 className="text-lg font-semibold text-white">Éditeur de Connexion</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="border border-neural-500/30 bg-neural-500/10 rounded-lg p-3">
        <div className="text-sm font-medium text-white mb-3">
          Connexion ID: {connection.id}
        </div>
        
        {/* Connection Path */}
        <div className="bg-dark-200 rounded p-3 mb-4">
          <div className="text-sm text-gray-300 mb-2">Chemin de connexion</div>
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-green-600 text-white px-2 py-1 rounded">
              {fromNeuron?.label || `Neurone ${connection.from}`}
            </div>
            <span className="text-gray-400">→</span>
            <div className="bg-amber-600 text-white px-2 py-1 rounded">
              {toNeuron?.label || `Neurone ${connection.to}`}
            </div>
          </div>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">
            Poids: <span className={getWeightColor(editedConnection.weight)}>
              {editedConnection.weight.toFixed(4)}
            </span>
          </label>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.001"
            value={editedConnection.weight}
            onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
            className="w-full accent-neural-500"
          />
          <input
            type="number"
            min="-1"
            max="1"
            step="0.001"
            value={editedConnection.weight}
            onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
            className="w-full bg-dark-200 border border-dark-300 rounded px-3 py-2 text-white text-sm focus:border-neural-500 focus:outline-none"
          />
        </div>

        {/* Strength */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">
            Force: {editedConnection.strength?.toFixed(3) || Math.abs(editedConnection.weight).toFixed(3)}
          </label>
          {getStrengthBar(editedConnection.strength || Math.abs(editedConnection.weight))}
        </div>

        {/* Advanced Properties */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Propriétés avancées</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Gradient</div>
              <div className="text-white font-mono">
                {((Math.random() - 0.5) * 0.01).toFixed(6)}
              </div>
            </div>
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Momentum</div>
              <div className="text-white font-mono">
                {(Math.random() * 0.1).toFixed(4)}
              </div>
            </div>
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Taux d'apprentissage</div>
              <div className="text-white font-mono">0.001</div>
            </div>
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Dernière MAJ</div>
              <div className="text-white font-mono">
                {((Math.random() - 0.5) * 0.001).toFixed(6)}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Properties */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Propriétés visuelles</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Type</div>
              <div className="text-white">
                {editedConnection.weight >= 0 ? 'Excitateur' : 'Inhibiteur'}
              </div>
            </div>
            <div className="bg-dark-200 rounded p-2">
              <div className="text-gray-400">Intensité</div>
              <div className="text-white">
                {Math.abs(editedConnection.weight) > 0.7 ? 'Forte' : 
                 Math.abs(editedConnection.weight) > 0.3 ? 'Moyenne' : 'Faible'}
              </div>
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
            onClick={() => onDelete(connection.id)}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionEditor;
