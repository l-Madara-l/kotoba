import React from 'react';
import { 
  Home, 
  Map, 
  PenTool, 
  BookOpen, 
  ScrollText, 
  Headphones, 
  MessageSquare, 
  Gamepad2, 
  Library, 
  Compass, 
  Calendar, 
  Search, 
  Award, 
  Settings,
  X,
  Star
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard'
  | 'learning-path'
  | 'writing-lab'
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'conversation'
  | 'games'
  | 'reading'
  | 'culture'
  | 'planner'
  | 'dictionary'
  | 'favorites'
  | 'progress'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  dueSRSCount?: number;
  favoritesCount?: number;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  labelJp: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
  dueSRSCount = 0,
  favoritesCount = 0
}) => {
  const studyItems: NavItem[] = [
    { id: 'dashboard', label: 'Panel Principal', labelJp: 'ダッシュボード', icon: Home },
    { id: 'learning-path', label: 'Ruta de Aprendizaje', labelJp: '学習ロードマップ', icon: Map },
    { id: 'writing-lab', label: 'Laboratorio de Escritura', labelJp: '書道・文字ラボ', icon: PenTool },
    { id: 'vocabulary', label: 'Vocabulario & SRS', labelJp: '単語・復習', icon: BookOpen, badge: dueSRSCount },
    { id: 'grammar', label: 'Academia de Gramática', labelJp: '文法アカデミー', icon: ScrollText },
    { id: 'listening', label: 'Audio & Dictado', labelJp: 'リスニング・聞き取り', icon: Headphones },
    { id: 'conversation', label: 'Simulador Conversación', labelJp: '会話シミュレーター', icon: MessageSquare }
  ];

  const exploreItems: NavItem[] = [
    { id: 'favorites', label: 'Favoritos & Guardados', labelJp: 'お気に入り', icon: Star, badge: favoritesCount },
    { id: 'games', label: 'Actividades & Minijuegos', labelJp: 'ゲームと練習', icon: Gamepad2 },
    { id: 'reading', label: 'Historias & Lectura', labelJp: '多読ライブラリ', icon: Library },
    { id: 'culture', label: 'Cultura Japonesa', labelJp: '日本文化と礼儀', icon: Compass },
    { id: 'planner', label: 'Planificador Inteligente', labelJp: '学習プランナー', icon: Calendar },
    { id: 'dictionary', label: 'Diccionario JP-ES', labelJp: '和西辞典', icon: Search },
    { id: 'progress', label: 'Progreso & Hanko', labelJp: '達成・成績', icon: Award },
    { id: 'settings', label: 'Ajustes & Datos', labelJp: '設定', icon: Settings }
  ];

  const handleSelect = (tab: ActiveTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-sumi/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 border-r border-piedra/60 bg-marfil dark:bg-[#181B19] flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header inside sidebar */}
        <div className="h-16 px-6 border-b border-piedra/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-xl text-torii dark:text-torii-dark">
              言
            </span>
            <div className="leading-tight">
              <span className="font-serif font-bold text-base text-sumi dark:text-washi tracking-wide">
                KOTOBA
              </span>
              <span className="block text-[10px] text-sumi/60 dark:text-washi/60">
                日本語アカデミー
              </span>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-md text-sumi/60 dark:text-washi/60 hover:text-torii lg:hidden"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Study Section */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-sumi/50 dark:text-washi/50 tracking-wider uppercase">
                Estudio & Práctica
              </span>
              <span className="text-[10px] font-serif text-torii/80">学習</span>
            </div>
            <nav className="space-y-1">
              {studyItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-torii text-marfil shadow-sm dark:bg-torii-dark'
                        : 'text-sumi/80 dark:text-washi/80 hover:bg-washi/70 dark:hover:bg-[#232724] hover:text-torii'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        size={17}
                        className={isActive ? 'text-marfil' : 'text-sumi/60 dark:text-washi/60 group-hover:text-torii'}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge !== undefined && item.badge > 0 && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive
                              ? 'bg-marfil text-torii'
                              : 'bg-torii text-marfil dark:bg-torii-dark'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <span className={`text-[10px] font-serif opacity-50 ${isActive ? 'text-marfil' : ''}`}>
                        {item.labelJp}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Exploration & Tools Section */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-sumi/50 dark:text-washi/50 tracking-wider uppercase">
                Inmersión & Recursos
              </span>
              <span className="text-[10px] font-serif text-musgo/80">探索</span>
            </div>
            <nav className="space-y-1">
              {exploreItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-torii text-marfil shadow-sm dark:bg-torii-dark'
                        : 'text-sumi/80 dark:text-washi/80 hover:bg-washi/70 dark:hover:bg-[#232724] hover:text-torii'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        size={17}
                        className={isActive ? 'text-marfil' : 'text-sumi/60 dark:text-washi/60 group-hover:text-torii'}
                      />
                      <span>{item.label}</span>
                    </div>

                    <span className={`text-[10px] font-serif opacity-50 ${isActive ? 'text-marfil' : ''}`}>
                      {item.labelJp}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Traditional Washi Footer Quote */}
        <div className="p-4 border-t border-piedra/60 bg-washi/40 dark:bg-[#1f2320] text-center">
          <p className="text-[11px] font-serif italic text-sumi/70 dark:text-washi/70">
            「継続は力なり」
          </p>
          <span className="text-[10px] text-sumi/50 dark:text-washi/50 block mt-0.5">
            La constancia es poder.
          </span>
        </div>
      </aside>
    </>
  );
};
