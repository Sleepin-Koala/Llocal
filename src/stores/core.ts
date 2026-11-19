
import { create } from 'zustand'



interface CoreStoreProps {
    first_launch : boolean
}



export const CoreStore = create<CoreStoreProps>((set)=>({
    first_launch: true
}))




