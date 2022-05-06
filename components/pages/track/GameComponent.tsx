import { useEffect } from 'react';
import classNames from 'classnames';
import { DeezerTrack } from '../../../libraries/deezer/type';
import { useAppDispatch } from '../../../store/hooks';
import { initGame } from '../../../store/game/slice';
import { useGameState } from '../../../store/game/hooks';

type GameComponentProps = {
    track: DeezerTrack;
};

const GameComponent = ({ track }: GameComponentProps) => {
    const gameState = useGameState(track.id);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initGame({ trackId: track.id }));
    }, [dispatch, track.id]);

    if (gameState == null) {
        return <></>;
    }

    return (
        <div className="flex flex-col gap-y-3">
            {Array(6)
                .fill(0)
                .map((_v, index) => (
                    <div
                        key={`game-guess-${index}`}
                        className={classNames('h-12 w-full border border-neutral-600', {
                            'border-white': index === gameState.guessList.length,
                        })}
                    >
                        <></>
                    </div>
                ))}
        </div>
    );
};

export default GameComponent;
