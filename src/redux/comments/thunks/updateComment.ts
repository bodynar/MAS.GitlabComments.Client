import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { BaseCommentModel } from "@app/models/comment";

import { get, post } from "@app/utils/api";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { OpenModal } from "@app/redux/modal/actions";
import { ModalAction } from "@app/redux/modal/types";
import { getSuccessNotificationAction } from "@app/redux/notificator/utils";
import { NotificationAddAction } from "@app/redux/notificator/types";

import { CommentsState } from "../types";
import { getCommentModalFormCallbackConfig, getCommentModalFormConfig, getSetIsLoadingAction, setError } from "../utils";
import { updateComment as updateCommentAction } from "../actions";

/**
 * Update specified comment
 * @param commentId Comment identifier value
 * @returns Update comment function that can be called with redux dispatcher
 */
export const updateComment = (commentId: string): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, ActionWithPayload | ModalAction>,
        getState: () => CompositeAppState
    ): void => {
        dispatch(getSetIsLoadingAction(true));

        get<BaseCommentModel>(`api/comments/get?commentId=${commentId}`)
            .then(comment => {
                dispatch(getSetIsLoadingAction(false));

                const modalParams = getCommentModalFormConfig(comment);
                const modalSuccessCallback = getModalSuccessCallback(commentId, getState);
                const modalCallback = getCommentModalFormCallbackConfig(dispatch, modalSuccessCallback);

                dispatch({
                    type: OpenModal,
                    params: {
                        ...modalParams,
                        callback: { ...modalCallback },
                    }
                } as ModalAction);
            })
            .catch(setError(dispatch, getState));
    };

/**
 * Get comment modal callback for success action
 * @param commentId Comment identifier
 * @param getState Function providing root state
 * @returns Callback for success action for modal with comment
 */
const getModalSuccessCallback = (
    commentId: string,
    getState: () => CompositeAppState,
) => (comment: BaseCommentModel): ThunkAction<void, CommentsState, unknown, ActionWithPayload | NotificationAddAction> => {
    return (dispatch): void => {
        dispatch(getSetIsLoadingAction(true));

        post(`api/comments/update`, { ...comment, id: commentId })
            .then(() => {
                const { app } = getState();
                dispatch(getSuccessNotificationAction('Comment was updated successfully', app.isCurrentTabFocused));

                dispatch({
                    type: updateCommentAction,
                    payload: {
                        comment: { ...comment, id: commentId }
                    }
                });

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch, getState));
    };
};
