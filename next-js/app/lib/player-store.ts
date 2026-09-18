// import { createStore } from 'zustand/vanilla';
import { create } from 'zustand';

// export const defaultInitState = {
//     progress: 0,
//     isPlaying: false,
//     trackURL: '',
// }

// export const createCounterStore = ()=>{
//     return createStore((set)=>{
//         progress: 0,
//         isPlaying: false,
//         trackURL: '',
//     })
// }

interface Player {
    audioElement: HTMLAudioElement | null
    isPlaying: boolean
    currentUrl: string | null
    audioPlay: (url:string) => void
    audioPause: () => void
    setSongUrl: (url: string) => void
    togglePauseResume: ()=>void
}

const audioElement = typeof window !== 'undefined' ? new Audio() : null;
// const audioElement = new Audio();

export const usePlayerStore = create<Player>()((set,get)=>({
    audioElement: audioElement,
    isPlaying: false,
    currentUrl: null,
    audioPlay: (url)=>{
        if(!audioElement) return;
        set({isPlaying: true,currentUrl: url});
        if(audioElement.src!==url) audioElement.src = url;
        audioElement.play();
    },
    audioPause: ()=>{
        if(!audioElement) return;
        set({isPlaying: false});
        audioElement.pause();
    },
    togglePauseResume: ()=>set((state)=>({isPlaying:!state.isPlaying})),
    setSongUrl: (url) => set({currentUrl: url})
}))