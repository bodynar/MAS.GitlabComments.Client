import React from "react";

import Comments from "modules/comments/comments";
import ModalBox from 'modules/modalBox/modalBox';

import Navbar from "../components/navbar/navbar";

export default function App(): JSX.Element {
    return (
        <main>
            <ModalBox />
            <Navbar />
            <section className="container mt-5">
                <Comments />
            </section>
        </main>
    );
}
