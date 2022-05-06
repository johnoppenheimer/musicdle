import { useRouter } from 'next/router';
import { useAppSelector } from '../hooks';

export const useGameState = (trackId: number) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return useAppSelector((state) => state.game.find((gameState) => gameState.trackId === trackId))!;
};

export const useCurrentGameState = () => {
    const { query } = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return useAppSelector((state) => state.game.find((gameState) => gameState.trackId === Number(query.trackId)))!;
};
