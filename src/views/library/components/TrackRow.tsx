import React from 'react';
import { TrackRowProps } from '../types/types';

export const TrackRow: React.FC<TrackRowProps> = ({
  track,
  isActive = false,
  onPlay,
  onToggleFavorite,
  onOpenOptions,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleFavorite?.(track.file_path);
  };

  const handleOptionsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpenOptions?.(track);
  };

  return (
    <tr
      onClick={() => onPlay?.(track)}
      className={`group h-12 hover:bg-surface-container/40 text-on-surface transition-colors cursor-pointer ${
        isActive ? 'bg-surface-container/30 text-primary' : ''
      }`}
    >
      {/* Pochette (ou icône musicale par défaut si absente de la struct Rust) */}
      <td className="text-center p-1 w-12">
        <div className="w-9 h-9 rounded overflow-hidden bg-surface-container-high relative shadow-sm mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-outline">
              music_note
            </span>
        </div>
      </td>

      {/* Titre */}
      <td className="pl-2">
        <div className="flex items-center gap-space-sm min-w-0">
          <span
            className={`font-medium truncate transition-colors ${
              isActive
                ? 'text-primary'
                : 'text-on-surface group-hover:text-primary'
            }`}
          >
            {track.title}
          </span>
        </div>
      </td>

      {/* Artiste */}
      <td className="text-on-surface-variant truncate">{track.artist}</td>

      {/* Album */}
      <td className="text-outline truncate hidden md:table-cell">
        {track.album}
      </td>



      {/* Durée formatée depuis duration_secs */}
      <td className="text-right pr-4 font-mono-metric text-mono-metric text-outline group-hover:text-on-surface">
        {(track.duration_secs)}
      </td>

      {/* Actions */}
      <td className="w-20">
        <div className="flex items-center justify-center gap-1 text-outline">
          <button
            onClick={handleOptionsClick}
            className="hover:text-on-surface transition-colors p-1 opacity-0 group-hover:opacity-100"
            title="Options"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              more_horiz
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};
