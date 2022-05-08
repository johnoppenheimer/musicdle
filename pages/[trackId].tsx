import { NextPage } from 'next';
import { useRouter } from 'next/router';

import BottomPlayer from '../components/pages/track/BottomPlayer';
import DeezerSmallSearch from '../components/pages/track/DeezerSmallSearch';
import GameComponent from '../components/pages/track/GameComponent';
import { TrackProvider } from '../helpers/context/TrackContext';
import { useDeezerTrack } from '../libraries/deezer/hooks';
import { useGameState } from '../store/game/hooks';
import FinishGame from '../components/pages/track/FinishGame';

const TrackGamePage: NextPage = () => {
    const { query } = useRouter();

    const { trackId } = query;

    const { isLoading, data } = useDeezerTrack(String(trackId));
    const gameState = useGameState(Number(trackId));

    if (isLoading) {
        return <></>;
    }

    if (data == null) {
        return <div>Ooops</div>;
    }

    return (
        <TrackProvider track={data}>
            {(() => {
                if (gameState?.hasFinished) {
                    return <FinishGame />;
                }

                return (
                    <TrackProvider track={data}>
                        <div>
                            <div className="mt-4 max-w-screen-sm mx-auto">
                                <GameComponent />
                            </div>
                            <div className="absolute bottom-8 left-0 right-0 ">
                                <div className="max-w-screen-sm mx-auto">
                                    <BottomPlayer />
                                    <DeezerSmallSearch />
                                </div>
                            </div>
                        </div>
                    </TrackProvider>
                );
            })()}
        </TrackProvider>
    );
};

export default TrackGamePage;
