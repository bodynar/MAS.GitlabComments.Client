import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullOrUndefined } from "@bodynarf/utils";

import { EditCommentModel } from "@app/models/comments";
import { getEditModalConfig, updateComment } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";
import { open } from "@app/redux/modal";
import { updateComment as updateCommentAction, getCommentModalFormCallbackConfig, blockComment, unblockComment } from "@app/redux/comments";

/**
 * Update specified comment
 * @param commentId Comment identifier value
 * @returns Update comment function that can be called with redux dispatcher
 */
export const updateCommentAsync = (commentId: string): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
        getState: () => CompositeAppState
    ): void => {
        const comment = getState().comments.comments.find(({ id }) => id === commentId);

        const [, error] = getNotifications(dispatch);

        if (isNullOrUndefined(comment)) {
            error("Comment data not found. Refresh current page and try again.", true, true);
            return;
        }

        const modalParams = getEditModalConfig(comment);
        const modalSuccessCallback = getModalSuccessCallback(commentId, getState);
        const modalCallback = getCommentModalFormCallbackConfig(dispatch, modalSuccessCallback);

        dispatch(
            open({ ...modalParams, callback: { ...modalCallback } })
        );
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
) => (comment: EditCommentModel): ThunkAction<void, CompositeAppState, unknown, Action> => {
    return (dispatch): void => {
        dispatch(blockComment(commentId));

        const [success, error] = getNotifications(dispatch);

        updateComment(comment, commentId)
            .then(() => {
                const { app } = getState();

                success("Comment was updated successfully", app.isCurrentTabFocused);
                dispatch(updateCommentAction([comment, commentId]));
                dispatch(unblockComment(commentId));
            })
            .catch(error);
    };
};
