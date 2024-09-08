import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { loadSysVariables } from "@app/core/app";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState, setVariables } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";

/**
 * Get application variables
 * @returns Get application variables function that can be called with redux dispatcher
 */
export const loadSysVariablesAsync = (): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        dispatch(setIsLoadingState(true));

        try {
            const variables = await loadSysVariables();

            dispatch(setVariables(variables));

        } catch (error) {
            const [, showError] = getNotifications(dispatch);

            showError(error as Error | string, true);
        }
        dispatch(setIsLoadingState(false));
    };
