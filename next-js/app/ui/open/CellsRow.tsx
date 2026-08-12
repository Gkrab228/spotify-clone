import Image from "next/image"
import { getTestSongs } from "@/app/lib/data";

export default async function CellsRow(){
    const songs = await getTestSongs();

    return(
        <div className="w-max">
            <h2 className="font-bold text-3xl ms-3 mt-4 ">Made for you</h2>
            {songs?.map((test, index)=>(
                <div key={test.id || index} className="relative w-46 p-3 rounded-lg inline-block hover:bg-neutral-800">
                    <Image src={test.imgLink} width={100} height={100} alt={test.name || ""} className="object-contain w-full rounded-md" unoptimized/>
                    <p className="mt-1 p-1 text-s text-gray-300">{test.author || "EsDeeKid"}</p>
                </div>
            ))}
        </div>
    )
}