import React from "react";
import ReactDOM from "react-dom";

import "./style.scss";

import App from "./modules/app/app";

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
