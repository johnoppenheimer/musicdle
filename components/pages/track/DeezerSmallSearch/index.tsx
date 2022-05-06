import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useDeezerSearch } from '../../../../libraries/deezer/hooks';
import { DeezerTrack } from '../../../../libraries/deezer/type';
import { useAppDispatch } from '../../../../store/hooks';
import { addGuess } from '../../../../store/game/slice';
import { useCurrentGameState } from '../../../../store/game/hooks';

const DeezerSmallSearch = () => {
    const gameState = useCurrentGameState();
    const dispatch = useAppDispatch();
    const [selectedTrack, setSelectedTrack] = useState<DeezerTrack | null>(null);
    const [query, setQuery] = useState('');
    const { data } = useDeezerSearch(query);

    const submitGuess = () => {
        if (selectedTrack != null) {
            dispatch(
                addGuess({
                    forTrackId: gameState.trackId,
                    trackId: selectedTrack.id,
                    answer: `${selectedTrack.title_short} - ${selectedTrack.artist.name}`,
                    skipped: false,
                }),
            );
            setSelectedTrack(null);
            setQuery('');
        }
    };

    const skipGuess = () => {
        dispatch(
            addGuess({
                forTrackId: gameState.trackId,
                skipped: true,
                answer: null,
                trackId: null,
            }),
        );
    };

    return (
        <div>
            <button type="button" className="mr-4" onClick={skipGuess}>
                skip
            </button>
            <Combobox value={selectedTrack} onChange={setSelectedTrack}>
                <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={displayTrack}
                    className="bg-neutral-800 border border-neutral-600 px-1 py-2"
                />
                <Combobox.Options className="absolute mt-1 max-h-60 bg-neutral-800 px-1 py-2 overflow-y-scroll z-10">
                    {(data?.data ?? []).map((track) => (
                        <Combobox.Option key={track.id} value={track} className="cursor-pointer">
                            {track.title_short} - {track.artist.name}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
            <button type="button" className="ml-4" onClick={submitGuess} disabled={selectedTrack == null}>
                submit
            </button>
        </div>
    );
};

const displayTrack = (track: DeezerTrack | null): string => {
    if (track == null) {
        return '';
    }

    return `${track.title_short} - ${track.artist.name}`;
};

export default DeezerSmallSearch;
