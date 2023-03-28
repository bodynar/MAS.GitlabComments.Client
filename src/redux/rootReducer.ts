import { combineReducers } from "redux";

import commentsReducer from "./comments/reducer";
import modalBoxReducer from "./modal/reducer";
import notificatorReducer from "@app/redux/notificator/reducer";
import appReducer from "@app/redux/app/reducer";
import statsReducer from "@app/redux/stats/reducer";

import { CompositeAppState } from "./types";

/** Global application redux store reducer */
export default combineReducers<CompositeAppState>({
    comments: commentsReducer,
    modal: modalBoxReducer,
    notificator: notificatorReducer,
    app: appReducer,
    stats: statsReducer,
});
