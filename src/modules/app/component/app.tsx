import React from "react";
import { connect } from "react-redux";

import './app.scss';

import { isNullOrUndefined } from "@app/utils/common";

import { CompositeAppState } from "@app/redux/rootReducer";

import { setTabIsFocused } from "@app/redux/app/action";
import { getReadOnlyMode } from "@app/redux/app/thunks/getReadOnlyMode";

import Comments from "@app/modules/comments";
import ModalBox from '@app/modules/modalBox';

import Notificator from '../components/notificator/notificator';
import Navbar from "../components/navbar/navbar";
import ReadOnlyModeNote from "../components/readOnlyModeNote";
import Footer from "../components/footer";

type AppPropsType = {
    /** Store state of app tab focus */
    setTabIsFocused: (isFocused: boolean) => void;

    /** Is application in read only mode */
    readOnlyMode?: boolean;

    /** Read readonly mode value and save it in store */
    getReadOnlyMode: () => void;
};

/** Root app component */
function App({ setTabIsFocused, readOnlyMode, getReadOnlyMode }: AppPropsType): JSX.Element {
    const onFocus = React.useCallback(() => {
        setTabIsFocused(true);
    }, [setTabIsFocused]);

    const onBlur = React.useCallback(() => {
        setTabIsFocused(false);
    }, [setTabIsFocused]);

    React.useEffect(() => {
        if (isNullOrUndefined(readOnlyMode)) {
            getReadOnlyMode();
        }
    }, [getReadOnlyMode, readOnlyMode]);

    React.useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        return (): void => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, [onBlur, onFocus]);

    return (
        <main className="app">
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
    if (isReadOnly) {
        return (<>
            <ReadOnlyModeNote />
            <Comments />
        </>);
    }

    return (<Comments />);
}

export default connect(
    ({ app }: CompositeAppState) => ({ readOnlyMode: app.readOnlyMode }),
    {
        setTabIsFocused: setTabIsFocused,
        getReadOnlyMode: getReadOnlyMode
    }
)(App);
