import { useEffect, useMemo, useRef, useState } from 'react';
import ReactHowler from 'react-howler';
import { useTrackContext } from '../../../helpers/context/TrackContext';
import { useGameState } from '../../../store/game/hooks';
import PlayPauseButton from '../../buttons/PlayPause';
import { secondsAllowedForNbGuess } from './DeezerSmallSearch/helpers';

type BottomPlayerProps = Record<string, never>;

const BottomPlayer = ({}: BottomPlayerProps) => {
    const { track } = useTrackContext();
    const gameState = useGameState(track.id);
    const [playing, setPlaying] = useState(false);
    const playerRef = useRef<ReactHowler>(null);
    const [ms, setMS] = useState(0);
    const seconds = useMemo(() => Math.floor(ms / 1000), [ms]);
    const width = useMemo(() => (ms / 16000) * 100, [ms]);

    const maxWidthProgress = useMemo(() => {
        if (gameState != null) {
            const maxSeconds = secondsAllowedForNbGuess(gameState.guessList.length);
            return (maxSeconds / 16) * 100;
        }
        return 6.25;
    }, [gameState]);

    const maxSeconds = useRef(0);

    useEffect(() => {
        maxSeconds.current = secondsAllowedForNbGuess(gameState?.guessList.length ?? 0);
    }, [gameState?.guessList]);

    const onPause = () => {
        playerRef.current?.seek(0);
        setMS(0);
    };

    useAnimationFrame(() => {
        setPlaying((_playing) => {
            if (_playing && playerRef.current != null) {
                const seconds = playerRef.current.seek();
                setMS(seconds * 1000);
                if (seconds >= maxSeconds.current) {
                    return false;
                }
            }
            return _playing;
        });
    });

    return (
        <div>
            <div className="relative h-3 border border-neutral-600">
                <div className="absolute w-full h-full bg-neutral-700" style={{ width: `${maxWidthProgress}%` }}></div>
                <div className="absolute h-full bg-green-700" style={{ width: `${width}%`, minWidth: '0.5%' }}></div>
                <div className="absolute w-px h-full bg-neutral-600" style={{ left: '6.25%' }} />
                <div className="absolute w-px h-full bg-neutral-600" style={{ left: '12.5%' }} />
                <div className="absolute w-px h-full bg-neutral-600" style={{ left: '25%' }} />
                <div className="absolute w-px h-full bg-neutral-600" style={{ left: '43.75%' }} />
                <div className="absolute w-px h-full bg-neutral-600" style={{ left: '68.75%' }} />
            </div>
            <div className="flex items-center justify-between">
                <div>0:{seconds < 10 ? `0${seconds}` : seconds}</div>
                <PlayPauseButton isPlaying={playing} onClick={() => setPlaying((_playing) => !_playing)} />
                <div>0:16</div>
                <div className="hidden">
                    <ReactHowler ref={playerRef} src={track.preview} playing={playing} onPause={onPause} />
                </div>
            </div>
        </div>
    );
};

const useAnimationFrame = (callback: (deltaTime: number) => void) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef<number>(0);
    const previousTimeRef = useRef<number>(0);
    /**
     * The callback function is automatically passed a timestamp indicating
     * the precise time requestAnimationFrame() was called.
     */

    useEffect(() => {
        const animate = (time: number) => {
            if (previousTimeRef.current !== undefined) {
                const deltaTime = time - previousTimeRef.current;
                callback(deltaTime);
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
};

export default BottomPlayer;
