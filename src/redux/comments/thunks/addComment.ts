import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { post } from "@app/utils/api";

import { BaseCommentModel } from "@app/models/comment";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { ModalAction } from "@app/redux/modal/types";
import { OpenModal } from "@app/redux/modal/actions";
import { getSuccessNotificationAction } from "@app/redux/notificator/utils";
import { NotificationAddAction } from "@app/redux/notificator/types";

import { setModuleState } from "../actions";
import { CommentsState } from "../types";
import { addComment as addCommentAction } from "../actions";
import { getCommentModalFormCallbackConfig, getCommentModalFormConfig, getSetIsLoadingAction, setError } from "../utils";

/**
 * Add comment via modal form
 * @returns Add comment function that can be called with redux dispatcher
 */
export const addComment = (): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, ModalAction | ActionWithPayload>,
        getState: () => CompositeAppState,
    ): void => {
        dispatch({
            type: setModuleState,
            payload: { nextState: 'showModal' }
        } as ActionWithPayload);

        const modalParams = getCommentModalFormConfig();
        const modalSuccessCallback = getModalSuccessCallback(getState);
        const modalCallback = getCommentModalFormCallbackConfig(dispatch, modalSuccessCallback);

        dispatch({
            type: OpenModal,
            params: {
                ...modalParams,
                callback: { ...modalCallback },
            }
        } as ModalAction);
    };

/**
 * Get comment modal callback for success action
 * @param getState Function providing root state
 * @returns Callback for success action for modal with comment
 */
const getModalSuccessCallback = (
    getState: () => CompositeAppState,
) => (updateComment: BaseCommentModel): ThunkAction<void, CommentsState, unknown, ActionWithPayload | NotificationAddAction> => {
    return (dispatch): void => {
        dispatch(getSetIsLoadingAction(true));

        post<string>(`api/comments/add`, updateComment)
            .then((id: string) => {
                const { app } = getState();
                dispatch(getSuccessNotificationAction('Comment was added successfully', app.isCurrentTabFocused));

                dispatch({
                    type: addCommentAction,
                    payload: {
                        comment: {
                            ...updateComment,
                            appearanceCount: 0,
                            id: id,
                        }
                    }
                });

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch, getState));
    };
};
