export type DeezerArtist = {
    id: number;
    name: string;
    link: string;
    share: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    nb_album: number;
    nb_fan: number;
    radio: boolean;
    tracklist: string;
};

export type DeezerAlbum = {
    id: number;
    title: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
};

export type DeezerTrack = {
    id: number;
    readable: boolean;
    title: string;
    title_short: string;
    title_version: string;
    link: string;
    duration: number;
    rank: number;
    explicit_lyrics: boolean;
    preview: string;
    artist: DeezerArtist;
    album: DeezerAlbum;
};

export type DeezerSearchResponse = {
    data: DeezerTrack[];
    total: number;
    next?: string;
};
