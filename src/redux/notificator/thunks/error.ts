import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

import { getErrorNotification } from "@app/core/notification";

import { CompositeAppState } from "@app/redux";
import { ShowErrorFn, addNotification } from "@app/redux/notificator";

/**
 * Create dispatch-based action to display error message
 * @param dispatch Redux store dispatcher
 * @returns Redux store action displaying error message
 */
export const getDisplayErrorFn = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
): ShowErrorFn => {
    return (error: Error | string, important?: boolean) => {
        const errorMessage = (error as Error)?.message ?? (error as string);

        console.error(errorMessage);

        const isImportant = important ?? true;

        dispatch(
            addNotification(
                [getErrorNotification(errorMessage, isImportant)]
            )
        );
    };
};
