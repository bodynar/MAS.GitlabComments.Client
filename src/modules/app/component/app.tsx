import React from "react";

import Comments from "modules/comments/comments";
import ModalBox from 'modules/modalBox/modalBox';

import Navbar from "../components/navbar/navbar";

export default function App(): JSX.Element {
    return (
        <main>
            <ModalBox />
            <Navbar />
            <section className="container">
                <div>
                    <h1 className="title">
                        Hello World
                    </h1>
                    <p className="subtitle">
                        My first website with <strong>Bulma</strong>!
                    </p>
                </div>
                <hr />
                <Comments />
            </section>
        </main>
    );
}
