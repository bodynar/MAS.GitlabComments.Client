import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { SysVariable } from "@app/models/app";

import { loadSysVariables } from "@app/core/app";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState, setVariables } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";

/**
 * Get application variables
 * @returns Get application variables function that can be called with redux dispatcher
 */
export const loadSysVariablesAsync = (): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): void => {
        dispatch(setIsLoadingState(true));

        const [, error] = getNotifications(dispatch);

        loadSysVariables()
            .then((variables: Array<SysVariable>) => {
                dispatch(setVariables(variables));

                dispatch(setIsLoadingState(false));
            })
            .catch(error);
    };
