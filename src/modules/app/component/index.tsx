import { FC, useCallback, useEffect } from "react";

import { connect } from "react-redux";

import { getClassName, isNullOrUndefined } from "@bodynarf/utils";

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
import LoaderWrap from "../components/loadingWrap";

type AppProps = {
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
    isDarkMode: boolean;

    /** Read readonly mode value and save it in store */
    getReadOnlyMode: () => void;
};

/** Root app component */
const App: FC<AppProps> = ({
    isLoading, isDarkMode, readOnlyMode,
    setTabIsFocused, getReadOnlyMode,
}) => {
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

    const className = getClassName([
        "app",
        isDarkMode ? "app--dark" : "",
        isLoading ? "app--loading" : "",
    ]);

    return (
        <main className={className}>
            <LoaderWrap
                loading={isLoading}
            >
                <section className="app__container">
                    <Navbar className="app__navbar" />
                    <Notificator />
                    <ModalBox />
                    <section className="app__content container">
                        <AppContent
                            isReadOnly={readOnlyMode === true}
                        />
                    </section>
                    <Footer className="app__footer" />
                </section>
            </LoaderWrap >
        </main>
    );
};

export default connect(
    ({ app }: CompositeAppState) => ({
        readOnlyMode: app.readOnlyMode,
        isDarkMode: app.isDarkMode ?? false,
        isLoading: app.loading,
    }) as Pick<AppProps, "readOnlyMode" | "isDarkMode" | "isLoading">,
    {
        setTabIsFocused: setTabIsFocused,
        getReadOnlyMode: getReadOnlyMode,
    }
)(App);
