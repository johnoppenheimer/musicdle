import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameGuess = {
    answer: string;
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

type AddGameGuessPayload = {
    trackId: number;
} & GameGuess;

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
            const { trackId, ...gameGuess } = action.payload;
            const gameState = state.find((_gameState) => _gameState.trackId === trackId);
            if (gameState != null) {
                gameState.guessList.push(gameGuess);
            }

            if (gameState?.guessList.length === 6) {
                gameState.gotCorrect = gameGuess.correct;
                gameState.hasFinished = true;
                gameState.score = gameState.guessList.length;
            }
        },
    },
});

export const { initGame, startGame, addGuess } = gameSlice.actions;

export default gameSlice.reducer;
