import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useDeezerSearch } from '../../../../libraries/deezer/hooks';
import { DeezerTrack } from '../../../../libraries/deezer/type';

const DeezerSmallSearch = () => {
    const [selectedTrack, setSelectedTrack] = useState<DeezerTrack | null>(null);
    const [query, setQuery] = useState('');
    const { data } = useDeezerSearch(query);

    return (
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
    );
};

const displayTrack = (track: DeezerTrack | null): string => {
    if (track == null) {
        return '';
    }

    return `${track.title_short} - ${track.artist.name}`;
};

export default DeezerSmallSearch;
