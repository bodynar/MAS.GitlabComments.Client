import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { post } from "@app/utils";

import { BaseCommentModel } from "@app/models";

import { ActionWithPayload, CompositeAppState } from "@app/redux";
import { setError, getSetAppIsLoadingAction } from "@app/redux/app";
import { getSuccessNotificationAction } from "@app/redux/notificator";

import { getOpenModalAction } from "@app/redux/modal/actionCreators/open";

import { getCommentModalFormCallbackConfig, getCommentModalFormConfig } from "../utils";
import { getAddCommentAction } from "../actions/addComment";

/**
 * Add comment via modal form
 * @returns Add comment function that can be called with redux dispatcher
 */
export const addComment = (): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState,
    ): void => {
        const modalParams = getCommentModalFormConfig();
        const modalSuccessCallback = getModalSuccessCallback(getState);
        const modalCallback = getCommentModalFormCallbackConfig(dispatch, modalSuccessCallback);

        dispatch(getOpenModalAction({
            ...modalParams,
            callback: { ...modalCallback },
        }));
    };

/**
 * Get comment modal callback for success action
 * @param getState Function providing root state
 * @returns Callback for success action for modal with comment
 */
const getModalSuccessCallback = (
    getState: () => CompositeAppState,
) => (newComment: BaseCommentModel): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> => {
    return (dispatch): void => {
        dispatch(getSetAppIsLoadingAction(true));

        post<string>(`api/comments/add`, newComment)
            .then((commentId: string) => {
                const { app } = getState();

                dispatch(getSuccessNotificationAction("Comment was added successfully", app.isCurrentTabFocused));
                dispatch(getAddCommentAction(newComment, commentId));
                dispatch(getSetAppIsLoadingAction(false));
            })
            .catch(setError(dispatch, getState));
    };
};
