import { prisma } from "@/lib/prisma";

export function getTestSongs(count:number){
    const test = prisma.song.findMany();
    return test;
}