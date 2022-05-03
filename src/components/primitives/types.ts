import { BaseElementProps } from "../types";

/** Base properties for input components */
export type BaseInputElementProps<TValue> = BaseElementProps & {
    /** Value change handler. Changed value must be stored outside of component */
    onValueChange: (value: TValue) => void;

    /** Default value of input component*/
    defaultValue?: TValue;

    /** Input element placeholder */
    placeholder?: string;

    /** Is component borders are rounded */
    rounded?: boolean;

    /** Should be component disabled. Selecting is not allowed */
    disabled?: boolean;

    /** Should be component int read only mode. Selecting is allowed */
    readonly?: boolean;

    /** Component size */
    size?: InputSize;

    /** Label configuration */
    label?: InputLabel;

    /** Displaying loading state of component as spinner in right end of component */
    loading?: boolean;

    /** Style. Colors the border */
    style?: InputColor;

    /** Name of element. Required for form elements */
    name?: string;
};

/** Input label configuration */
export type InputLabel = {
    /** Label textual content to describe input requirements */
    caption: string;

    /** Should component be on same line with label */
    horizontal?: boolean;
};

/** Input component size variety */
export type InputSize =
    | 'small'
    | 'normal'
    | 'medium'
    | 'large'
    ;

/** Input component border-color type */
export type InputColor =
    | 'default' /** color: transparent */
    | 'primary' /** color: seawave green */
    | 'link' /** color: blue-violet */
    | 'info' /** color: sky-blue */
    | 'success' /** color: green */
    | 'warning' /** color: yellow */
    | 'danger' /** color: red */
    ;
