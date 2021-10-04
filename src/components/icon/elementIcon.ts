export type IconSize =
    'small'
    | 'medium' /** default size */
    | 'large';

export type IconPosition =
    'left'
    | 'right';

/** Icon for component configuration */
export interface ElementIcon {
    /**
     * Class name for icon.
     * Used to display icon from bootstrap-icons
    */
    className: string;

    /** Icon size */
    size?: IconSize;

    /**
     * Position
     * Works only with other content
    */
    position?: IconPosition;
}
