import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { getIncomplete, updateIncomplete } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";
import { setIncompleteCount } from "@app/redux/comments";
import { setIsLoadingState } from "@app/redux/app";
import { IncompleteComment } from "@app/models/comments";

/**
 * Update incomplete comments
 * @returns Update comments function that can be called with redux dispatcher
 */
export const updateIncompleteAsync = (): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): void => {
        dispatch(setIsLoadingState(true));

        const [success, error] = getNotifications(dispatch);

        updateIncomplete()
            .then(getIncomplete)
            .then((comments: Array<IncompleteComment>) => {
                dispatch(setIncompleteCount(comments.length));
                dispatch(setIsLoadingState(false));

                if (comments.length === 0) {
                    success("All comments are complete now");
                }
            })
            .catch(error);
    };
