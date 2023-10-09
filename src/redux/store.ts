import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import { reducer as commentsReducer } from "@app/redux/comments/reducer";
import { reducer as modalBoxReducer } from "@app/redux/modal/reducer";
import { reducer as notificatorReducer } from "@app/redux/notificator/reducer";
import { reducer as appReducer } from "@app/redux/app/reducer";
import { reducer as statsReducer } from "@app/redux/stats/reducer";

import { CompositeAppState } from ".";

const store = configureStore<CompositeAppState>({
    reducer: {
        comments: commentsReducer,
        modal: modalBoxReducer,
        notificator: notificatorReducer,
        app: appReducer,
        stats: statsReducer,
    },
    middleware: [
        thunkMiddleware,
    ]
});

export default store;
