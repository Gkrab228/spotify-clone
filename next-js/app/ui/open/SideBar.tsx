import SearchSideBar  from '@/app/ui/open/SearchSideBar';

export default function Page(){
    return  (
        <aside className="flex flex-col w-80 bg-neutral-900 rounded-md p-2 [grid-area:side-bar]">
            <div className="flex flex-row justify-between items-center font-bold">
                <h2 className='ms-2'>Your Library</h2>
                <button className="px-4 py-2 bg-neutral-800 rounded-full flex items-center">
                    <svg  className="w-4 h-4" fill="white">
                        <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75"></path>
                    </svg>
                    <span className="ps-2">Create</span>
                </button>
            </div>
            <div className="mt-4">
                {['Playlists',"Albums","Artists"].map((item,index)=>(
                    <button className="px-3 py-1.5 bg-neutral-800 rounded-full text-sm me-1 hover:bg-neutral-700 transition" key={index}>{item}</button>
                ))}
            </div>
            <SearchSideBar />
        </aside>
    )
}