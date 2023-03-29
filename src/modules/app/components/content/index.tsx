import { Route, Routes } from "react-router-dom";

import "./style.scss";

import loading from "@app/assets/loading01.svg";

import { menuItems } from "../navbar/menu";

import ReadOnlyModeNote from "../readOnlyModeNote";
import DevelopmentPanel from "../devPanel";

interface AppContentProps {
    /** 
     * Is app currently loading something important.
     * If so - covers content with loading gif block
    */
    isLoading: boolean;

    /** Is application in read only mode */
    isReadOnly: boolean;
}

/**
 * Block of application main content
 */
const AppContent = ({
    isLoading, isReadOnly,
}: AppContentProps): JSX.Element => {
    return (
        <>
            {import.meta.env.DEV &&
                <DevelopmentPanel />
            }
            {isReadOnly &&
                <ReadOnlyModeNote />
            }
            <div className="app-loading-cover">
                {isLoading &&
                    <div className="app-loading-cover__image">
                        <img src={loading} alt="loading" />
                    </div>
                }
                <div
                    className="app-loading-cover__content"
                    data-disabled={isLoading}
                >
                    <Routes>
                        {menuItems.map(menuItem =>
                            <Route
                                key={menuItem.name}
                                path={menuItem.link}
                                element={menuItem.component}
                            />
                        )}
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default AppContent;
