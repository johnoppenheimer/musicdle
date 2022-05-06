import { NextPage } from 'next';
import { useRouter } from 'next/router';

import BottomPlayer from '../components/pages/track/BottomPlayer';
import DeezerSmallSearch from '../components/pages/track/DeezerSmallSearch';
import GameComponent from '../components/pages/track/GameComponent';
import { useDeezerTrack } from '../libraries/deezer/hooks';
import { useGameState } from '../store/game/hooks';

const TrackGamePage: NextPage = () => {
    const { query } = useRouter();

    const { trackId } = query;

    const { isLoading, data } = useDeezerTrack(String(trackId));
    const gameState = useGameState(Number(trackId));

    const shareResult = () => {
        const emojiScore = Array(6)
            .fill(0)
            .map((_v, index) => {
                const guess = gameState.guessList[index];
                if (guess != null) {
                    if (guess.correct) {
                        return '🟩';
                    } else if (guess.skipped) {
                        return '⬛️';
                    } else {
                        return '🟥';
                    }
                }
                return '⬜️';
            })
            .join('');

        navigator.clipboard.writeText(`Musicdle #${gameState.trackId}\n${emojiScore}`);
    };

    if (isLoading) {
        return <div>Loading</div>;
    }

    if (data == null) {
        return <div>Ooops</div>;
    }

    if (gameState?.gotCorrect) {
        return (
            <div>
                <div>Bravo bg, t'as trouvé</div>
                <button type="button" onClick={shareResult}>
                    Share
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="mt-4">
                <GameComponent track={data} />
            </div>
            <DeezerSmallSearch />
            <BottomPlayer track={data} />
        </div>
    );
};

export default TrackGamePage;
