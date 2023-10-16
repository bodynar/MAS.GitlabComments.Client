import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { increment } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";
import { blockComment, increment as incrementAction, unblockComment } from "@app/redux/comments";

/**
 * Increment appearance count in specified comment
 * @param commentId Comment identifier value
 * @returns Increment appearance count function that can be called with redux dispatcher
 */
export const incrementAsync = (commentId: string): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
        getState: () => CompositeAppState,
    ): void => {
        dispatch(blockComment(commentId));

        const [success, error] = getNotifications(dispatch);

        increment(commentId)
            .then(() => {
                const { app } = getState();

                success("Comment appearance count was updated successfully", app.isCurrentTabFocused);
                dispatch(incrementAction(commentId));
                dispatch(unblockComment(commentId));
            })
            .catch(error);
    };
