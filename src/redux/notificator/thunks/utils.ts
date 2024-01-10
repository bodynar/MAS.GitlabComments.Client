import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

import { CompositeAppState } from "@app/redux";
import { getDisplayErrorFn, getDisplaySuccessFn, ShowErrorFn, ShowSimpleMessageFn } from "@app/redux/notificator";

/**
 * Get success or error notification
 * @description If `getState` parameter is provided - notification could be mark as important
 * @param dispatch Redux store dispatcher
 * @returns Pair of functions that can display notifications in success or error state
 */
export const getNotifications = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>
): [ShowSimpleMessageFn, ShowErrorFn] => {
    return [
        getDisplaySuccessFn(dispatch),
        getDisplayErrorFn(dispatch),
    ];
};
