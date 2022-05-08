import { useMemo, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useDeezerSearch } from '../../../../libraries/deezer/hooks';
import { DeezerTrack } from '../../../../libraries/deezer/type';
import { useAppDispatch } from '../../../../store/hooks';
import { addGuess } from '../../../../store/game/slice';
import { useCurrentGameState } from '../../../../store/game/hooks';
import DeezerSmallSearchResultRow from './DeezerSmallSearchResultRow';
import { secondsAllowedForNbGuess } from './helpers';
import classNames from 'classnames';

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

    const nextSeconds = useMemo(() => {
        if (gameState != null) {
            return (
                secondsAllowedForNbGuess(gameState.guessList.length + 1) -
                secondsAllowedForNbGuess(gameState.guessList.length)
            );
        }
        return 0;
    }, [gameState]);

    return (
        <div>
            <div className="flex relative">
                <Combobox value={selectedTrack} onChange={setSelectedTrack}>
                    <Combobox.Input
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={displayTrack}
                        className="bg-neutral-800 border border-neutral-600 px-2 w-full h-12"
                        placeholder="Search by artist or title"
                    />
                    {data != null && (
                        <Combobox.Options className="absolute left-0 right-0 transform -translate-y-full max-h-60 bg-neutral-800 px-1 py-2 overflow-y-scroll z-10">
                            {(data?.data ?? []).map((track) => (
                                <Combobox.Option key={track.id} value={track} className="cursor-pointer">
                                    <DeezerSmallSearchResultRow track={track} />
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </Combobox>
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    type="button"
                    className="font-semibold font-mono bg-neutral-700 hover:bg-neutral-800 px-3 py-2 cursor-pointer"
                    onClick={skipGuess}
                >
                    skip{nextSeconds > 0 && <span className="text-sm"> (+{nextSeconds}s)</span>}
                </button>

                <button
                    type="button"
                    className={classNames('font-semibold font-mono px-3 py-2 cursor-pointer bg-green-600', {
                        'cursor-not-allowed': selectedTrack == null,
                        'opacity-40': selectedTrack == null,
                        ' hover:bg-green-700': selectedTrack != null,
                    })}
                    onClick={submitGuess}
                    disabled={selectedTrack == null}
                >
                    submit
                </button>
            </div>
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
