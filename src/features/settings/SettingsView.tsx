import React, { useState } from 'react';
import { Settings, Download, Upload, Trash2, Moon, Sun, Check, Volume2, Shield } from 'lucide-react';
import { UserProfile } from '../../types';
import { StorageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

interface SettingsViewProps {
  profile: UserProfile;
  onUpdatePreferences: (updated: Partial<UserProfile['preferences']>) => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onDataReload: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdatePreferences,
  onUpdateProfile,
  onDataReload
}) => {
  const [userName, setUserName] = useState(profile.name);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSaveName = () => {
    onUpdateProfile({ name: userName.trim() });
    audioService.playZenChime('success');
  };

  const handleExportData = () => {
    const jsonStr = StorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kotoba-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    audioService.playZenChime('bell');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const content = ev.target?.result as string;
      const success = StorageService.importData(content);
      if (success) {
        setImportStatus('¡Datos restaurados con éxito!');
        audioService.playZenChime('success');
        onDataReload();
      } else {
        setImportStatus('Error al importar el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm('¿Estás seguro de que deseas reiniciar todo el progreso y las tarjetas? Esta acción no se puede deshacer.')) {
      StorageService.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-piedra/60 pb-5">
        <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
          <span>設定と同期</span>
          <span>•</span>
          <span>Preferencias y Privacidad</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
          Configuración y Gestión de Datos
        </h1>
        <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1 max-w-xl">
          Tus datos se guardan de forma local en tu navegador con total privacidad y sin requerir cuentas obligatorias ni cobros.
        </p>
      </div>

      {/* Profile Section */}
      <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-sumi dark:text-washi">
          Perfil de Estudiante
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="Tu nombre"
            className="flex-1 px-4 py-2.5 rounded-xl border border-piedra dark:border-piedra-dark bg-washi/50 dark:bg-[#181B19] text-xs text-sumi dark:text-washi focus:outline-none focus:border-torii"
          />
          <button
            onClick={handleSaveName}
            className="px-5 py-2.5 rounded-xl bg-torii text-marfil text-xs font-bold hover:bg-torii-hover shrink-0 shadow-sm"
          >
            Guardar Nombre
          </button>
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 shadow-sm space-y-5">
        <h3 className="font-serif text-base font-bold text-sumi dark:text-washi">
          Opciones Pedagógicas
        </h3>

        <div className="space-y-3">
          {/* Romaji toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-piedra/60 bg-washi/30 dark:bg-[#181B19]">
            <div>
              <span className="text-xs font-bold text-sumi dark:text-washi block">
                Mostrar Romaji (Alfabeto latino)
              </span>
              <span className="text-[11px] text-sumi/60 dark:text-washi/60">
                Recomendamos desactivarlo en cuanto domines Hiragana para acelerar tu lectura nativa.
              </span>
            </div>
            <input
              type="checkbox"
              checked={profile.preferences.showRomaji}
              onChange={e => onUpdatePreferences({ showRomaji: e.target.checked })}
              className="w-4 h-4 accent-torii cursor-pointer"
            />
          </div>

          {/* Furigana toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-piedra/60 bg-washi/30 dark:bg-[#181B19]">
            <div>
              <span className="text-xs font-bold text-sumi dark:text-washi block">
                Mostrar Furigana sobre Kanji
              </span>
              <span className="text-[11px] text-sumi/60 dark:text-washi/60">
                Pequeña lectura en kana encima de los caracteres kanji en textos e historias.
              </span>
            </div>
            <input
              type="checkbox"
              checked={profile.preferences.showFurigana}
              onChange={e => onUpdatePreferences({ showFurigana: e.target.checked })}
              className="w-4 h-4 accent-torii cursor-pointer"
            />
          </div>

          {/* Audio speed */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-piedra/60 bg-washi/30 dark:bg-[#181B19]">
            <div>
              <span className="text-xs font-bold text-sumi dark:text-washi block">
                Velocidad por defecto del Audio
              </span>
              <span className="text-[11px] text-sumi/60 dark:text-washi/60">
                Velocidad de pronunciación japonesa.
              </span>
            </div>
            <select
              value={profile.preferences.audioSpeed}
              onChange={e => onUpdatePreferences({ audioSpeed: parseFloat(e.target.value) })}
              className="px-3 py-1.5 rounded-lg border border-piedra bg-marfil dark:bg-[#232724] text-xs font-mono"
            >
              <option value="0.75">0.75x (Lenta / Principiante)</option>
              <option value="1.0">1.0x (Normal)</option>
              <option value="1.25">1.25x (Rápida / Nativa)</option>
            </select>
          </div>

          {/* Daily Goal minutes */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-piedra/60 bg-washi/30 dark:bg-[#181B19]">
            <div>
              <span className="text-xs font-bold text-sumi dark:text-washi block">
                Meta de Estudio Diario
              </span>
              <span className="text-[11px] text-sumi/60 dark:text-washi/60">
                Minutos recomendados al día.
              </span>
            </div>
            <select
              value={profile.preferences.dailyGoalMinutes}
              onChange={e => onUpdatePreferences({ dailyGoalMinutes: parseInt(e.target.value) })}
              className="px-3 py-1.5 rounded-lg border border-piedra bg-marfil dark:bg-[#232724] text-xs font-mono"
            >
              <option value="15">15 minutos</option>
              <option value="30">30 minutos</option>
              <option value="45">45 minutos</option>
              <option value="60">60 minutos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Backup & Privacy */}
      <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-sumi dark:text-washi flex items-center gap-2">
          <Shield size={16} className="text-musgo" />
          <span>Copia de Seguridad y Restauración</span>
        </h3>
        <p className="text-xs text-sumi/70 dark:text-washi/70 leading-relaxed">
          Exporta todo tu mazo SM-2, historial de repasos y sellos Hanko en un archivo JSON para sincronizarlo o guardarlo en tu ordenador.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-xl border border-piedra/80 dark:border-piedra-dark bg-washi/50 dark:bg-[#181B19] text-xs font-bold text-sumi dark:text-washi hover:border-torii flex items-center gap-2 shadow-sm"
          >
            <Download size={14} />
            <span>Descargar Copia JSON</span>
          </button>

          <label className="px-4 py-2.5 rounded-xl border border-piedra/80 dark:border-piedra-dark bg-washi/50 dark:bg-[#181B19] text-xs font-bold text-sumi dark:text-washi hover:border-torii flex items-center gap-2 shadow-sm cursor-pointer">
            <Upload size={14} />
            <span>Restaurar Copia JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={handleResetData}
            className="px-4 py-2.5 rounded-xl border border-torii/30 text-torii hover:bg-torii/10 text-xs font-bold flex items-center gap-2 ml-auto"
          >
            <Trash2 size={14} />
            <span>Reiniciar Todo</span>
          </button>
        </div>

        {importStatus && (
          <p className="text-xs font-bold text-musgo dark:text-musgo-light pt-2">
            {importStatus}
          </p>
        )}
      </div>
    </div>
  );
};
