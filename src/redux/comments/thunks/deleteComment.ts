import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { post } from "@app/utils/delayedApi";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { getSetAppIsLoadingAction } from "@app/redux/app/actions/setAppIsLoading";
import { setError } from "@app/redux/app/utils";

import { getSuccessNotificationAction } from "@app/redux/notificator/utils";

import { getOpenModalAction } from "@app/redux/modal/actions/open";
import { ModalAction } from "@app/redux/modal/types";

import { getDeleteCommentAction } from "../actions/deleteComment";

/**
 * Delete specified comment
 * @param commentId Comment identifier value
 * @returns Delete comment function that can be called with redux dispatcher
 */
export const deleteComment = (commentId: string): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload | ModalAction>,
        getState: () => CompositeAppState,
    ): void => {
        dispatch(getOpenModalAction({
            modalType: 'confirm',
            title: 'Confirm delete',
            buttonCaption: { saveCaption: 'Delete' },
            message: 'Are you sure want to delete selected comment?',
            callback: {
                saveCallback: (): void => {
                    dispatch(getSetAppIsLoadingAction(true));

                    post(`api/comments/delete`, commentId)
                        .then(() => {
                            const { app } = getState();

                            dispatch(getSuccessNotificationAction('Comment successfully deleted', app.isCurrentTabFocused));
                            dispatch(getDeleteCommentAction(commentId));
                            dispatch(getSetAppIsLoadingAction(false));
                        })
                        .catch(setError(dispatch, getState));
                },
                cancelCallback: (): void => { }
            }
        }));
    };
