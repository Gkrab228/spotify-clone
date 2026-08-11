import Image from "next/image";

export default function Page(){
    return (
        <footer className="h-20 w-full [grid-area:now-playing-bar] flex items-center justify-between">
            {/* Icon */}
            <div className="ps-2 flex">
                <Image src="/EsDeeKid.png" alt="" width={55} height={55} className="rounded-sm"/>
                <div className="ms-4 flex flex-col justify-center text-sm">
                    <h3>Phantom</h3>
                    <p className="text-xs text-neutral-400">EsDeeKid</p>
                </div>
            </div>

            <div>

            </div>
        </footer>
    )
}