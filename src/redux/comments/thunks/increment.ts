import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { increment } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";
import { blockComment, increment as incrementAction, saveRetractionToken, unblockComment } from "@app/redux/comments";

/**
 * Increment appearance count in specified comment
 * @param commentId Comment identifier value
 * @returns Increment appearance count function that can be called with redux dispatcher
 */
export const incrementAsync = (commentId: string): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
        getState: () => CompositeAppState,
    ): Promise<void> => {
        dispatch(blockComment(commentId));

        const [showSuccess, showError] = getNotifications(dispatch);

        try {
            const retractionToken = await increment(commentId);
            const comment = getState().comments.comments.filter(({ id }) => id === commentId).pop()!;

            showSuccess(`Comment ${comment.number} appearance count was updated successfully`, false);

            dispatch(incrementAction(commentId));
            dispatch(unblockComment(commentId));
            dispatch(saveRetractionToken([commentId, retractionToken]));
        } catch (error) {
            showError(error as string | Error, true);
        }
    };
