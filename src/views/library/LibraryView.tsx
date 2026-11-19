import { TracksStore } from '../../stores/music';
import { TrackRow } from './components/TrackRow';
import { TrackTableProps } from './types/types';


export default function TrackTable({
  currentTrackId ,
  onPlay = ()=>{},
  onToggleFavorite = ()=>{},
  onOpenOptions = ()=>{},
}:TrackTableProps ){
  
  

  const tracks = TracksStore((p)=>p.musics)

      return (
    <div className="flex-1 overflow-y-auto mt-space-xs pr-1 scroll-smooth select-none relative z-10">
      <table className="w-full border-collapse text-left">
        <thead className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm font-mono-badge text-mono-badge text-outline uppercase tracking-wider">
          <tr className="h-9 border-b border-white/5">
            <th className="w-12 font-normal" scope="col"></th>
            <th className="pl-2 font-normal" scope="col">
              Title
            </th>
            <th className="font-normal" scope="col">
              Artist
            </th>
            <th className="font-normal hidden md:table-cell" scope="col">
              Album
            </th>
           
            <th className="text-right pr-4 font-normal" scope="col">
              Duration
            </th>
            <th className="w-20 font-normal" scope="col"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-body-md text-body-md">
          {tracks.map((track) => (
            <TrackRow
              key={track.title}
              track={track}
              isActive={track.title === currentTrackId}
              onPlay={onPlay}
              onToggleFavorite={onToggleFavorite}
              onOpenOptions={onOpenOptions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );

}

