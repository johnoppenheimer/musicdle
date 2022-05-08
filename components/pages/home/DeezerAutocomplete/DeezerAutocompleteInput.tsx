import Spinner from '../../../Spinner';

type DeezerAutocompleteInputProps = {
    value: string;
    onChangeText?: (value: string) => void;
    isLoading?: boolean;
};

const DeezerAutocompleteInput = ({ value, onChangeText, isLoading = false }: DeezerAutocompleteInputProps) => {
    return (
        <div className="relative flex my-2">
            <input
                value={value}
                onChange={(e) => onChangeText?.(e.target.value)}
                className="bg-neutral-600 h-11 w-full pl-2 pr-8"
                placeholder="e.g: Daft Punk"
            />
            {isLoading && (
                <div className="absolute right-0 h-full flex items-center justify-center mr-2">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default DeezerAutocompleteInput;
