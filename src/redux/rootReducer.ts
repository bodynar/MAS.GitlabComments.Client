import { combineReducers } from 'redux';

import { CommentsState } from './comments/types';
import { ModalState } from './modal/types';
import { NotificatorState } from './notificator/types';
import { GlobalAppState } from './global/types';

import globalAppReducer from './global/reducer';
import commentsReducer from './comments/reducer';
import modalBoxReducer from './modal/reducer';
import notificatorReducer from './notificator/reducer';

/** Global application state */
export type AppState = {
    /** Modal box state */
    modal: ModalState;

    /** Notifications module state */
    notificator: NotificatorState;

    /** State of comments module */
    comments: CommentsState;

    globalState: GlobalAppState
};

/** Global application redux store reducer */
export default combineReducers<AppState>({
    comments: commentsReducer,
    modal: modalBoxReducer,
    notificator: notificatorReducer,
    globalState: globalAppReducer,
});
