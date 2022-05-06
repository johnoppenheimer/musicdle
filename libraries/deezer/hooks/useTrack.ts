import { useQuery } from 'react-query';
import type { DeezerTrack } from '../type';
import axios from 'axios';

export const useDeezerTrack = (trackId: string) => {
    return useQuery(['deezer-search', trackId], async () => {
        const res = await axios.get<DeezerTrack>('/api/deezer/track/' + trackId);

        return res.data;
    });
};
