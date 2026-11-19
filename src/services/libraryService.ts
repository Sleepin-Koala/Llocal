import { Album, Id, Track } from "../types/musicInfo";


const readRecentTracks = (): Track[] => {
  const seen = new Set<Id>();
  const recent: Track[] = [];

  for (const track of [...allTracks()].sort(byAddedDesc)) {
    if (seen.has(track.albumId)) continue;
    const album = albumById.get(track.albumId);
    if (!album) continue;
    seen.add(track.albumId);
    recent.push(album);
    if (recent.length === RECENT_ALBUM_LIMIT) break;
  }

  return recent;
};

