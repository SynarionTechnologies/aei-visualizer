import React from 'react';
import { Brain } from 'lucide-react';

const Loading = ({ message = "Loading neural network..." }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-dark-50 to-dark-100">
      <div className="text-center">
        <Brain className="w-16 h-16 text-neural-500 mx-auto mb-4 animate-pulse" />
        <div className="text-white text-lg font-medium mb-2">AEIF Visualizer</div>
        <div className="text-gray-400 text-sm">{message}</div>
        
        {/* Animated dots */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-neural-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-neural-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-neural-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
