import React from "react";

import './app.scss';

import Comments from "modules/comments";
import ModalBox from 'modules/modalBox';

import Notificator from '../components/notificator/notificator';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer";

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
