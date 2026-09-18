import Image from "next/image"
import { getTestSongs } from "@/app/lib/data";
import SongCell from '@/app/ui/open/SongCell';

export default async function CellsRow(){
    const songs = await getTestSongs();

    return(
        <div className="w-max">
            <h2 className="font-bold text-3xl ms-3 mt-4 ">Made for you</h2>
            {songs?.map((test, index)=>(
                <SongCell key={test.id} imgLink={test.imgLink} author={test.author} name={test.name} songLink={test.songLink}/>
            ))}
        </div>
    )
}