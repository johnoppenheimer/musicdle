import { useRef, useState } from 'react';
import { DeezerTrack } from '../../../libraries/deezer/type';
import PlayPauseButton from '../../buttons/PlayPause';

type BottomPlayerProps = {
    track: DeezerTrack;
};

const BottomPlayer = ({ track }: BottomPlayerProps) => {
    const [playing, setPlaying] = useState(false);
    const playerRef = useRef<HTMLAudioElement>(null);

    const onButtonClick = () => {
        if (playing) {
            playerRef.current?.pause();
        } else {
            playerRef.current?.play();
        }
    };

    return (
        <div>
            <PlayPauseButton isPlaying={playing} onClick={onButtonClick} />
            <audio
                ref={playerRef}
                controls
                src={track.preview}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                onTimeUpdate={() => {
                    console.log(playerRef.current?.currentTime);
                }}
            />
        </div>
    );
};

export default BottomPlayer;
