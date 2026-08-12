import { getTestSongs } from "@/app/lib/data";
import SongList from "@/app/ui/open/SongList";


export default async function Page(){
    const songs = await getTestSongs();
    return (
        <>
            <div>
                <input name="searchSideBar" id="" />
            </div>

            <SongList songs={songs}/>
        </>
    )
}