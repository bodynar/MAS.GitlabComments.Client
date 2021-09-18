import React from "react";
import { connect } from "react-redux";

import './app.scss';

import { setTabIsFocused } from "@app/redux/app/action";

import Comments from "@app/modules/comments";
import ModalBox from '@app/modules/modalBox';

import Notificator from '../components/notificator/notificator';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer";

type AppPropsType = {
    /** Store state of app tab focus */
    setTabIsFocused: (isFocused: boolean) => void;
};

/** Root app component */
function App({ setTabIsFocused }: AppPropsType): JSX.Element {
    const onFocus = React.useCallback(() => {
        setTabIsFocused(true);
    }, [setTabIsFocused]);

    const onBlur = React.useCallback(() => {
        setTabIsFocused(false);
    }, [setTabIsFocused]);

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
                <Comments />
            </section>
            <Footer className="app__footer" />
        </main>
    );
}

export default connect(
    null,
    { setTabIsFocused: setTabIsFocused }
)(App);
