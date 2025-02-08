import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { getFlag } from "@app/core/app";

import { CompositeAppState } from "@app/redux";
import { setReadOnlyMode, registerHttpRequest } from "@app/redux/app";

/**
 * Get application read only mode state
 * @returns Get application read only mode state function that can be called with redux dispatcher
 */
export const getReadOnlyMode = (): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        const [_, onRequestCompleted] = registerHttpRequest(dispatch);

        let flag = true;

        try {
            flag = await getFlag();
        } catch (error) {
            // NOP
        }

        dispatch(setReadOnlyMode(flag));

        onRequestCompleted();
    };
