'use server'

export async function createSong(formData: FormData){
    const rawData = {
        name: formData.get('songName'),
        songMP3: formData.get('songMP3'),
    }
    console.log(typeof rawData.songMP3);
}