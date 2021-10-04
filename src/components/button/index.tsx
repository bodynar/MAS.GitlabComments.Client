import React from 'react';

import './button.scss';

import { isNullOrEmpty, isNullOrUndefined, isStringEmpty } from '@app/utils/common';

import { ElementIcon, IconSize } from '@app/sharedComponents/icon/elementIcon';

import { ButtonType } from './types';

export type ButtonProps = {
    /** Button displaying text */
    caption?: string;

    /** Type of button (color)  */
    type: ButtonType;

    /** Configuration of inner icon */
    icon?: ElementIcon;

    /** Button size  */
    size?: IconSize;

    /** Title on hover */
    title?: string;

    /** Is button uses light version of color  */
    light?: boolean;

    /** Is button outlined */
    outlined?: boolean;

    /** Should button corners be rounded  */
    rounded?: boolean;

    /** Display loading icon */
    isLoading?: boolean;

    /** Is button disabled */
    disabled?: boolean;

    /** Click action handler */
    onClick?: () => void;
};

/**
 * Button component
 * @throws Caption is not defined and icon configuration is not defined at the same time
 */
export default function Button(props: ButtonProps): JSX.Element {
    if ((isNullOrEmpty(props.caption))
        && (isNullOrUndefined(props.icon) || isStringEmpty(props.icon?.className as string))
    ) {
        throw new Error("No button content provided.");
    }

    const className: string =
        `button is-${props.type}`
        + (props.light === true ? ' is-light' : '')
        + (!isNullOrUndefined(props.size) ? ` is-${props.size}` : '')
        + (props.outlined === true ? ' is-outlined' : '')
        + (props.rounded === true ? ' is-rounded' : '')
        + (props.isLoading === true ? ' is-loading' : '');

    const onClick = React.useCallback(() => {
        if (!isNullOrUndefined(props.onClick)) {
            props.onClick?.call(null);
        }
    }, [props.onClick]);

    if (!isNullOrUndefined(props.icon)) {
        return (
            <ButtonWithIcon
                {...props}
                className={className}
                onClick={onClick}
                icon={props.icon as ElementIcon}
            />
        );
    } else {
        return (
            <SimpleButton
                {...props}
                className={className}
                onClick={onClick}
            />
        );
    }
}

type SimpleButtonProps = {
    /** Button class name*/
    className: string;

    /** Button click handler */
    onClick: () => void;

    /** Button caption */
    caption?: string;

    /** Disabled attribute value*/
    disabled?: boolean;

    /** Title on hover */
    title?: string;
};

/** Simple button component, without icon */
const SimpleButton = ({ className, disabled, onClick, caption, title }: SimpleButtonProps): JSX.Element => {
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

type ButtonWithIconProps = SimpleButtonProps & {
    /** Icon configuration */
    icon: ElementIcon;
};

/** Button with icon component */
const ButtonWithIcon = ({ className, disabled, onClick, caption, title, icon }: ButtonWithIconProps): JSX.Element => {
    const iconPosition = icon.position || 'left';

    const iconsSize: ElementSize = icon.size || 'normal';

    const iconClassName: string = "icon"
        + (iconsSize === 'normal' ? '' : ` is-${iconsSize}`);

    const isCaptionNullOrEmpty: boolean = isNullOrEmpty(caption);

    return (
        <button
            className={className}
            disabled={disabled}
            onClick={onClick}
            title={title}
        >
            {iconPosition === 'left'
                ? <>
                    <span className={iconClassName}>
                        <i className={icon.className} />
                    </span>
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
                    <span className={iconClassName}>
                        <i className={icon.className} />
                    </span>

                </>}
        </button>
    );
};
