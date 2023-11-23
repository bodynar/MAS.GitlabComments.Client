import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

import { getErrorNotification } from "@app/core/notification";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState } from "@app/redux/app";
import { ShowErrorFn, addNotification } from "@app/redux/notificator";

/**
 * Create dispatch-based action to display error message
 * @param dispatch Redux store dispatcher
 * @param getState Function that provides current app global state
 * @returns Redux store action displaying error message
 */
export const getDisplayErrorFn = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
    getState?: () => CompositeAppState,
): ShowErrorFn => {
    return (error: Error | string, important?: boolean, removeLoadingState?: boolean) => {
        const errorMessage = (error as Error)?.message ?? (error as string);

        console.error(errorMessage);

        const isImportant = important ?? !getState?.call(undefined).app.isCurrentTabFocused ?? false;

        dispatch(
            addNotification(
                [getErrorNotification(errorMessage, isImportant)]
            )
        );

        if (removeLoadingState ?? true) {
            dispatch(setIsLoadingState(false));
        }
    };
};
