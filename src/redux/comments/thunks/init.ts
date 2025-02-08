import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { CompositeAppState } from "@app/redux";
import { registerHttpRequest } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";
import { setComments, setModuleState, setTokens } from "@app/redux/comments/actions";
import { getAllComments, getAllTokens } from "@app/core/comments";

/**
 * Init comments module via: Get all comments; Get active retraction tokens
 * @returns Redux thunk
 */
export const initCommentsModuleAsync = (): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        const [, showError] = getNotifications(dispatch);

        const [_, onRequestCompleted] = registerHttpRequest(dispatch);

        try {
            const comments = await getAllComments();
            dispatch(setComments(comments));

            const tokens = await getAllTokens();
            dispatch(setTokens(tokens));
        } catch (error) {
            showError(error as string ?? error as Error, false);
        }

        onRequestCompleted();
        dispatch(setModuleState("idle"));
    };
