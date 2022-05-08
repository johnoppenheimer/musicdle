import { useEffect } from 'react';
import classNames from 'classnames';
import { XIcon } from '@heroicons/react/outline';
import { useAppDispatch } from '../../../store/hooks';
import { initGame } from '../../../store/game/slice';
import { useGameState } from '../../../store/game/hooks';
import { useTrackContext } from '../../../helpers/context/TrackContext';

type GameComponentProps = Record<string, never>;

const GameComponent = ({}: GameComponentProps) => {
    const { track } = useTrackContext();
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
                        className={classNames('h-10 w-full border border-neutral-600 flex items-center px-4', {
                            'border-white': index === gameState.guessList.length,
                        })}
                    >
                        {gameState.guessList[index]?.skipped && (
                            <span className="font-mono font-semibold text-sm tracking-widest text-neutral-500">
                                SKIPPED
                            </span>
                        )}
                        {gameState.guessList[index]?.answer != null && (
                            <div className="flex flex-row items-center">
                                <XIcon className="w-5 h-5 text-red-600" />
                                <span className="text-neutral-500 ml-2">{gameState.guessList[index]?.answer}</span>
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default GameComponent;
