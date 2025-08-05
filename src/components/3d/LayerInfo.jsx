import React from 'react';
import { getLayerColors } from '../../data/mockApi';

const LayerInfo = ({ layers, selectedNeuron, onNeuronSelect }) => {
  const layerColors = getLayerColors();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Network Layers</h3>
      
      {layers?.map((layer) => (
        <div key={layer.id} className="bg-dark-100 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: layerColors[layer.type] }}
            />
            <h4 className="font-medium text-white">{layer.name}</h4>
            <span className="text-sm text-gray-400">
              ({layer.neurons.length} neurons)
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {layer.neurons.map((neuron) => (
              <div
                key={neuron.id}
                className={`
                  p-2 rounded cursor-pointer transition-all duration-200
                  ${selectedNeuron?.id === neuron.id 
                    ? 'bg-neural-500 text-white' 
                    : 'bg-dark-200 hover:bg-dark-300 text-gray-300'
                  }
                `}
                onClick={() => onNeuronSelect?.(neuron)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{neuron.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-dark-400 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${neuron.activation * 100}%`,
                          backgroundColor: layerColors[layer.type]
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 min-w-[3rem]">
                      {neuron.activation.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Layer statistics */}
          <div className="mt-3 pt-3 border-t border-dark-300">
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
              <div>
                <span>Avg Activation:</span>
                <span className="ml-2 text-white">
                  {(layer.neurons.reduce((sum, n) => sum + n.activation, 0) / layer.neurons.length).toFixed(3)}
                </span>
              </div>
              <div>
                <span>Max Activation:</span>
                <span className="ml-2 text-white">
                  {Math.max(...layer.neurons.map(n => n.activation)).toFixed(3)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LayerInfo;
