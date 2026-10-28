import React from 'react';
import { Flame, Moon, Sun, BookOpen, Volume2, Sparkles, Menu, Star } from 'lucide-react';
import { UserProfile } from '../../types';

interface NavbarProps {
  profile: UserProfile;
  onUpdatePreferences: (updated: Partial<UserProfile['preferences']>) => void;
  onOpenMobileMenu?: () => void;
  dueSRSCount: number;
  onOpenSRSReviews: () => void;
  onOpenFavorites?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onUpdatePreferences,
  onOpenMobileMenu,
  dueSRSCount,
  onOpenSRSReviews,
  onOpenFavorites
}) => {
  const isDark = profile.preferences.theme === 'dark';

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    onUpdatePreferences({ theme: nextTheme });
  };

  const toggleRomaji = () => {
    onUpdatePreferences({ showRomaji: !profile.preferences.showRomaji });
  };

  const toggleFurigana = () => {
    onUpdatePreferences({ showFurigana: !profile.preferences.showFurigana });
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-piedra/60 bg-marfil/90 dark:bg-[#181B19]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded-lg border border-piedra text-sumi dark:text-washi lg:hidden hover:bg-washi transition-colors"
            aria-label="Abrir menú de navegación"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="flex items-center gap-2">
          {/* Stylized Torii icon */}
          <div className="w-8 h-8 rounded-md bg-torii flex items-center justify-center text-marfil font-serif font-bold text-sm shadow-sm select-none">
            言
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-lg tracking-wider text-sumi dark:text-washi">
                KOTOBA
              </span>
              <span className="text-xs font-serif text-torii dark:text-torii-dark font-medium">
                言葉
              </span>
            </div>
            <p className="text-[10px] text-sumi/60 dark:text-washi/60 hidden sm:block -mt-1 font-sans">
              Aprende. Piensa. Vive el japonés.
            </p>
          </div>
        </div>
      </div>

      {/* Center / Right widgets */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* SRS Reviews pill */}
        {dueSRSCount > 0 && (
          <button
            onClick={onOpenSRSReviews}
            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-torii text-marfil hover:bg-torii-hover flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 animate-pulse"
          >
            <Sparkles size={13} />
            <span className="hidden xs:inline">Repasos:</span>
            <span>{dueSRSCount}</span>
          </button>
        )}

        {/* Streak Flame */}
        <div 
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-piedra/60 bg-washi/70 dark:bg-[#232724] text-xs font-medium text-sumi dark:text-washi"
          title={`${profile.streakDays} días consecutivos de estudio`}
        >
          <Flame size={15} className="text-[#E05A47] fill-[#E05A47]" />
          <span>{profile.streakDays}</span>
          <span className="text-[10px] text-sumi/60 dark:text-washi/60 hidden md:inline">días</span>
        </div>

        {/* XP & Level */}
        <div 
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-oro/40 bg-oro/10 text-xs font-semibold text-oro dark:text-oro/90"
          title={`Nivel ${profile.level} - ${profile.xp} XP acumulados`}
        >
          <span>Nv.{profile.level}</span>
          <span className="text-[10px] opacity-80">({profile.xp} XP)</span>
        </div>

        {/* Favorites Quick Button */}
        {onOpenFavorites && (
          <button
            onClick={onOpenFavorites}
            aria-label="Ver elementos favoritos y guardados"
            title={`${profile.favorites?.length || 0} elementos guardados en favoritos`}
            className="p-2 rounded-full border border-piedra/60 text-oro hover:bg-oro/10 transition-colors relative"
          >
            <Star size={16} className={(profile.favorites?.length || 0) > 0 ? "fill-oro text-oro" : "text-sumi/60 dark:text-washi/60"} />
            {(profile.favorites?.length || 0) > 0 && (
              <span className="absolute -top-1 -right-1 px-1 min-w-[16px] h-4 text-[9px] font-bold rounded-full bg-torii text-marfil flex items-center justify-center">
                {profile.favorites.length}
              </span>
            )}
          </button>
        )}

        {/* Quick toggles (Romaji & Furigana) */}
        <div className="hidden md:flex items-center gap-1 border-l border-piedra/60 pl-3">
          <button
            onClick={toggleRomaji}
            title={profile.preferences.showRomaji ? 'Desactivar romaji (alfabeto latino)' : 'Activar romaji'}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              profile.preferences.showRomaji
                ? 'bg-torii/10 border-torii text-torii dark:border-torii-dark dark:text-torii-dark'
                : 'border-piedra/60 text-sumi/50 dark:text-washi/50 line-through'
            }`}
          >
            Romaji
          </button>

          <button
            onClick={toggleFurigana}
            title={profile.preferences.showFurigana ? 'Ocultar furigana (lectura sobre kanji)' : 'Mostrar furigana'}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              profile.preferences.showFurigana
                ? 'bg-musgo/10 border-musgo text-musgo dark:border-musgo-light dark:text-musgo-light'
                : 'border-piedra/60 text-sumi/50 dark:text-washi/50 line-through'
            }`}
          >
            Furigana
          </button>
        </div>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Alternar modo oscuro o claro"
          title={isDark ? 'Cambiar a modo papel washi (claro)' : 'Cambiar a modo tinta sumi nocturna (oscuro)'}
          className="p-2 rounded-full border border-piedra/60 text-sumi/80 hover:text-torii dark:text-washi/80 dark:hover:text-torii-dark hover:bg-washi/50 dark:hover:bg-[#232724] transition-colors"
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
};
