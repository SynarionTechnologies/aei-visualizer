import React from 'react';
import { Brain, Zap, Info } from 'lucide-react';

const FloatingInfo = ({ 
  neuron, 
  connection, 
  position = { x: 0, y: 0 },
  networkData 
}) => {
  if (!neuron && !connection) return null;

  const style = {
    position: 'fixed',
    left: position.x + 10,
    top: position.y - 10,
    zIndex: 1000,
    transform: 'translateY(-100%)',
    pointerEvents: 'none'
  };

  if (neuron) {
    const layer = networkData?.layers?.find(l => 
      l.neurons.some(n => n.id === neuron.id)
    );

    return (
      <div style={style} className="bg-dark-100 border border-dark-300 rounded-lg p-3 shadow-xl max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-neural-500" />
          <span className="text-white font-medium text-sm">{neuron.label}</span>
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-white capitalize">{layer?.type || 'Unknown'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">ID:</span>
            <span className="text-white">{neuron.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Activation:</span>
            <span className="text-white font-mono">{neuron.activation.toFixed(3)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Position:</span>
            <span className="text-white font-mono text-xs">
              ({neuron.position.x.toFixed(1)}, {neuron.position.y.toFixed(1)}, {neuron.position.z.toFixed(1)})
            </span>
          </div>
        </div>
        
        {/* Activation bar */}
        <div className="mt-2">
          <div className="w-full bg-dark-400 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${neuron.activation * 100}%`,
                backgroundColor: layer?.type === 'input' ? '#10b981' : 
                                layer?.type === 'output' ? '#f59e0b' : '#3b82f6'
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (connection) {
    const fromNeuron = networkData?.layers
      ?.flatMap(l => l.neurons)
      ?.find(n => n.id === connection.from);
    
    const toNeuron = networkData?.layers
      ?.flatMap(l => l.neurons)
      ?.find(n => n.id === connection.to);

    return (
      <div style={style} className="bg-dark-100 border border-dark-300 rounded-lg p-3 shadow-xl max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-neural-500" />
          <span className="text-white font-medium text-sm">Connexion {connection.id}</span>
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">De:</span>
            <span className="text-white">{fromNeuron?.label || `N${connection.from}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Vers:</span>
            <span className="text-white">{toNeuron?.label || `N${connection.to}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Poids:</span>
            <span className={`font-mono ${connection.weight >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {connection.weight.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Force:</span>
            <span className="text-white font-mono">{connection.strength?.toFixed(3) || Math.abs(connection.weight).toFixed(3)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className={connection.weight >= 0 ? 'text-green-400' : 'text-red-400'}>
              {connection.weight >= 0 ? 'Excitateur' : 'Inhibiteur'}
            </span>
          </div>
        </div>
        
        {/* Weight strength bar */}
        <div className="mt-2">
          <div className="w-full bg-dark-400 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.abs(connection.weight) * 100}%`,
                backgroundColor: connection.weight >= 0 ? '#22c55e' : '#ef4444'
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FloatingInfo;
