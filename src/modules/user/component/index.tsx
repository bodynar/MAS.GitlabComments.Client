import { useCallback, useState } from "react";

import Tabs, { TabItem } from "@bodynarf/react.components/components/tabs";

import VariablesList from "../components/variables";
import MergeCommentsComponent from "../components/mergeComments";
import MigrationModule from "../components/migration";

/**
 * @constant
 * @description User module tabs
 */
const tabs: Array<TabItem> = [
    {
        id: "merge-comments",
        caption: "Merge comments",
    },
    {
        id: "sysVars",
        caption: "Variables",
    },
    {
        id: "migration",
        caption: "Migration",
    },
];

/**
 * @constant
 * @description Tab identifier to component map
 */
const tabContentMap = new Map<string, JSX.Element>([
    ["merge-comments", <MergeCommentsComponent key="merge-comments" />],
    ["sysVars", <VariablesList key="sysVars" />],
    ["migration", <MigrationModule key="migration" />],
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
            <section aria-label={activeTab.id}>
                {tabContentMap.has(activeTab.id)
                    && tabContentMap.get(activeTab.id)!
                }
            </section>
        </>
    );
};

/** User module main component */
export default UserModule;
