import { ElementIcon } from "../types";

/** Button types according to Bulma framework */
export type ButtonType =
    'default' /** color: transparent */
    | 'primary' /** color: seawave green */
    | 'link' /** color: blue-violet */
    | 'info' /** color: sky-blue */
    | 'success' /** color: green */
    | 'warning' /** color: yellow */
    | 'danger' /** color: red */
    | 'white' /** color: white */
    | 'light' /** color: light-gray */
    | 'dark' /** color: dark-gray */
    | 'black' /** color: black */
    | 'text' /** Underline text with color: gray */
    | 'ghost' /** Blue underline text with color: transparent */
    ;

export type SimpleButtonProps = {
    /** Button class name*/
    className: string;

    /** Button click handler */
    onClick?: () => void;

    /** Button caption */
    caption?: string;

    /** Disabled attribute value*/
    disabled?: boolean;

    /** Title on hover */
    title?: string;
};

export type ButtonWithIconProps = SimpleButtonProps & {
    /** Icon configuration */
    icon: ElementIcon;
};
