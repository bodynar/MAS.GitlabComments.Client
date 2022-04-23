import { useCallback, useEffect } from "react";

import { connect } from "react-redux";

import { Route, Routes } from "react-router-dom";

import './app.scss';

import { isNullOrUndefined } from "@app/utils/common";

import { CompositeAppState } from "@app/redux/rootReducer";

import { setTabIsFocused } from "@app/redux/app/actions";
import { getReadOnlyMode } from "@app/redux/app/thunks/getReadOnlyMode";

import ModalBox from '@app/modules/modalBox';

import Notificator from '../components/notificator/component/notificator';
import Navbar from "../components/navbar/component/navbar";
import ReadOnlyModeNote from "../components/readOnlyModeNote";
import Footer from "../components/footer";

import { menuItems } from "../components/navbar/menu";

type AppPropsType = {
    /** Store state of app tab focus */
    setTabIsFocused: (isFocused: boolean) => void;

    /** Is application in read only mode */
    readOnlyMode?: boolean;

    /** Is app in dark mode */
    isDarkMode?: boolean;

    /** Read readonly mode value and save it in store */
    getReadOnlyMode: () => void;
};

/** Root app component */
function App({ setTabIsFocused, readOnlyMode, getReadOnlyMode, isDarkMode }: AppPropsType): JSX.Element {
    const onFocus = useCallback(() => { setTabIsFocused(true); }, [setTabIsFocused]);
    const onBlur = useCallback(() => { setTabIsFocused(false); }, [setTabIsFocused]);

    useEffect(() => {
        if (isNullOrUndefined(readOnlyMode)) {
            getReadOnlyMode();
        }
    }, [getReadOnlyMode, readOnlyMode]);

    useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        return (): void => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, [onBlur, onFocus]);

    const className: string = isDarkMode === true
        ? 'app app--dark'
        : 'app';

    return (
        <main className={className}>
            <Navbar className="app__navbar" />
            <ModalBox />
            <Notificator />
            <section className="app__content container">
                <AppContent isReadOnly={readOnlyMode === true} />
            </section>
            <Footer className="app__footer" />
        </main>
    );
}

// todo: v2 update solution
function AppContent({ isReadOnly }: { isReadOnly: boolean; }): JSX.Element {

    return (
        <>
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
}

export default connect(
    ({ app }: CompositeAppState) => ({
        readOnlyMode: app.readOnlyMode,
        isDarkMode: app.isDarkMode
    }),
    {
        setTabIsFocused: setTabIsFocused,
        getReadOnlyMode: getReadOnlyMode
    }
)(App);
