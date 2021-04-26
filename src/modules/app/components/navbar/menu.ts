import { isStringEmpty } from "@app/utils/common";

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
}

/** Static navbar menu */
export const menuItems: Array<MenuItem> = [
    {
        name: 'Comments',
        caption: 'Comments',
        link: '/'
    },
    // {
    //     name: 'stats',
    //     caption: 'Statistics',
    //     link: '/stats/',
    //     disabled: true
    // }
].filter(x => !isStringEmpty(x.name) && !isStringEmpty(x.link));
