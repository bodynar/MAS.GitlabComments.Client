import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { importAppData } from "@app/core/app";

import { CompositeAppState } from "@app/redux";
import { registerHttpRequest } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";

/**
 * Import app data from file
 * @returns Function that can be called with redux dispatcher
 */
export const importAppDataAsync = (file: File): ThunkAction<Promise<boolean>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<boolean> => {
        const [_, onRequestCompleted] = registerHttpRequest(dispatch);

        let operationResult = true;

        const [showSuccess, showError] = getNotifications(dispatch);

        try {
            const result = await importAppData(file);

            if (!result.success) {
                showError(`Error during file import\n${result.error}`);
                operationResult = false;
            } else {
                showSuccess("File successfully imported");
            }
        } catch (error) {
            operationResult = false;
            showError(error as Error | string);
        }

        onRequestCompleted();

        return operationResult;
    };
