import { prisma } from "@/lib/prisma";

export function getMediaUrl(path?: string | null): string {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }
    
    // Construct base URL from environment variables
    const baseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL || "https://localhost:9000/media-bucket";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    console.log(`${baseUrl}${cleanPath}`);
    return `${baseUrl}${cleanPath}`;
}

export async function getTestSongs() {
    try{
        const songs = await prisma.song.findMany();
        return songs.map((song) => ({
            ...song,
            imgLink: getMediaUrl(song.imgLink),
            songLink: getMediaUrl(song.songLink),
        }));
    } catch(error){
        console.error("Database Error", error);
        throw new Error("Failed to fetch songs");
    }


}