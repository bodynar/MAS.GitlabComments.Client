import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { canUpdateTable } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";
import { setCanUpdateTable } from "@app/redux/comments";

/**
 * Get flag represents possibility of updating table
 * @returns Function that can be called with redux dispatcher
 */
export const canUpdateTableAsync = (): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (
        dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
    ): void => {
        dispatch(setIsLoadingState(true));

        const [, showError] = getNotifications(dispatch);

        canUpdateTable()
            .then((result: boolean) => {
                dispatch(setCanUpdateTable(result));
                dispatch(setIsLoadingState(false));
            })
            .catch(error => {
                showError(error, true, true);
            });
    };
