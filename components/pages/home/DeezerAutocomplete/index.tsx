import { useState } from 'react';
import { useDeezerSearch } from '../../../../libraries/deezer/hooks';
import DeezerAutocompleteResultRow from './DeezerAutocompleteResultRow';

const DeezerAutocomplete = () => {
    const [query, setQuery] = useState('');

    const { isLoading, data } = useDeezerSearch(query);

    return (
        <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="bg-neutral-600" />
            {isLoading && <p>Loading</p>}
            {data != null && (
                <div>
                    {data.data.map((track) => (
                        <DeezerAutocompleteResultRow key={track.id} track={track} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeezerAutocomplete;
