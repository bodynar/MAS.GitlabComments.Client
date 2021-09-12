import { combineReducers } from 'redux';

import { CommentsState } from './comments/types';
import { ModalState } from './modal/types';
import { NotificatorState } from './notificator/types';
import { AppState } from './app/types';

import commentsReducer from './comments/reducer';
import modalBoxReducer from './modal/reducer';
import notificatorReducer from './notificator/reducer';
import appReducer from './app/reducer';

/** Global application state */
export type CompositeAppState = {
    /** Modal box state */
    modal: ModalState;

    /** Notifications module state */
    notificator: NotificatorState;

    /** State of comments module */
    comments: CommentsState;

    /** Is browser tab with app is in focus */
    app: AppState;
};

/** Global application redux store reducer */
export default combineReducers<CompositeAppState>({
    comments: commentsReducer,
    modal: modalBoxReducer,
    notificator: notificatorReducer,
    app: appReducer
});
