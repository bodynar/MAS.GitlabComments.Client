import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { post } from "@app/utils";

import { ActionWithPayload, CompositeAppState } from "@app/redux";
import { setError, getSetAppIsLoadingAction } from "@app/redux/app";
import { getSuccessNotificationAction } from "@app/redux/notificator";

import { getIncrementAction } from "../actions/increment";

/**
 * Increment appearance count in specified comment
 * @param commentId Comment identifier value
 * @returns Increment appearance count function that can be called with redux dispatcher
 */
export const increment = (commentId: string): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState,
    ): void => {
        dispatch(getSetAppIsLoadingAction(true));

        post(`api/comments/increment`, commentId)
            .then(() => {
                const { app } = getState();

                dispatch(getSuccessNotificationAction("Comment appearence count was updated successfully", app.isCurrentTabFocused));
                dispatch(getIncrementAction(commentId));
                dispatch(getSetAppIsLoadingAction(false));
            })
            .catch(setError(dispatch, getState));
    };
