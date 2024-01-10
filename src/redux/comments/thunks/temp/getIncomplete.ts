import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { IncompleteComment } from "@app/models/comments";
import { getIncomplete } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";
import { setIncompleteCount } from "@app/redux/comments";

/**
 * Get incomplete comments count
 * @returns Get all incomplete comments function that can be called with redux dispatcher
 */
export const getIncompleteAsync = (): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): void => {
        dispatch(setIsLoadingState(true));

        const [, showError] = getNotifications(dispatch);

        getIncomplete()
            .then((comments: Array<IncompleteComment>) => {
                dispatch(setIncompleteCount(comments.length));
                dispatch(setIsLoadingState(false));
            })
            .catch(showError);
    };
