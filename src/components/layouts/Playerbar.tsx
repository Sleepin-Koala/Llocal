import type { CSSProperties } from "react";
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

const PLAY_ICON_SIZE = 18;
const TRANSPORT_ICON_SIZE = 16;

export function PlayerBar() {
  const progressStyle = { "--range-progress": "30%" } as CSSProperties;
  const volumeStyle = { "--range-progress": "100%" } as CSSProperties;

  return (
    <footer 
      className="grid grid-cols-[minmax(0,1fr)_minmax(340px,1.6fr)_minmax(0,1fr)] items-center gap-6 h-[var(--layout-player-height)] px-6 bg-[var(--color-surface)] border-top border-solid border-t-[var(--color-border-subtle)] shadow-[var(--shadow-player)]" 
      aria-label="Player"
    >
      {/* Track Identity */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex flex-col gap-[2px] min-w-0">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-500 text-[var(--color-text-secondary)]">
            Nothing playing
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[var(--color-text-muted)]">
            Choose a track to begin listening
          </span>
        </div>
      </div>

      {/* Transport Controls */}
      <div className="flex flex-col items-center gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-content-center w-[34px] h-[34px] mx-1 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-contrast)] transition-[background-color,opacity] duration-200 ease-in-out hover:not-disabled:bg-[#e0b47c] disabled:opacity-40 disabled:cursor-default"
            aria-label="Pause"
          >
            {true ? (
              <Pause size={PLAY_ICON_SIZE} strokeWidth={1.6} aria-hidden="true" />
            ) : (
              <Play
                size={PLAY_ICON_SIZE}
                strokeWidth={1.6}
                aria-hidden="true"
                className="translate-x-[1px]"
              />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full">
          <input
            className="appearance-none w-full h-4 bg-transparent cursor-pointer disabled:cursor-default disabled:opacity-55 focus-visible:outline-offset-6
                       [&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-accent)_var(--range-progress,0%),var(--color-border)_var(--range-progress,0%))]
                       [&::-moz-range-track]:h-[2px] [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-accent)_var(--range-progress,0%),var(--color-border)_var(--range-progress,0%))]
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-text-primary)] [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:transition-opacity [&::-webkit-slider-thumb]:duration-200
                       [&::-moz-range-thumb]:w-[10px] [&::-moz-range-thumb]:h-[10px] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--color-text-primary)] [&::-moz-range-thumb]:opacity-0 [&::-moz-range-thumb]:transition-opacity [&::-moz-range-thumb]:duration-200
                       hover:[&::-webkit-slider-thumb]:opacity-100 focus-visible:[&::-webkit-slider-thumb]:opacity-100 hover:[&::-moz-range-thumb]:opacity-100 focus-visible:[&::-moz-range-thumb]:opacity-100"
            type="range"
            min={0}
            step={1}
            value={1}
            style={progressStyle}
            aria-label="Seek"
          />
        </div>
      </div>

      {/* Extras / Volume */}
      <div className="flex items-center justify-end gap-2">
        <Volume2
          className="text-[var(--color-text-muted)]"
          size={TRANSPORT_ICON_SIZE}
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <input
          className="appearance-none h-4 bg-transparent cursor-pointer disabled:cursor-default disabled:opacity-55 focus-visible:outline-offset-6 w-[84px] flex-none
                     [&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-accent)_var(--range-progress,0%),var(--color-border)_var(--range-progress,0%))]
                     [&::-moz-range-track]:h-[2px] [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-accent)_var(--range-progress,0%),var(--color-border)_var(--range-progress,0%))]
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-text-primary)] [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:transition-opacity [&::-webkit-slider-thumb]:duration-200
                     [&::-moz-range-thumb]:w-[10px] [&::-moz-range-thumb]:h-[10px] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--color-text-primary)] [&::-moz-range-thumb]:opacity-0 [&::-moz-range-thumb]:transition-opacity [&::-moz-range-thumb]:duration-200
                     hover:[&::-webkit-slider-thumb]:opacity-100 focus-visible:[&::-webkit-slider-thumb]:opacity-100 hover:[&::-moz-range-thumb]:opacity-100 focus-visible:[&::-moz-range-thumb]:opacity-100"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={1}
          style={volumeStyle}
          aria-label="Volume"
        />
      </div>
    </footer>
  );
}
