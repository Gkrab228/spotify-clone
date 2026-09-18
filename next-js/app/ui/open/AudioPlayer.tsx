'use client'
import { usePlayerStore } from "@/app/lib/player-store";
import clsx from "clsx";
import ProgressBar from "./ProgressBar";


const PauseIcon = () => (
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
);

const PlayIcon = () => (
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
);


export default function AudioPlayer() {
    const currentUrl = usePlayerStore((s) => s.currentUrl);
    const isPlaying = usePlayerStore((s) => s.isPlaying);
    const audioPlay = usePlayerStore((s) => s.audioPlay);
    const audioPause = usePlayerStore((s) => s.audioPause);

    const hasSong = Boolean(currentUrl);

    function handleTogglePlay() {
        if (!currentUrl) return;
        isPlaying ? audioPause() : audioPlay(currentUrl);
    }

    return (
        <div className="flex flex-col w-[40%] max-w-3xl items-center">
            <div>
                <button
                    onClick={handleTogglePlay}
                    disabled={!hasSong}
                    className={clsx("w-9 h-9 rounded-full", hasSong ? 'bg-white' : 'bg-neutral-600')}
                >
                    <svg viewBox="0 0 16 16" fill="black" className="w-4 h-4 m-auto">
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </svg>
                </button>
            </div>

            <ProgressBar />
        </div>
    );
}