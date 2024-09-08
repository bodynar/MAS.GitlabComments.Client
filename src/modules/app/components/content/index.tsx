import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { menuItems } from "../../routes";

import ReadOnlyModeNote from "../readOnlyModeNote";
import DevelopmentPanel from "../devPanel";

type AppContentProps = {
    /** Is application in read only mode */
    isReadOnly: boolean;
};

/**
 * Block of application main content
 */
const AppContent: FC<AppContentProps> = ({
    isReadOnly,
}) => {
    return (
        <>
            {import.meta.env.DEV &&
                <DevelopmentPanel />
            }
            {isReadOnly &&
                <ReadOnlyModeNote />
            }
            <Routes>
                {menuItems.map(menuItem =>
                    <Route
                        key={menuItem.name}
                        path={menuItem.link}
                        element={menuItem.component}
                    />
                )}
            </Routes>
        </>
    );
};

export default AppContent;
