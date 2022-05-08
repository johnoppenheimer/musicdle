import { useCallback, useMemo, useRef, useState } from 'react';
import { useTrackContext } from '../../../helpers/context/TrackContext';
import { useGameState } from '../../../store/game/hooks';
import PlayPauseButton from '../../buttons/PlayPause';
import { secondsAllowedForNbGuess } from './DeezerSmallSearch/helpers';

type BottomPlayerProps = Record<string, never>;

const BottomPlayer = ({}: BottomPlayerProps) => {
    const { track } = useTrackContext();
    const gameState = useGameState(track.id);
    const [playing, setPlaying] = useState(false);
    const playerRef = useRef<HTMLAudioElement>(null);

    const maxSeconds = useMemo(
        () => secondsAllowedForNbGuess(gameState?.guessList.length ?? 0),
        [gameState?.guessList],
    );

    const onButtonClick = () => {
        if (playing) {
            playerRef.current?.pause();
        } else {
            playerRef.current?.play();
        }
    };

    const onTimeChange = useCallback(() => {
        console.log('current time:', playerRef.current?.currentTime);
        if (playerRef.current?.currentTime != null && playerRef.current?.currentTime >= maxSeconds) {
            playerRef.current.pause();
            playerRef.current.currentTime = 0;
        }
    }, [maxSeconds]);

    return (
        <div>
            <PlayPauseButton isPlaying={playing} onClick={onButtonClick} />
            <audio
                ref={playerRef}
                src={track.preview}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                onTimeUpdate={onTimeChange}
            />
        </div>
    );
};

export default BottomPlayer;
