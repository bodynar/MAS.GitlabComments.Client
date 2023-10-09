import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

import { getErrorNotification } from "@app/core/notification";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState } from "@app/redux/app";
import { ShowErrorFn, addNotification } from "@app/redux/notificator";

/**
 * Create dispatch-based action to display error message
 * @param dispatch Redux store dispatcher
 * @returns Redux store action displaying error message
 */
export const displayError = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
): ShowErrorFn => {
    return (error: Error | string, removeLoadingState: boolean = true, important: boolean = false) => {
        const errorMessage = (error as Error)?.message ?? (error as string);

        console.error(errorMessage);

        dispatch(
            addNotification(
                [getErrorNotification(errorMessage, important)]
            )
        );

        if (removeLoadingState) {
            dispatch(setIsLoadingState(false));
        }
    };
};
