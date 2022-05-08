export const secondsAllowedForNbGuess = (guessLength: number): number => {
    switch (guessLength) {
        case 0:
            return 1;
        case 1:
            return 2;
        case 2:
            return 4;
        case 3:
            return 7;
        case 4:
            return 11;
        default:
            return 16;
    }
};
