import React from 'react';
import { Home, Map, PenTool, BookOpen, MoreHorizontal } from 'lucide-react';
import { ActiveTab } from './Sidebar';

interface MobileNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMore: () => void;
  dueSRSCount?: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMore,
  dueSRSCount = 0
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 h-16 border-t border-piedra/70 bg-marfil/95 dark:bg-[#181B19]/95 backdrop-blur-md flex items-center justify-around px-2 lg:hidden transition-colors">
      <button
        onClick={() => onSelectTab('dashboard')}
        className={`flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors ${
          activeTab === 'dashboard'
            ? 'text-torii dark:text-torii-dark font-semibold'
            : 'text-sumi/60 dark:text-washi/60'
        }`}
      >
        <Home size={18} />
        <span className="text-[10px] mt-1">Inicio</span>
      </button>

      <button
        onClick={() => onSelectTab('learning-path')}
        className={`flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors ${
          activeTab === 'learning-path'
            ? 'text-torii dark:text-torii-dark font-semibold'
            : 'text-sumi/60 dark:text-washi/60'
        }`}
      >
        <Map size={18} />
        <span className="text-[10px] mt-1">Ruta</span>
      </button>

      <button
        onClick={() => onSelectTab('writing-lab')}
        className={`flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors ${
          activeTab === 'writing-lab'
            ? 'text-torii dark:text-torii-dark font-semibold'
            : 'text-sumi/60 dark:text-washi/60'
        }`}
      >
        <PenTool size={18} />
        <span className="text-[10px] mt-1">Trazos</span>
      </button>

      <button
        onClick={() => onSelectTab('vocabulary')}
        className={`relative flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors ${
          activeTab === 'vocabulary'
            ? 'text-torii dark:text-torii-dark font-semibold'
            : 'text-sumi/60 dark:text-washi/60'
        }`}
      >
        <BookOpen size={18} />
        <span className="text-[10px] mt-1">Vocabulario</span>
        {dueSRSCount > 0 && (
          <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-torii text-marfil text-[9px] flex items-center justify-center font-bold">
            {dueSRSCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenMore}
        className="flex flex-col items-center justify-center flex-1 py-1 text-xs text-sumi/60 dark:text-washi/60 hover:text-torii"
      >
        <MoreHorizontal size={18} />
        <span className="text-[10px] mt-1">Más</span>
      </button>
    </nav>
  );
};
