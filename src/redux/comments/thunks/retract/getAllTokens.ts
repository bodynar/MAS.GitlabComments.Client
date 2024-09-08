import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { getAllTokens } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";

import { setTokens } from "@app/redux/comments";

/**
 * Get active retraction tokens
 * @returns Redux thunk
 */
export const getAllTokensAsync = (): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        const [_, showError] = getNotifications(dispatch);

        try {
            const tokens = await getAllTokens();
            dispatch(setTokens(tokens));
        } catch (error) {
            showError(error as string | Error, true, true);
        }
    };
