import React, { PropsWithChildren, useContext } from 'react';
import { DeezerTrack } from '../../libraries/deezer/type';

type TrackContextState = {
    track: DeezerTrack;
};

export const TrackContext = React.createContext<TrackContextState | undefined>(undefined);

type TrackProviderProps = TrackContextState;

export const TrackProvider = ({ track, children }: PropsWithChildren<TrackProviderProps>) => {
    return <TrackContext.Provider value={{ track }}>{children}</TrackContext.Provider>;
};

export const useTrackContext = () => {
    const context = useContext(TrackContext);
    if (context == null) {
        throw new Error('useTrackContext must be within a TrackProvider');
    }
    return context;
};
