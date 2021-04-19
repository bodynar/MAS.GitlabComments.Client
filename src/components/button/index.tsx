import React from 'react';

import { isNullOrUndefined } from 'utils/common';

import { ButtonSize, ButtonType } from './types';

export type ButtonProps = {
    /** Button displaying text */
    caption: string;

    /** Type of button (color)  */
    type: ButtonType;

    /** Button size  */
    size?: ButtonSize;

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

export default function Button(props: ButtonProps): JSX.Element {
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

    return (
        <button
            className={className}
            disabled={props.disabled}
            onClick={onClick}
        >
            {props.caption}
        </button>
    );
}
