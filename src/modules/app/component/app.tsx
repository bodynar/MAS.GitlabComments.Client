import React from "react";
import { connect } from "react-redux";

import './app.scss';

import { getReadOnlyMode } from "@app/redux/global/thunks";
import { AppState } from "@app/redux/rootReducer";

import { isNullOrUndefined } from "@app/utils/common";

import Comments from "@app/modules/comments";
import ModalBox from '@app/modules/modalBox';

import Notificator from '../components/notificator/notificator';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer";

/** App component props */
type AppProps = {
    /** Is application in read only mode */
    readOnlyMode?: boolean;

    /** Read readonly mode value and save it in store */
    getReadOnlyMode: () => void;
};

/** Root app component */
function App(props: AppProps): JSX.Element {
    React.useEffect(() => {
        if (isNullOrUndefined(props.readOnlyMode)) {
            props.getReadOnlyMode();
        }
    }, [props, props.readOnlyMode]);

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
    ({ globalState }: AppState) => ({ ...globalState }),
    {
        getReadOnlyMode: getReadOnlyMode
    }
)(App);
