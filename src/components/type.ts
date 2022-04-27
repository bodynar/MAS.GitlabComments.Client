/** Base interface for component props */
export interface BaseElementProps {
    /** Additional class names */
    className?: string;

    /** Title */
    title?: string;

    /** Extra data-* attributes */
    data?: {
        /**Will add data-{key} attribute to element */
        [key: string]: any;
    };
}
