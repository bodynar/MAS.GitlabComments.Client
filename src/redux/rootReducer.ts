import { combineReducers } from 'redux';

import commentsReducer from "./comments/reducer";
import { CommentsState } from './comments/types';
import modalBoxReducer from "./modal/reducer";
import { ModalState } from './modal/types';

export type AppState = {
    comments: CommentsState;
    modal: ModalState;
}

export default combineReducers<AppState>({
    comments: commentsReducer,
    modal: modalBoxReducer
});
