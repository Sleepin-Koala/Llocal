
import { create } from 'zustand'
import { Track } from '../types/Track'



interface CurrentMusic {
    musics : Track[]
    updateMusics : (musics_list: Track[])=> void
}


export const TracksStore = create<CurrentMusic>((set)=>({
    musics: [],
    updateMusics: (musics_list: Track[]) => set({"musics": musics_list})
}))




