import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { getFlag } from "@app/core/app";

import { CompositeAppState } from "@app/redux";
import { setReadOnlyMode, setIsLoadingState } from "@app/redux/app";

/**
 * Get application read only mode state
 * @returns Get application read only mode state function that can be called with redux dispatcher
 */
export const getReadOnlyMode = (): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): void => {
        dispatch(setIsLoadingState(true));

        getFlag()
            .then((readOnlyMode: boolean) => {
                dispatch(setReadOnlyMode(readOnlyMode ?? false));

                dispatch(setIsLoadingState(false));
            })
            .catch(() => dispatch(setIsLoadingState(false)));
    };
