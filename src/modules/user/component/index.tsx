import { useCallback, useState } from "react";

import { generateGuid } from "@bodynarf/utils";
import Tabs, { TabItem } from "@bodynarf/react.components/components/tabs";

import VariablesList from "../components/variables";
import CommentsManagePanel from "../components/comments";

/**
 * @constant
 * @description User module tabs
 */
const tabs: Array<TabItem> = [
    {
        id: generateGuid(),
        caption: "Comments manage",
    },
    {
        id: generateGuid(),
        caption: "Variables",
    }
];

/**
 * @constant
 * @description Tab identifier to component map
 */
const tabContentMap = new Map<string, JSX.Element>([
    [tabs[0].id, <CommentsManagePanel key="comments" />],
    [tabs[1].id, <VariablesList key="sysVars" />],
]);

/** User module main component */
const UserModule = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState<TabItem>(tabs[0]);
    const onTabChange = useCallback(setActiveTab, [setActiveTab]);

    return (
        <>
            <Tabs
                items={tabs}
                onActiveItemChange={onTabChange}
            />
            {tabContentMap.has(activeTab.id)
                && tabContentMap.get(activeTab.id)!
            }
        </>
    );
};

/** User module main component */
export default UserModule;
