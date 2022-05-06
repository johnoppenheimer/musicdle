import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './game/slice';

const initializeStore = () => {
    const store = configureStore({
        devTools: process.env.NODE_ENV === 'development',
        reducer: {
            game: gameReducer,
        },
    });

    return store;
};

export type RootStore = ReturnType<typeof initializeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];

export default initializeStore();
