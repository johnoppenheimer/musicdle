/* eslint-disable @next/next/no-img-element */
import { DeezerTrack } from '../../../../libraries/deezer/type';

type DeezerSmallSearchResultRowProps = {
    track: DeezerTrack;
};

const DeezerSmallSearchResultRow = ({ track }: DeezerSmallSearchResultRowProps) => (
    <div className="flex items-center hover:bg-neutral-700">
        <img src={track.album.cover_small} alt={`Cover for ${track.album.title}`} className="w-8 h-8 mr-2" />
        <div>
            {track.title_short}
            <span className="text-neutral-600"> - {track.artist.name}</span>
        </div>
    </div>
);

export default DeezerSmallSearchResultRow;
