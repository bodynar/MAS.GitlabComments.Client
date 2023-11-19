import { Action } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";

import { getSuccessNotification } from "@app/core/notification";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState } from "@app/redux/app";
import { ShowSuccessFn, addNotification } from "@app/redux/notificator";

/**
 * Create dispatch-based action to display success message
 * @param dispatch Redux store dispatcher
 * @param getState Function that provides current app global state
 * @returns Redux store action displaying success message
 */
export const displaySuccess = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
    getState?: () => CompositeAppState,
): ShowSuccessFn => {
    return (message: string, important?: boolean, removeLoadingState?: boolean) => {
        const isImportant = important ?? !getState?.call(undefined).app.isCurrentTabFocused ?? false;

        dispatch(
            addNotification(
                [getSuccessNotification(message, isImportant)]
            )
        );

        if (removeLoadingState ?? true) {
            dispatch(setIsLoadingState(false));
        }
    };
};
