import { Track } from "../../../types/Track";

export interface TrackRowProps {
  track: Track;
  isActive?: boolean;
  onPlay?: (track: Track) => void;
  onToggleFavorite?: (id: string) => void;
  onOpenOptions?: (track: Track) => void;
}

export interface TrackTableProps {
  tracks: Track[];
  currentTrackId?: string;
  onPlay?: (track: Track) => void;
  onToggleFavorite?: (id: string) => void;
  onOpenOptions?: (track: Track) => void;
}