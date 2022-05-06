import Image from 'next/image';

type PlayPauseButtonProps = {
    isPlaying: boolean;
    onClick?: () => void;
};

const PlayPauseButton = ({ isPlaying, onClick }: PlayPauseButtonProps) => {
    return (
        <button type="button" onClick={onClick} className="flex">
            <div className="flex justify-center items-center h-24 w-24 relative overflow-hidden">
                {isPlaying ? (
                    <Image src="/icons/pause.svg" width={48} height={48} alt="Pause icon" />
                ) : (
                    <Image src="/icons/play.svg" width={48} height={48} alt="Play icon" />
                )}
            </div>
        </button>
    );
};

export default PlayPauseButton;
