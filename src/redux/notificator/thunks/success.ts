import { Action } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";

import { getSuccessNotification } from "@app/core/notification";

import { CompositeAppState } from "@app/redux";
import { ShowSimpleMessageFn, addNotification } from "@app/redux/notificator";

/**
 * Create dispatch-based action to display success message
 * @param dispatch Redux store dispatcher
 * @returns Redux store action displaying success message
 */
export const getDisplaySuccessFn = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
): ShowSimpleMessageFn => {
    return (message: string, important?: boolean) => {
        const isImportant = important ?? false;

        dispatch(
            addNotification(
                [getSuccessNotification(message, isImportant)]
            )
        );
    };
};
