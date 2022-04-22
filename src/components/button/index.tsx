import './button.scss';
import './button.dark.scss';

import { isNullOrEmpty, isNullOrUndefined, isStringEmpty } from '@app/utils/common';

import { ElementIcon, IconSize } from '@app/sharedComponents/icon/elementIcon';

import { ButtonType } from './types';
import { ButtonWithIcon } from './components/buttonWithIcon/buttonWithIcon';
import { SimpleButton } from './components/simpleButton/simpleButton';

type ButtonProps = {
    /** Button displaying text */
    caption?: string;

    /** Type of button (color)  */
    type: ButtonType;

    /** Configuration of inner icon */
    icon?: ElementIcon;

    /** Button size  */
    size?: IconSize; // TODO: fix this type using

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

    if (!isNullOrUndefined(props.icon)) {
        return (
            <ButtonWithIcon
                {...props}
                className={className}
                onClick={props.onClick}
                icon={props.icon as ElementIcon}
            />
        );
    } else {
        return (
            <SimpleButton
                {...props}
                className={className}
                onClick={props.onClick}
            />
        );
    }
}
