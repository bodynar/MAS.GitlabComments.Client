import { useCallback, useEffect } from "react";

import { connect } from "react-redux";

import { isNullOrUndefined } from "@bodynarf/utils";

import "./style.scss";
import "../../../shared/styles/globalStyles.scss";
import "../../../shared/styles/darkStyles.scss";

import { CompositeAppState } from "@app/redux";
import { getReadOnlyMode, setTabIsFocused } from "@app/redux/app";

import ModalBox from "@app/modules/modalBox";

import Notificator from "../components/notificator";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AppContent from "../components/content";

interface AppProps {
    /** 
     * Is app currently loading something important.
     * If so - covers content with loading gif block
    */
    isLoading: boolean;

    /** Store state of app tab focus */
    setTabIsFocused: (isFocused: boolean) => void;

    /** Is application in read only mode */
    readOnlyMode?: boolean;

    /** Is app in dark mode */
    isDarkMode?: boolean;

    /** Read readonly mode value and save it in store */
    getReadOnlyMode: () => void;
}

/** Root app component */
function App({
    isLoading, isDarkMode, readOnlyMode,
    setTabIsFocused, getReadOnlyMode,
}: AppProps): JSX.Element {
    const onFocus = useCallback(() => setTabIsFocused(true), [setTabIsFocused]);
    const onBlur = useCallback(() => setTabIsFocused(false), [setTabIsFocused]);

    useEffect(() => {
        if (isNullOrUndefined(readOnlyMode)) {
            getReadOnlyMode();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);

        return (): void => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
    }, [onBlur, onFocus]);

    const className: string = isDarkMode === true
        ? "app app--dark"
        : "app";

    return (
        <main className={className}>
            <Navbar className="app__navbar" />
            <ModalBox />
            <Notificator />
            <section className="app__content container">
                <AppContent
                    isReadOnly={readOnlyMode === true}
                    isLoading={isLoading}
                />
            </section>
            <Footer className="app__footer" />
        </main>
    );
}

export default connect(
    ({ app }: CompositeAppState) => ({
        readOnlyMode: app.readOnlyMode,
        isDarkMode: app.isDarkMode,
        isLoading: app.loading,
    }),
    {
        setTabIsFocused: setTabIsFocused,
        getReadOnlyMode: getReadOnlyMode,
    }
)(App);
