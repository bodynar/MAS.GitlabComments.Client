import React from 'react';

import './anchor.scss';

import { isNullOrEmpty, isNullOrUndefined } from '@app/utils/common';

import { ElementIcon, ElementSize } from '@app/sharedComponents/types';

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

/**
 * Anchor component
 * @throws Caption is not defined and icon configuration is not defined at the same time
 */
export default function Anchor(props: AnchorProps): JSX.Element {
    if (isNullOrEmpty(props.caption)
        && (isNullOrUndefined(props.icon)
            || (isNullOrEmpty(props.icon?.className)
                && isNullOrUndefined(props.icon?.iconComponent))
        )
    ) {
        throw new Error("No anchor content provided.");
    }

    const className: string = 'app-anchor'
        + (!isNullOrEmpty(props.className) ? ` ${props.className}` : '');

    if (!isNullOrUndefined(props.icon)) {
        return (
            <AnchorWithIcon
                {...props}
                className={className}
                onClick={props.onClick}
                icon={props.icon as ElementIcon}
            />
        );
    } else {
        return (
            <SimpleAnchor
                {...props}
                className={className}
                onClick={props.onClick}
            />
        );
    }
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
    const isCaptionNullOrEmpty: boolean = isNullOrEmpty(caption);

    return (
        <a
            href={href}
            className={className}
            title={title}
            target={target}
            onClick={onClick}
        >
            {iconPosition === 'left'
                ? <>
                    <AnchorIcon
                        {...icon}
                        position={iconPosition}
                    />
                    {!isCaptionNullOrEmpty
                        && <span>
                            {caption}
                        </span>
                    }
                </>
                : <>
                    {!isCaptionNullOrEmpty
                        && <span>
                            {caption}
                        </span>
                    }
                    <AnchorIcon
                        {...icon}
                        position={iconPosition}
                    />

                </>}
        </a>
    );
};

/** Ancrhor icon component */
const AnchorIcon = (icon: ElementIcon, iconPosition: 'left' | 'right'): JSX.Element => {
    const iconsSize: ElementSize = icon.size || 'normal';

    const iconClassName: string = 'icon'
        + (iconsSize === 'normal' ? '' : ` is-${iconsSize}`)
        + (iconPosition === 'left' ? ' icon--left' : ' icon--right');

    if (!isNullOrUndefined(icon.iconComponent)) {
        return (
            <span className={iconClassName}>
                {icon.iconComponent}
            </span>
        );
    } else {
        return (
            <span className={iconClassName}>
                <i className={icon.className} />
            </span>
        );
    }
};
