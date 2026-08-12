'use client'

import Image from "next/image";

export default function SongList({ songs }: { songs: Song[] }){
    return (
        <ul className="flex flex-wrap gap-3">
            {songs?.map((item, index)=>{
                const hasImg = Boolean(item.imgLink);
                return (
                    <li key={item.id || index} className="p-2 flex w-full hover:bg-neutral-800 rounded-sm overflow-hidden box-border">
                        {hasImg && <Image src={item.imgLink} alt={item.name || ""} width={55} height={55} className="rounded-sm object-cover" unoptimized/>}
                        {!hasImg && <div className="w-[55px] h-[55px] rounded-sm bg-neutral-700 shrink-0"/>}
                        <div className="ms-4 flex flex-col justify-center ">
                            <h3>{item.name}</h3>
                            <p className="text-sm text-neutral-400">{item.author}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    )
}