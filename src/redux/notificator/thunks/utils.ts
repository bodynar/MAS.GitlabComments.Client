import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

import { CompositeAppState } from "@app/redux";
import { displayError, displaySuccess, ShowErrorFn, ShowSuccessFn } from "@app/redux/notificator";

/**
 * Get success or error notification 
 * @param dispatch Redux store dispatcher
 * @returns Pair of functions that can display notifications in success or error state
 */
export const getNotifications = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>
): [ShowSuccessFn, ShowErrorFn] => {
    return [
        displaySuccess(dispatch),
        displayError(dispatch),
    ];
};
