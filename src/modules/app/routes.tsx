import { isStringEmpty } from "@bodynarf/utils";

import { MenuItem } from "@app/models/app";

import Comments from "@app/modules/comments";
import Stats from "@app/modules/stats";
import UserModuleRef from "./components/navbar/components/user";
import UserModule from "../user/component";

/** Static navbar menu */
export const menuItems: Array<MenuItem> = [
    {
        order: 0,
        name: "userModule",
        caption: "User",
        link: "/user/",
        customDisplay: <UserModuleRef key="user-module-ref"/>,
        component: <UserModule />
    },
    {
        order: 1,
        name: "Comments",
        caption: "Comments",
        link: "/",
        component: <Comments />,
    },
    {
        order: 2,
        name: "stats",
        caption: "Statistics",
        link: "/stats/",
        component: <Stats />,
    }
]
    .filter(x => !isStringEmpty(x.name) && !isStringEmpty(x.link));
