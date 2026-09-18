'use client'
import Image from "next/image";
import AudioPlayer from "@/app/ui/open/AudioPlayer";
import { usePlayerStore } from "@/app/lib/player-store";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const VolumeIcon = () => (
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a3 3 0 0 1 0 5.175z"></path>
)

function AudioVolume(){
    const [isHovered, setIsHovered] = useState(false);
    const barRef = useRef<HTMLDivElement>(null);
    const audio = usePlayerStore((s)=>s.audioElement);

    useEffect(()=>{
        if (!audio || !barRef.current) return;

        function handleMetadataLoaded(){
            if (!barRef.current) return;
            audio!.volume=0.5;
            const volume = audio!.volume*100;
            barRef.current?.style.setProperty('--progress-bar-translate',volume+'%')
        }

        function handleVolumeClick(e: PointerEvent){
            const bar = barRef.current;
            if (!bar || !audio) return;

            // getBoundingClientRect gives accurate position regardless of scroll/layout
            const { left, width } = bar.getBoundingClientRect();
            const offsetX = e.clientX - left;

            // if (offsetX < 0 || offsetX > width) return;

            const clickPercent = (offsetX / width) * 100;
            audio.volume = (clickPercent / 100);
            bar.style.setProperty('--progress-bar-translate', clickPercent + '%');
        }

        audio.addEventListener('loadedmetadata',handleMetadataLoaded);
        barRef.current.addEventListener('pointerdown', handleVolumeClick);
        return ()=>{

            audio?.removeEventListener('loadedmetadata',handleMetadataLoaded);
        }
    },[audio])

    return (
    <div className="w-[30%] flex items-center justify-end gap-2 pe-2">
        <svg className="fill-neutral-500 w-4 h-4" viewBox="0 0 16 16">
            <VolumeIcon />
        </svg>
        <div
            role="slider"
            ref={barRef}
            className="w-30 h-3 relative cursor-pointer"
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
        >
            <div className="w-full overflow-hidden h-1 top-0.5 relative translate-y-[50%] bg-neutral-800 rounded-full">
                <div className={clsx(
                    isHovered ? 'bg-green-500' : 'bg-white',
                    'top-0 bottom-0 right-full absolute w-full rounded-full translate-x-(--progress-bar-translate)'
                )} />
            </div>
            <div
                hidden={!isHovered}
                className="w-3 h-3 bg-white absolute rounded-full translate-y-[-50%] -translate-x-1 top-1.5 left-(--progress-bar-translate)"
            />
        </div>
    </div>
    )
}

export default function Page(){
    return (
        <footer className="h-20 w-full [grid-area:now-playing-bar] flex items-center justify-between">
            <div className="ps-2 flex w-[30%]">
                <Image src="/EsDeeKid.png" alt="" width={55} height={55} className="rounded-sm"/>
                <div className="ms-4 flex flex-col justify-center text-sm">
                    <h3>Phantom</h3>
                    <p className="text-xs text-neutral-400">EsDeeKid</p>
                </div>
            </div>
            <AudioPlayer />
            <AudioVolume />
        </footer>
    )
}