import { NextPage } from 'next';
import { useRouter } from 'next/router';

import BottomPlayer from '../components/pages/track/BottomPlayer';
import DeezerSmallSearch from '../components/pages/track/DeezerSmallSearch';
import GameComponent from '../components/pages/track/GameComponent';
import { useDeezerTrack } from '../libraries/deezer/hooks';

const TrackGamePage: NextPage = () => {
    const { query } = useRouter();

    const { trackId } = query;

    const { isLoading, data } = useDeezerTrack(String(trackId));

    if (isLoading) {
        return <div>Loading</div>;
    }

    if (data == null) {
        return <div>Ooops</div>;
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
