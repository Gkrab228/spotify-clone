'use client'

import { createSong } from "@/app/lib/actions"

export default function Page(){
    return (
    <>
        <form action={createSong}>
            <div className="flex flex-col w-full items-start gap-4 py-5">
                <div className="flex flex-col">
                    <input type="text" name="songName" id="songName" className="bg-neutral-700" />
                </div>


                
                <input type="file" name="songMP3" id="songMP3" />
                <input type="submit" value="Create" className="font-bold px-7 py-2 bg-green-500 text-black rounded-full"/>
            </div>
        </form>
    </>
    )
}