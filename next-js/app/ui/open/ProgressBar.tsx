'use client'
import { usePlayerStore } from "@/app/lib/player-store";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";


/** Formats seconds into "M:SS" or "H:MM:SS" for durations over an hour.
 *  e.g. 214.8 → "3:34" | 7513 → "2:05:13"
 */
export function formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const h  = Math.floor(seconds / 3600);
    const m  = Math.floor((seconds % 3600) / 60);
    const s  = Math.floor(seconds % 60);
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}


export default function ProgressBar() {
    const audio = usePlayerStore((s) => s.audioElement);
    const barRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    useEffect(() => {
        if (!audio || !barRef.current) return;


        function handleMetadataLoaded() {
            setCurrentTime('0:00');
            setDuration(formatTime(audio!.duration));
        }

        function handleTimeUpdate() {
            if (!barRef.current) return;
            const total = audio!.duration;
            if (!total || isNaN(total)) return;

            const progressPercent = (audio!.currentTime / total) * 100;
            barRef.current.style.setProperty('--progress-bar-translate', progressPercent + '%');
            setCurrentTime(formatTime(audio!.currentTime));
        }

        function handleBarClick(e: PointerEvent) {
            const bar = barRef.current;
            if (!bar || !audio) return;

            // getBoundingClientRect gives accurate position regardless of scroll/layout
            const { left, width } = bar.getBoundingClientRect();
            const offsetX = e.clientX - left;

            if (offsetX < 0 || offsetX > width) return;

            const clickPercent = (offsetX / width) * 100;
            audio.currentTime = (clickPercent / 100) * audio.duration;
            bar.style.setProperty('--progress-bar-translate', clickPercent + '%');
        }

        audio.addEventListener('loadedmetadata', handleMetadataLoaded);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        barRef.current.addEventListener('pointerdown', handleBarClick);

        const barSnapshot = barRef.current;
        return () => {
            audio.removeEventListener('loadedmetadata', handleMetadataLoaded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            barSnapshot.removeEventListener('pointerdown', handleBarClick);
        };
    }, [audio]);

    return (
        <div className="w-full flex items-center gap-2">
            <span className="text-xs text-neutral-400 w-8 text-right">{currentTime}</span>

            <div
                role="slider"
                ref={barRef}
                className="w-full h-3 relative cursor-pointer"
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                {/* Track */}
                <div className="w-full overflow-hidden h-1 top-0.5 relative translate-y-[50%] bg-neutral-800 rounded-full">
                    <div className={clsx(
                        isHovered ? 'bg-green-500' : 'bg-white',
                        'top-0 bottom-0 right-full absolute w-full rounded-full translate-x-(--progress-bar-translate)'
                    )} />
                </div>

                {/* Scrub thumb */}
                <div
                    hidden={!isHovered}
                    className="w-3 h-3 bg-white absolute rounded-full translate-y-[-50%] -translate-x-1 top-1.5 left-(--progress-bar-translate)"
                />
            </div>

            <span className="text-xs text-neutral-400 w-8">{duration}</span>
        </div>
    );
}
