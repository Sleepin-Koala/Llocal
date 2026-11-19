import { useState } from "react";
import { FolderOpen } from "lucide-react";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from '@tauri-apps/api/core';
import { Track } from "../types/Track";
import { TracksStore } from "../stores/music";


export function FirstTimeView() {
  const [error, setError] = useState<string | null>(null);
  const Tracks = TracksStore()

  

  const handlePickFolder = async () => {
    setError(null);
    try {
      const path = await open({ directory: true, multiple: false});
      if (path) {
        const list_tracks : Track[] = await invoke("scan_folder", { path : path });
        Tracks.updateMusics(list_tracks)
        
      }
    } catch (e){
      setError("Impossible d'ouvrir le sélecteur de dossier.");
      console.log(e)
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-(--space-6)">
      <button
        type="button"
        onClick={handlePickFolder}
        aria-label="Choisir le dossier de musique"
        className="flex items-center justify-center w-24 h-24 rounded-md text-(--color-text-secondary) bg-(--color-surface) border border-solid border-[var(--color-border-subtle)] transition-colors duration-200 ease-in-out hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]"
      >
        <FolderOpen size={44} strokeWidth={1.4} aria-hidden="true" />
      </button>

      <div className="flex flex-col items-center gap-(--space-1) text-center">
        <p className="text-sm font-500 text-(--color-text-primary)">
          Choisissez votre dossier de musique
        </p>
        <p className="text-xs text-(--color-text-muted)">
          Cliquez sur l'icône pour ouvrir le sélecteur de dossier
        </p>
        {error && (
          <p className="text-xs text-(--color-error,#e07070)">{error}</p>
        )}
      </div>
    </div>
  );
}


