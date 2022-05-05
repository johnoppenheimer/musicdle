/* eslint-disable @next/next/no-img-element */
import { DeezerTrack } from '../../../../libraries/deezer/type';

type DeezerAutocompleteResultRowProps = {
    track: DeezerTrack;
    onClick?: (track: DeezerTrack) => void;
};

const DeezerAutocompleteResultRow = ({ track, onClick }: DeezerAutocompleteResultRowProps) => (
    <div
        className="cursor-pointer flex flex-row items-center hover:bg-neutral-700 px-2 py-3"
        onClick={() => onClick?.(track)}
    >
        <div>
            <img src={track.album.cover_small} alt={`Cover for ${track.album.title}`} />
        </div>
        <div className="flex-grow px-4">
            <div>{track.title_short}</div>
            <div className="text-neutral-400">{track.artist.name}</div>
        </div>
        <div className="w-1/3 text-neutral-400">{track.album.title}</div>
    </div>
);

export default DeezerAutocompleteResultRow;
