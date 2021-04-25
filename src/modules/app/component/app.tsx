import React from "react";

import './app.scss';

import Comments from "@app/modules/comments";
import ModalBox from '@app/modules/modalBox';

import Notificator from '../components/notificator/notificator';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer";

/** Root app component */
export default function App(): JSX.Element {
    return (
        <main className="app">
            <Navbar className="app__navbar"/>
            <ModalBox />
            <Notificator />
            <section className="app__content container">
                <Comments />
            </section>
            <Footer className="app__footer"/>
        </main>
    );
}
