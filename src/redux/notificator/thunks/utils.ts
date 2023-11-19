import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

import { CompositeAppState } from "@app/redux";
import { displayError, displaySuccess, ShowErrorFn, ShowSuccessFn } from "@app/redux/notificator";

/**
 * Get success or error notification
 * @description If `getState` parameter is provided - notification could be mark as important
 * @param dispatch Redux store dispatcher
 * @param getState Function that provides current app global state
 * @returns Pair of functions that can display notifications in success or error state
 */
export const getNotifications = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
    getState?: () => CompositeAppState,
): [ShowSuccessFn, ShowErrorFn] => {
    return [
        displaySuccess(dispatch, getState),
        displayError(dispatch, getState),
    ];
};
