import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameGuess = {
    trackId: number | null;
    answer: string | null;
    skipped: boolean;
    correct: boolean;
};

type GameState = {
    trackId: number;
    hasFinished: boolean;
    hasStarted: boolean;
    gotCorrect: boolean | null;
    guessList: GameGuess[];
    score: number | null;
};

const initialState: GameState[] = [];

type InitGamePayload = {
    trackId: number;
};

type StartGamePayload = {
    trackId: number;
};

type AddGameGuessPayload = { forTrackId: number } & Omit<GameGuess, 'correct'>;

const gameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        initGame: (state, action: PayloadAction<InitGamePayload>) => {
            const gameStateExists = state.findIndex((gameState) => gameState.trackId === action.payload.trackId) !== -1;

            if (!gameStateExists) {
                state.push({
                    trackId: action.payload.trackId,
                    hasStarted: false,
                    hasFinished: false,
                    gotCorrect: null,
                    guessList: [],
                    score: null,
                });
            }
        },
        startGame: (state, action: PayloadAction<StartGamePayload>) => {
            const gameState = state.find((_gameState) => _gameState.trackId === action.payload.trackId);
            if (gameState != null) {
                gameState.hasStarted = true;
            }
        },
        addGuess: (state, action: PayloadAction<AddGameGuessPayload>) => {
            const { forTrackId, ...gameGuess } = action.payload;
            const gameState = state.find((_gameState) => _gameState.trackId === forTrackId);

            if (gameState == null) {
                return;
            }

            const isCorrect = gameGuess.trackId === gameState.trackId;

            gameState.guessList.push({
                ...gameGuess,
                correct: isCorrect,
            });

            if (isCorrect) {
                gameState.gotCorrect = isCorrect;
                gameState.hasFinished = true;
                gameState.score = gameState.guessList.length;
            } else if (gameState?.guessList.length === 6) {
                gameState.gotCorrect = isCorrect;
                gameState.hasFinished = true;
                gameState.score = gameState.guessList.length;
            }
        },
    },
});

export const { initGame, startGame, addGuess } = gameSlice.actions;

export default gameSlice.reducer;
