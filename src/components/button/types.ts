import { ElementSize } from "sharedComponents/types";

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

/** Button inner icon configuration */
export interface ButtonIcon {
    /** Size of icon */
    size?: ElementSize;

    /** Icon class name from css framework */
    className: string;

    /** Icon position: Before text content - right or after - left */
    position?: 'right' | 'left';
}
