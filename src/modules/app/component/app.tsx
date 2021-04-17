import React from "react";

import Comments from "modules/comments/comments";
import ModalBox from 'modules/modalBox/modalBox';

import Notificator from '../components/notificator/notificator';
import Navbar from "../components/navbar/navbar";

export default function App(): JSX.Element {
    return (
        <main>
            <ModalBox />
            <Navbar />
            <Notificator />
            <section className="container mt-5">
                <Comments />
            </section>
        </main>
    );
}
