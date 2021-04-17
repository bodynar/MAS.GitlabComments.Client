import { combineReducers } from 'redux';

import { CommentsState } from './comments/types';
import { ModalState } from './modal/types';
import { NotificatorState } from './notificator/types';

import commentsReducer from './comments/reducer';
import modalBoxReducer from './modal/reducer';
import notificatorReducer from './notificator/reducer';

export type AppState = {
    comments: CommentsState;
    modal: ModalState;
    notificator: NotificatorState;
};

export default combineReducers<AppState>({
    comments: commentsReducer,
    modal: modalBoxReducer,
    notificator: notificatorReducer,
});
