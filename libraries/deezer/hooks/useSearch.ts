import { useQuery } from 'react-query';
import type { DeezerSearchResponse } from '../type';
import axios from 'axios';
import useDebounce from '../../../helpers/hooks/useDebounce';

export const useDeezerSearch = (query: string, debounce = 500) => {
    const debouncedSearch = useDebounce(query, debounce);

    return useQuery(
        ['deezer-search', debouncedSearch],
        async () => {
            const res = await axios.get<DeezerSearchResponse>('/api/deezer/search', {
                params: {
                    q: debouncedSearch,
                },
            });

            return res.data;
        },
        {
            enabled: debouncedSearch != null && debouncedSearch !== '',
            retry: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
        },
    );
};
