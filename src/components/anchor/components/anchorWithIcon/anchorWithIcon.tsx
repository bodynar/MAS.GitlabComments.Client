import { isNullOrEmpty } from '@bodynarf/utils/common';

import Icon from '@app/sharedComponents/icon';

import { AnchorWithIconProps } from "../../types";

/** Anchor with icon component */
export const AnchorWithIcon = ({ href, className, onClick, caption, title, target, icon }: AnchorWithIconProps): JSX.Element => {
    const iconPosition = icon.position || 'left';

    const iconClassName: string = isNullOrEmpty(caption)
        ? icon.className
        : iconPosition === 'left'
            ? `${icon.className} app-icon--left`
            : `${icon.className} app-icon--right`;


    if (iconPosition === 'left') {
        return (
            <a
                href={href}
                className={className}
                title={title}
                target={target}
                onClick={onClick}
            >
                <Icon {...icon} className={iconClassName} />
                {caption}
            </a>
        );
    }

    return (
        <a
            href={href}
            className={className}
            title={title}
            target={target}
            onClick={onClick}
        >
            {caption}
            <Icon {...icon} className={iconClassName} />
        </a>
    );
};
