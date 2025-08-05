import React, { useState } from 'react';
import { HelpCircle, X, Keyboard, Mouse, Eye } from 'lucide-react';

const NavigationHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { category: 'Navigation 3D', icon: <Mouse className="w-4 h-4" />, items: [
      { action: 'Rotation', keys: 'Clic gauche + glisser' },
      { action: 'Pan/Déplacement', keys: 'Clic droit + glisser' },
      { action: 'Zoom', keys: 'Molette souris' },
      { action: 'Sélectionner', keys: 'Clic gauche sur objet' },
    ]},
    { category: 'Raccourcis clavier', icon: <Keyboard className="w-4 h-4" />, items: [
      { action: 'Déplacer avant', keys: 'W ou ↑' },
      { action: 'Déplacer arrière', keys: 'S ou ↓' },
      { action: 'Déplacer gauche', keys: 'A ou ←' },
      { action: 'Déplacer droite', keys: 'D ou →' },
      { action: 'Monter', keys: 'Espace' },
      { action: 'Course rapide', keys: 'Shift' },
    ]},
    { category: 'Visualisation', icon: <Eye className="w-4 h-4" />, items: [
      { action: 'Neurones verts', keys: 'Couche d\'entrée' },
      { action: 'Neurones bleus', keys: 'Couches cachées' },
      { action: 'Neurones ambrés', keys: 'Couche de sortie' },
      { action: 'Lignes vertes', keys: 'Poids positifs' },
      { action: 'Lignes rouges', keys: 'Poids négatifs' },
    ]},
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-neural-600 hover:bg-neural-500 text-white p-3 rounded-full shadow-lg transition-colors z-50"
        title="Aide à la navigation"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-100 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-dark-300">
          <h2 className="text-xl font-semibold text-white">Guide de Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {shortcuts.map((category, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-2">
                {category.icon}
                <h3 className="text-lg font-medium text-white">{category.category}</h3>
              </div>
              
              <div className="grid gap-2">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex justify-between items-center py-2 px-3 bg-dark-200 rounded">
                    <span className="text-gray-300">{item.action}</span>
                    <kbd className="bg-dark-400 text-white px-2 py-1 rounded text-sm font-mono">
                      {item.keys}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="bg-neural-500/10 border border-neural-500/30 rounded p-4">
            <h4 className="text-white font-medium mb-2">💡 Conseils</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Utilisez la molette pour zoomer rapidement</li>
              <li>• Maintenez Shift pour des mouvements plus rapides</li>
              <li>• Double-clic sur un neurone pour le centrer</li>
              <li>• Utilisez le mode édition pour modifier les paramètres</li>
              <li>• Les connexions s'animent selon l'intensité du signal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationHelp;
