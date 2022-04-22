
import { isNullOrEmpty } from '@app/utils/common';

import Icon from '@app/sharedComponents/icon';

import { ButtonWithIconProps } from '../../types';

/** Button with icon component */
export const ButtonWithIcon = ({ className, disabled, onClick, caption, title, icon }: ButtonWithIconProps): JSX.Element => {
    const iconPosition = icon.position || 'left';

    const iconClassName: string = isNullOrEmpty(caption)
        ? icon.className
        : iconPosition === 'left'
            ? `${icon.className} app-icon--left`
            : `${icon.className} app-icon--right`;

    className = isNullOrEmpty(caption)
        ? `${className} button--icon-only`
        : className;

    if (iconPosition === 'left') {
        return (
            <button
                className={className}
                disabled={disabled}
                onClick={onClick}
                title={title}
            >
                <Icon {...icon} className={iconClassName} />
                {caption}
            </button>
        );
    }

    return (
        <button
            className={className}
            disabled={disabled}
            onClick={onClick}
            title={title}
        >
            {caption}
            <Icon {...icon} className={iconClassName} />
        </button>
    );
};
