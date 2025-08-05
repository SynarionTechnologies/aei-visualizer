// Mock neural network data structure
export const generateMockNetwork = () => {
  return {
    id: "network_001",
    name: "AEIF Neural Network",
    layers: [
      {
        id: "input",
        type: "input",
        name: "Input Layer",
        position: { x: -4, y: 0, z: 0 },
        neurons: [
          { id: 1, activation: 0.8, position: { x: -4, y: 2, z: 0 }, label: "Input 1" },
          { id: 2, activation: 0.6, position: { x: -4, y: 0.5, z: 0 }, label: "Input 2" },
          { id: 3, activation: 0.9, position: { x: -4, y: -1, z: 0 }, label: "Input 3" },
          { id: 4, activation: 0.3, position: { x: -4, y: -2.5, z: 0 }, label: "Input 4" }
        ]
      },
      {
        id: "hidden1",
        type: "hidden",
        name: "Hidden Layer 1",
        position: { x: -1, y: 0, z: 0 },
        neurons: [
          { id: 5, activation: 0.7, position: { x: -1, y: 3, z: 0 }, label: "Hidden 1.1" },
          { id: 6, activation: 0.4, position: { x: -1, y: 1.5, z: 0 }, label: "Hidden 1.2" },
          { id: 7, activation: 0.85, position: { x: -1, y: 0, z: 0 }, label: "Hidden 1.3" },
          { id: 8, activation: 0.2, position: { x: -1, y: -1.5, z: 0 }, label: "Hidden 1.4" },
          { id: 9, activation: 0.65, position: { x: -1, y: -3, z: 0 }, label: "Hidden 1.5" }
        ]
      },
      {
        id: "hidden2",
        type: "hidden",
        name: "Hidden Layer 2",
        position: { x: 2, y: 0, z: 0 },
        neurons: [
          { id: 10, activation: 0.55, position: { x: 2, y: 2, z: 0 }, label: "Hidden 2.1" },
          { id: 11, activation: 0.78, position: { x: 2, y: 0.5, z: 0 }, label: "Hidden 2.2" },
          { id: 12, activation: 0.35, position: { x: 2, y: -1, z: 0 }, label: "Hidden 2.3" },
          { id: 13, activation: 0.92, position: { x: 2, y: -2.5, z: 0 }, label: "Hidden 2.4" }
        ]
      },
      {
        id: "output",
        type: "output",
        name: "Output Layer",
        position: { x: 5, y: 0, z: 0 },
        neurons: [
          { id: 14, activation: 0.82, position: { x: 5, y: 1, z: 0 }, label: "Output 1" },
          { id: 15, activation: 0.15, position: { x: 5, y: -1, z: 0 }, label: "Output 2" }
        ]
      }
    ],
    connections: [
      // Input to Hidden 1
      { id: "c1", from: 1, to: 5, weight: 0.7, strength: 0.7 },
      { id: "c2", from: 1, to: 6, weight: -0.3, strength: 0.3 },
      { id: "c3", from: 1, to: 7, weight: 0.8, strength: 0.8 },
      { id: "c4", from: 1, to: 8, weight: 0.2, strength: 0.2 },
      { id: "c5", from: 1, to: 9, weight: -0.5, strength: 0.5 },
      
      { id: "c6", from: 2, to: 5, weight: 0.4, strength: 0.4 },
      { id: "c7", from: 2, to: 6, weight: 0.9, strength: 0.9 },
      { id: "c8", from: 2, to: 7, weight: -0.2, strength: 0.2 },
      { id: "c9", from: 2, to: 8, weight: 0.6, strength: 0.6 },
      { id: "c10", from: 2, to: 9, weight: 0.1, strength: 0.1 },
      
      { id: "c11", from: 3, to: 5, weight: -0.4, strength: 0.4 },
      { id: "c12", from: 3, to: 6, weight: 0.7, strength: 0.7 },
      { id: "c13", from: 3, to: 7, weight: 0.5, strength: 0.5 },
      { id: "c14", from: 3, to: 8, weight: -0.8, strength: 0.8 },
      { id: "c15", from: 3, to: 9, weight: 0.3, strength: 0.3 },
      
      { id: "c16", from: 4, to: 5, weight: 0.6, strength: 0.6 },
      { id: "c17", from: 4, to: 6, weight: -0.1, strength: 0.1 },
      { id: "c18", from: 4, to: 7, weight: 0.4, strength: 0.4 },
      { id: "c19", from: 4, to: 8, weight: 0.9, strength: 0.9 },
      { id: "c20", from: 4, to: 9, weight: -0.7, strength: 0.7 },
      
      // Hidden 1 to Hidden 2
      { id: "c21", from: 5, to: 10, weight: 0.5, strength: 0.5 },
      { id: "c22", from: 5, to: 11, weight: -0.3, strength: 0.3 },
      { id: "c23", from: 5, to: 12, weight: 0.8, strength: 0.8 },
      { id: "c24", from: 5, to: 13, weight: 0.2, strength: 0.2 },
      
      { id: "c25", from: 6, to: 10, weight: 0.7, strength: 0.7 },
      { id: "c26", from: 6, to: 11, weight: 0.4, strength: 0.4 },
      { id: "c27", from: 6, to: 12, weight: -0.6, strength: 0.6 },
      { id: "c28", from: 6, to: 13, weight: 0.9, strength: 0.9 },
      
      { id: "c29", from: 7, to: 10, weight: -0.2, strength: 0.2 },
      { id: "c30", from: 7, to: 11, weight: 0.8, strength: 0.8 },
      { id: "c31", from: 7, to: 12, weight: 0.3, strength: 0.3 },
      { id: "c32", from: 7, to: 13, weight: -0.5, strength: 0.5 },
      
      { id: "c33", from: 8, to: 10, weight: 0.6, strength: 0.6 },
      { id: "c34", from: 8, to: 11, weight: -0.4, strength: 0.4 },
      { id: "c35", from: 8, to: 12, weight: 0.7, strength: 0.7 },
      { id: "c36", from: 8, to: 13, weight: 0.1, strength: 0.1 },
      
      { id: "c37", from: 9, to: 10, weight: -0.7, strength: 0.7 },
      { id: "c38", from: 9, to: 11, weight: 0.5, strength: 0.5 },
      { id: "c39", from: 9, to: 12, weight: -0.2, strength: 0.2 },
      { id: "c40", from: 9, to: 13, weight: 0.8, strength: 0.8 },
      
      // Hidden 2 to Output
      { id: "c41", from: 10, to: 14, weight: 0.7, strength: 0.7 },
      { id: "c42", from: 10, to: 15, weight: -0.4, strength: 0.4 },
      { id: "c43", from: 11, to: 14, weight: 0.8, strength: 0.8 },
      { id: "c44", from: 11, to: 15, weight: 0.2, strength: 0.2 },
      { id: "c45", from: 12, to: 14, weight: -0.3, strength: 0.3 },
      { id: "c46", from: 12, to: 15, weight: 0.9, strength: 0.9 },
      { id: "c47", from: 13, to: 14, weight: 0.6, strength: 0.6 },
      { id: "c48", from: 13, to: 15, weight: -0.7, strength: 0.7 }
    ],
    metadata: {
      accuracy: 0.89,
      loss: 0.15,
      epoch: 150,
      learningRate: 0.001,
      lastUpdated: new Date().toISOString()
    }
  };
};

// Mock API functions
export const mockApi = {
  // Simulate fetching network data
  fetchNetwork: async (networkId = "network_001") => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockNetwork());
      }, 300); // Simulate network delay
    });
  },
  
  // Simulate stepping the network (forward pass)
  stepNetwork: async (networkId = "network_001") => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const network = generateMockNetwork();
        // Randomize activations to simulate network step
        network.layers.forEach(layer => {
          layer.neurons.forEach(neuron => {
            neuron.activation = Math.random();
          });
        });
        network.metadata.lastUpdated = new Date().toISOString();
        resolve(network);
      }, 500);
    });
  },
  
  // Simulate getting neuron details
  getNeuronDetails: async (neuronId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const network = generateMockNetwork();
        const neuron = network.layers
          .flatMap(layer => layer.neurons)
          .find(n => n.id === neuronId);
        
        if (neuron) {
          resolve({
            ...neuron,
            details: {
              bias: (Math.random() - 0.5) * 2,
              gradient: (Math.random() - 0.5) * 0.1,
              lastActivation: neuron.activation,
              activationFunction: "ReLU",
              inputSum: Math.random() * 2 - 1
            }
          });
        } else {
          resolve(null);
        }
      }, 200);
    });
  },
  
  // Simulate getting connection details
  getConnectionDetails: async (connectionId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const network = generateMockNetwork();
        const connection = network.connections.find(c => c.id === connectionId);
        
        if (connection) {
          resolve({
            ...connection,
            details: {
              gradient: (Math.random() - 0.5) * 0.01,
              lastUpdate: (Math.random() - 0.5) * 0.001,
              learningRate: 0.001,
              momentum: Math.random() * 0.1
            }
          });
        } else {
          resolve(null);
        }
      }, 200);
    });
  }
};

// Utility functions
export const getNeuronById = (network, neuronId) => {
  return network.layers
    .flatMap(layer => layer.neurons)
    .find(neuron => neuron.id === neuronId);
};

export const getConnectionsByNeuron = (network, neuronId) => {
  return network.connections.filter(
    conn => conn.from === neuronId || conn.to === neuronId
  );
};

export const getLayerColors = () => ({
  input: "#10b981",     // green
  hidden: "#3b82f6",    // blue  
  output: "#f59e0b"     // amber
});
