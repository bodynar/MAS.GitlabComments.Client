import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

import { getWarningNotification } from "@app/core/notification";

import { CompositeAppState } from "@app/redux";
import { ShowSimpleMessageFn, addNotification } from "@app/redux/notificator";

/**
 * Create dispatch-based action to display warn message
 * @param dispatch Redux store dispatcher
 * @param getState Function that provides current app global state
 * @returns Redux store action displaying warn message
 */
export const getDisplayWarnFn = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
): ShowSimpleMessageFn => {
    return (message: string, important: boolean = false) => {
        dispatch(
            addNotification(
                [getWarningNotification(message, important)]
            )
        );
    };
};

/**
 * Create redux thunk to display warn notifications
 * @param message Message to display
 * @param important Should message stay on screen until manual user close action
 * @returns Redux thunk
 */
export const displayWarn = (message: string, important: boolean = false): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): void => {
        const fn = getDisplayWarnFn(dispatch);

        fn(message, important);
    };
