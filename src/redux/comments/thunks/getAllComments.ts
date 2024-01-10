import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { Comment } from "@app/models/comments";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";
import { setComments, setModuleState } from "@app/redux/comments/actions";
import { getAllComments } from "@app/core/comments";

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const getAllCommentsAsync = (): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        dispatch(setIsLoadingState(true));

        const [, showError] = getNotifications(dispatch);

        return getAllComments()
            .then((comments: Array<Comment>) => {
                dispatch(setComments(comments));

                dispatch(setIsLoadingState(false));
                dispatch(setModuleState("idle"));
            })
            .catch(error => {
                dispatch(setModuleState("idle"));

                showError(error);
            });
    };
