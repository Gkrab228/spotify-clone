import Image from "next/image"
import {getTestSongs} from "@/app/lib/data";




export default function CellsRow(){
    return(
        <div className="w-max">
            <h2 className="font-bold text-3xl ms-3 mt-4 ">Made for you</h2>
            {getTestSongs(9).map((test,index)=>(
            <div key={index} className="relative w-46 p-3 rounded-lg inline-block hover:bg-neutral-800">
                <Image src="/EsDeeKid.png" width={100} height={100} alt="" className="object-contain w-full rounded-md"/>
                <p className="mt-1 p-1 text-s text-gray-300">EsDeeKid</p>
            </div>))}
        </div>
    )
}