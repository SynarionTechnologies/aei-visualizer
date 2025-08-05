import React from 'react';
import { Brain, Wifi, WifiOff } from 'lucide-react';

const Header = ({ 
  networkData, 
  isConnected = true,
  lastUpdated 
}) => {
  return (
    <header className="bg-dark-50 border-b border-dark-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-neural-500" />
            <div>
              <h1 className="text-lg font-semibold text-white">
                {networkData?.name || 'Réseau de Neurones AEIF'}
              </h1>
              <p className="text-sm text-gray-400">
                Tableau de Bord de Visualisation 3D Interactif
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Network Status */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Connecté' : 'Déconnecté'}
            </span>
          </div>

          {/* Last Updated */}
          {lastUpdated && (
            <div className="text-sm text-gray-400">
              Dernière mise à jour: {new Date(lastUpdated).toLocaleTimeString('fr-FR')}
            </div>
          )}

          {/* Network ID */}
          {networkData?.id && (
            <div className="text-sm text-gray-400">
              ID: {networkData.id}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
