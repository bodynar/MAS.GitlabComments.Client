import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from "./rootReducer";

const middleWare =
    process.env.PRODUCTION
        ? applyMiddleware(thunkMiddleware)
        : applyMiddleware(thunkMiddleware, createLogger());

export default createStore(
    rootReducer,
    middleWare
);
