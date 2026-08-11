import { getTestSongs } from "@/app/lib/data";
import Image from "next/image";


function SongList({ songs }: { songs: any[] }){
    return (
        <ul className="flex flex-wrap gap-3">
            {songs?.map((item, index)=>(
                <li key={index} className="p-2 flex w-full hover:bg-neutral-800 rounded-sm overflow-hidden box-border">
                    <Image src={item.src} alt="" width={55} height={55} className="rounded-sm"/>
                    <div className="ms-4 flex flex-col justify-center ">
                        <h3>{item.name}</h3>
                        <p className="text-sm text-neutral-400">{item.author}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default function Page(){
    return (
        <>
            <div>
                <input name="searchSideBar" id="" />
            </div>
            <SongList songs={getTestSongs(5)}/>
        </>
    )
}