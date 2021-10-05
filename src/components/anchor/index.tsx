import React from 'react';

import './anchor.scss';

import { isNullOrEmpty, isNullOrUndefined } from '@app/utils/common';

import Icon from '@app/sharedComponents/icon';
import { ElementIcon } from '@app/sharedComponents/icon/elementIcon';

export type AnchorProps = {
    /** Link destination */
    href: string;

    /** Link caption  */
    caption?: string;

    /** Click handler */
    onClick?: () => void;

    /** Configuration od inner icon */
    icon?: ElementIcon;

    /** Title of anchor */
    title?: string;

    /** Where to open the linked document */
    target?: '_blank' | '_top';

    /** Additional class names */
    className?: string;
};

/** Anchor component */
export default function Anchor(props: AnchorProps): JSX.Element {
    if (isNullOrUndefined(props.caption) && isNullOrUndefined(props.icon)) {
        throw new Error("No anchor content provided");
    }

    const className: string = 'app-anchor'
        + (!isNullOrEmpty(props.className) ? ` ${props.className}` : '');

    if (isNullOrUndefined(props.icon)) {
        return (
            <SimpleAnchor
                {...props}
                className={className}
                onClick={props.onClick}
            />
        );
    }

    return (
        <AnchorWithIcon
            {...props}
            className={className}
            onClick={props.onClick}
            icon={props.icon as ElementIcon}
        />
    );
}

type SimpleAnchorProps = {
    /** Link destination */
    href: string;

    /** Class names */
    className: string;

    /** Click handler */
    onClick?: () => void;

    /** Link caption  */
    caption?: string;

    /** Title of anchor */
    title?: string;

    /** Where to open the linked document */
    target?: '_blank' | '_top';
};

/** Simple anchor component, without icon */
const SimpleAnchor = ({ href, className, onClick, caption, title, target }: SimpleAnchorProps): JSX.Element => {
    return (
        <a
            className={className}
            href={href}
            title={title}
            target={target}
            onClick={onClick}
        >
            {caption}
        </a>
    );
};

type AnchorWithIconProps = SimpleAnchorProps & {
    /** Configuration of icon */
    icon: ElementIcon;
};

/** Anchor with icon component */
const AnchorWithIcon = ({ href, className, onClick, caption, title, target, icon }: AnchorWithIconProps): JSX.Element => {
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

