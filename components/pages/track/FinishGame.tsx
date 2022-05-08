import { ShareIcon } from '@heroicons/react/outline';
import Tippy, { TippyProps } from '@tippyjs/react';
import { useTrackContext } from '../../../helpers/context/TrackContext';
import { useCurrentGameState } from '../../../store/game/hooks';

import 'tippy.js/animations/shift-away.css';

const FinishGame = () => {
    const { track } = useTrackContext();
    const { gotCorrect, guessList } = useCurrentGameState();

    const shareResult = () => {
        const emojiScore = Array(6)
            .fill(0)
            .map((_v, index) => {
                const guess = guessList[index];
                if (guess != null) {
                    if (guess.correct) {
                        return '🟩';
                    } else if (guess.skipped) {
                        return '⬛️';
                    } else {
                        return '🟥';
                    }
                }
                return '⬜️';
            })
            .join('');

        const url = window.location.protocol + '//' + window.location.host;
        navigator.clipboard.writeText(`Musicdle #${track.id}\n${emojiScore}\n\n${url}`);
    };

    const onTooltipShow: TippyProps['onShow'] = (instance) => {
        setTimeout(() => {
            instance.hide();
        }, 2000);
    };

    return (
        <div>
            <iframe
                title="deezer-widget"
                src={`https://widget.deezer.com/widget/dark/track/${track.id}`}
                width="100%"
                height="300"
                frameBorder="0"
                allowTransparency
                allow="encrypted-media; clipboard-write"
                className="mt-4"
            ></iframe>
            <div className="flex flex-col items-center mt-10">
                <span className="font-semibold tracking-widest text-neutral-500">
                    {gotCorrect ? '🎉 CONGRATS!' : 'UNLUCKY!'}
                </span>
                <Tippy
                    content={<span className="bg-neutral-200 text-black px-2 py-1">Copied!</span>}
                    trigger="click"
                    animation="shift-away"
                    duration={100}
                    onShow={onTooltipShow}
                >
                    <button
                        type="button"
                        className="px-2 py-1 mt-3 bg-green-700 font-semibold font-mono text-lg flex items-center"
                        onClick={shareResult}
                    >
                        share <ShareIcon className="w-5 h-5 ml-2" />
                    </button>
                </Tippy>
            </div>
        </div>
    );
};

export default FinishGame;
