import React from "react";

export default function App(): JSX.Element {
    return (<>
        <section className="section">
            <span className="icon-text">
                <span className="icon">
                    <i className="fas fa-home"></i>
                </span>
                <span>Home</span>
            </span>
            <div className="container">
                <h1 className="title">
                    Hello World
                </h1>
                <p className="subtitle">
                    My first website with <strong>Bulma</strong>!
                </p>
            </div>
        </section>
    </>);
}
