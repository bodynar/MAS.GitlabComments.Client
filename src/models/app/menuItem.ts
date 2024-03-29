/** Model for navbar menu items */
export interface MenuItem {
    /** Unique name */
    name: string;

    /** Caption */
    caption: string;

    /** Target route link */
    link: string;

    /** Should item be readonly */
    disabled?: boolean;

    /** Which component should be rendered as module */
    component: JSX.Element;

    /** Order position */
    order: number;

    /** Manual display component */
    customDisplay?: React.ReactNode;
}
