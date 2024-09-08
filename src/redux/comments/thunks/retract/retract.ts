import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullish } from "@bodynarf/utils";

import { retract } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";
import { blockComment, blockToken, retract as retractAction, unblockComment } from "@app/redux/comments";

/**
 * Retract token asynchronously
 * @param tokenId Token identifier
 * @returns Redux thunk
 */
export const retractAsync = (tokenId: string): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
        getState: () => CompositeAppState,
    ): Promise<void> => {
        const token = getState().comments.retractionTokens.find(({ id }) => id === tokenId);

        if (isNullish(token) || token.blocked) {
            return;
        }

        dispatch(blockToken(token.id));
        dispatch(blockComment(token.commentId));

        const [showSuccess, showError] = getNotifications(dispatch);

        try {
            await retract(tokenId);
            const comment = getState().comments.comments.filter(({ id }) => id === token.commentId).pop()!;

            dispatch(retractAction(tokenId));
            dispatch(unblockComment(token.commentId));

            showSuccess(`Comment ${comment.number} appearance count was updated successfully`, false, true);
        } catch (error) {
            showError(error as string | Error, true, true);
        }
    };
