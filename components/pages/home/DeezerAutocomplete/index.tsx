import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDeezerSearch } from '../../../../libraries/deezer/hooks';
import { DeezerTrack } from '../../../../libraries/deezer/type';
import DeezerAutocompleteResultRow from './DeezerAutocompleteResultRow';

const DeezerAutocomplete = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const { isLoading, data } = useDeezerSearch(query);

    const onTrackClick = (track: DeezerTrack) => {
        router.push(`/${track.id}`);
    };

    return (
        <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="bg-neutral-600" />
            {isLoading && <p>Loading</p>}
            {data != null && (
                <div>
                    {data.data.map((track) => (
                        <DeezerAutocompleteResultRow key={track.id} track={track} onClick={onTrackClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeezerAutocomplete;
