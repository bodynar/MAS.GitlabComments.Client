import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { updateTable } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";
import { setIsLoadingState } from "@app/redux/app";

/**
 * Update comments table in database
 * @returns Update comments table function that can be called with redux dispatcher
 */
export const updateTableAsync = (): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): void => {
        dispatch(setIsLoadingState(true));

        const [success, error] = getNotifications(dispatch);

        updateTable()
            .then(() => {
                dispatch(setIsLoadingState(false));
                success("All comments are complete now");
            })
            .catch(error);
    };
