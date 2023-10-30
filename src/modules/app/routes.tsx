import { isStringEmpty } from "@bodynarf/utils";

import { MenuItem } from "@app/models/app";

import Comments from "@app/modules/comments";
import Stats from "@app/modules/stats";

/** Static navbar menu */
export const menuItems: Array<MenuItem> = [
    {
        name: "Comments",
        caption: "Comments",
        link: "/",
        component: <Comments />,
    },
    {
        name: "stats",
        caption: "Statistics",
        link: "/stats/",
        component: <Stats />,
    }
]
    .filter(x => !isStringEmpty(x.name) && !isStringEmpty(x.link));
