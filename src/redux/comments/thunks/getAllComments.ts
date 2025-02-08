import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { getAllComments } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { registerHttpRequest } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";
import { setComments, setModuleState } from "@app/redux/comments/actions";

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const getAllCommentsAsync = (): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        const [_, onRequestCompleted] = registerHttpRequest(dispatch);

        const [, showError] = getNotifications(dispatch);

        try {
            const comments = await getAllComments();

            dispatch(
                setComments(
                    comments.map(x => ({ ...x, number: x.number ?? "" }))
                )
            );
        } catch (error) {
            showError(error as Error | string);
        }

        onRequestCompleted();
        dispatch(setModuleState("idle"));
    };
