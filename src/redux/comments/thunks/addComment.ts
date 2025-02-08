import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { EditCommentModel } from "@app/models/comments";
import { MODAL_KEYS } from "@app/constants";
import { addComment } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { registerHttpRequest } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";
import { close, open } from "@app/redux/modal";
import { addComment as addCommentAction, setHighlightedComment } from "@app/redux/comments";

/**
 * Add comment via modal form
 * @returns Add comment function that can be called with redux dispatcher
 */
export const displayAddCommentModal = (): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): void => {
        dispatch(open(MODAL_KEYS.ADD_COMMENT));
    };

/**
 * Get comment modal callback for success action
 * @param getState Function providing root state
 * @returns Callback for success action for modal with comment
 */
export const addCommentAsync = (
    newComment: EditCommentModel
): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> => async (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        const [_, onRequestCompleted] = registerHttpRequest(dispatch);

        const [success, showError] = getNotifications(dispatch);

        try {
            const { id, number } = await addComment(newComment);

            dispatch(close());

            success(`Comment ${number} was added successfully`);

            onRequestCompleted();

            dispatch(
                addCommentAction({
                    ...newComment,
                    appearanceCount: 1,
                    number,
                    id,
                    blocked: false,
                })
            );
        } catch (error) {
            showError(error as Error | string);
        }
    };

/**
 * Highlight lookalike comment
 *
 * If current form is dirty confirm message will be shown
 * @param commentId Comment identifier
 * @param shouldConfirm Display confirm modal
 * @returns Redux action
 */
export const displayCommentInsteadOfCreate = (
    commentId: string
): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> => async (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        dispatch(close());

        dispatch(setHighlightedComment(commentId));
    };
