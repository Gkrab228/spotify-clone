'use client'

import { getPresignedUrl } from "@/app/lib/actions"

async function handleSongSubmit(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault();
    const songFormData = new FormData(e.currentTarget);

    const songName = songFormData.get('Name');
    const MP3File = songFormData.get('MP3');

    const PresignedURL = await getPresignedUrl('png') as string;

    const uploadRes = await fetch(PresignedURL,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'audio/mpeg' },
            body: MP3File,
        }
    )
    console.log(uploadRes)
}


export default function Page(){
    return (
    <>
        <form onSubmit={handleSongSubmit}>
            <div className="flex flex-col w-full items-start gap-4 py-5">
                <div className="flex flex-col">
                    <input type="text" name="Name" id="Name" className="bg-neutral-700" />
                </div>

                
                <input type="file" name="Image" id="Image" className=""/>
                <input type="file" name="MP3" id="MP3" />
                <input type="submit" value="Create" className="font-bold px-7 py-2 bg-green-500 text-black rounded-full"/>
            </div>
        </form>
    </>
    )
}