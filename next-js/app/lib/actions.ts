'use server'
import { getUploadUrl } from "@/lib/minio";
import { randomUUID } from "crypto";
import { z } from "zod";

const ImageTypes = z.literal(['png','jpeg','jpg'])



export async function saveSongRecord(formData: FormData){
    const rawData = {
        name: formData.get('songName'),
        songMP3: formData.get('songMP3'),
    }
    
    console.log(typeof rawData.songMP3);
}

export async function getPresignedUrl(type:string) {
    const key = randomUUID();
    if(!ImageTypes.validate(type)) return new Error("Wrong image type");

    const MP3Url = await getUploadUrl(`songs/${key}.mp3`,'audio/mpeg');
    const IMGUrl = await getUploadUrl(`images/${key}.${type}`,`image/${type}`);
    return {MP3Url ,IMGUrl};
}