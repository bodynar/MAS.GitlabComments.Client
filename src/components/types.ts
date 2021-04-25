export type ElementSize =
    | 'small'
    | 'normal' /** default size */
    | 'medium'
    | 'large'
    ;

export interface ElementIcon {
    /** Size of icon */
    size?: ElementSize;

    /** Icon class name from css framework */
    className?: string;

    /** Icon position: Before text content - right or after - left */
    position?: 'right' | 'left';

    // TODO: v2 - replace by component type
    /** Component */
    iconComponent?: JSX.Element;
}
