'use client';
import { usePlayerStore } from "@/app/lib/player-store";
import clsx from "clsx";
import Image from "next/image"
import { useState } from "react";


function ActivateArrow({isPlaying}:{isPlaying: boolean}){
    const path = isPlaying ? <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z"></path> :
    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>;
    return  <svg viewBox="0 0 24 24" className="w-5 h-5">
            {path}
        </svg>
}

export default function Page(
    {imgLink, name, author, songLink} : { imgLink:string; name: string, author?: string, songLink: string}
){
    const audioPlay = usePlayerStore((s)=>s.audioPlay);
    const audioPause = usePlayerStore((s)=>s.audioPause);
    const isPlaying = usePlayerStore((s)=>s.isPlaying);
    const currentUrl = usePlayerStore((s)=>s.currentUrl);

    const isThisSong = currentUrl === songLink;
    const [showArrow, setShowArrow] = useState(false);

    function handlePausePlay(){
        if(isPlaying&&isThisSong) {
            audioPause();
            return;
        }
        audioPlay(songLink);
    }

    return(
        <div 

            className="w-46 p-3 rounded-lg inline-block hover:bg-neutral-800" 
            onClick={handlePausePlay} 
            tabIndex={0} 
            onPointerEnter={()=>setShowArrow(true)}
            onPointerLeave={()=>setShowArrow(false)}
        >
            <div className="relative">
                <Image src={imgLink} width={100} height={100} alt={name} className="object-contain w-full rounded-md" unoptimized draggable={false}/>
                <button className={clsx(`absolute bottom-2 right-2 p-4 rounded-full bg-green-500 transition-opacity`,
                    {
                        'opacity-100': showArrow ||(isThisSong && isPlaying),
                        'opacity-0': !showArrow && !(isThisSong && isPlaying)
                    },
                )}>
                    <ActivateArrow isPlaying={isPlaying && isThisSong}/>
                </button>
            </div>
            <p className="mt-1 p-1 text-s text-gray-300">{author || "Unknown"}</p>
        </div>
    )
}