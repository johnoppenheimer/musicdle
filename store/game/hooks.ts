import { useAppSelector } from '../hooks';

export const useGameState = (trackId: number) => {
    return useAppSelector((state) => state.game.find((gameState) => gameState.trackId === trackId));
};
