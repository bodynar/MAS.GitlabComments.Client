
import { SimpleButtonProps } from '../../types';

/** Simple button component, without icon */
export const SimpleButton = ({ className, disabled, onClick, caption, title }: SimpleButtonProps): JSX.Element => {
    return (
        <button
            className={className}
            disabled={disabled}
            onClick={onClick}
            title={title}
        >
            {caption}
        </button>
    );
};
