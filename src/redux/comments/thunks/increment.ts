import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { post } from "@app/utils/api";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { NotificationAddAction } from "@app/redux/notificator/types";
import { getSuccessNotificationAction } from "@app/redux/notificator/utils";

import { getSetIsLoadingAction, setError } from "../utils";

import { increment as incrementAction } from "../actions";

/**
 * Increment appearance count in specified comment
 * @param commentId Comment identifier value
 * @returns Increment appearance count function that can be called with redux dispatcher
 */
export const increment = (commentId: string): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload | NotificationAddAction>,
        getState: () => CompositeAppState,
    ): void => {
        dispatch(getSetIsLoadingAction(true));

        post(`api/comments/increment`, commentId)
            .then(() => {
                const { app } = getState();
                dispatch(getSuccessNotificationAction('Comment appearence count was updated successfully', app.isCurrentTabFocused));

                dispatch({
                    type: incrementAction,
                    payload: {
                        commentId: commentId
                    }
                });

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch, getState));
    };
