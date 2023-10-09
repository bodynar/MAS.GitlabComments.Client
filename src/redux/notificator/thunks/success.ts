import { Action } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";

import { getSuccessNotification } from "@app/core/notification";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState } from "@app/redux/app";
import { ShowSuccessFn, addNotification } from "@app/redux/notificator";

/**
 * Create dispatch-based action to display success message
 * @param dispatch Redux store dispatcher
 * @returns Redux store action displaying success message
 */
export const displaySuccess = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
): ShowSuccessFn => {
    return (message: string, removeLoadingState: boolean = true, important: boolean = false) => {
        dispatch(
            addNotification(
                [getSuccessNotification(message, important)]
            )
        );

        if (removeLoadingState) {
            dispatch(setIsLoadingState(false));
        }
    };
};
