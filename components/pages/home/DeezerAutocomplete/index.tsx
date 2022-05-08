import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDeezerSearch } from '../../../../libraries/deezer/hooks';
import DeezerAutocompleteInput from './DeezerAutocompleteInput';
import DeezerAutocompleteResultRow from './DeezerAutocompleteResultRow';

const DeezerAutocomplete = () => {
    const [query, setQuery] = useState('');

    const { isLoading, data } = useDeezerSearch(query);

    return (
        <div>
            <DeezerAutocompleteInput value={query} onChangeText={setQuery} isLoading={isLoading} />
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
