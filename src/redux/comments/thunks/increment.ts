import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { post } from "@app/utils/delayedApi";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { getSuccessNotificationAction } from "@app/redux/notificator/utils";

import { setError } from "@app/redux/app/utils";
import { getSetAppIsLoadingAction } from "@app/redux/app/actions/setAppIsLoading";

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

                dispatch(getSuccessNotificationAction('Comment appearence count was updated successfully', app.isCurrentTabFocused));
                dispatch(getIncrementAction(commentId));
                dispatch(getSetAppIsLoadingAction(false));
            })
            .catch(setError(dispatch, getState));
    };
