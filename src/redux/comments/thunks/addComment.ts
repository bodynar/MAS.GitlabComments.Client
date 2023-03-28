import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { post } from "@app/utils";

import { BaseCommentModel } from "@app/models/comment";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { setError } from "@app/redux/app/utils";
import { getSetAppIsLoadingAction } from "@app/redux/app/actions/setAppIsLoading";

import { getOpenModalAction } from "@app/redux/modal/actionCreators/open";

import { getSuccessNotificationAction } from "@app/redux/notificator/utils";

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
