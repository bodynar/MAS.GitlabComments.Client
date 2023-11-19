import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { EditCommentModel } from "@app/models/comments";

import { addComment, getEditModalConfig } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";
import { open } from "@app/redux/modal";
import { addComment as addCommentAction, getCommentModalFormCallbackConfig } from "@app/redux/comments";

/**
 * Add comment via modal form
 * @returns Add comment function that can be called with redux dispatcher
 */
export const addCommentAsync = (): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
        getState: () => CompositeAppState,
    ): void => {
        const modalParams = getEditModalConfig();
        const modalSuccessCallback = getModalSuccessCallback(getState);
        const modalCallback = getCommentModalFormCallbackConfig(dispatch, modalSuccessCallback);

        dispatch(
            open({
                ...modalParams,
                callback: { ...modalCallback },
            })
        );
    };

/**
 * Get comment modal callback for success action
 * @param getState Function providing root state
 * @returns Callback for success action for modal with comment
 */
const getModalSuccessCallback = (
    getState: () => CompositeAppState,
) => (newComment: EditCommentModel): ThunkAction<void, CompositeAppState, unknown, Action> => {
    return (dispatch): void => {
        dispatch(setIsLoadingState(true));

        const [success, error] = getNotifications(dispatch, getState);

        addComment(newComment)
            .then((commentId: string) => {
                success("Comment was added successfully");
                dispatch(
                    addCommentAction({
                        ...newComment,
                        appearanceCount: 1,
                        id: commentId,
                        blocked: false,
                    })
                );
            })
            .catch(error);
    };
};
