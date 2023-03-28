import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { post } from "@app/utils";

import { ActionWithPayload, CompositeAppState } from "@app/redux";
import { getSetAppIsLoadingAction, setError } from "@app/redux/app";
import { getSuccessNotificationAction } from "@app/redux/notificator";

import { getOpenModalAction } from "@app/redux/modal";

import { getDeleteCommentAction } from "../actions/deleteComment";
import { ModalType } from "@app/redux/modal";

/**
 * Delete specified comment
 * @param commentId Comment identifier value
 * @returns Delete comment function that can be called with redux dispatcher
 */
export const deleteComment = (commentId: string): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState,
    ): void => {
        dispatch(getOpenModalAction({
            modalType: ModalType.Confirm,
            title: "Confirm delete",
            buttonCaption: { saveCaption: "Delete" },
            message: "Are you sure want to delete selected comment?",
            callback: {
                saveCallback: (): void => {
                    dispatch(getSetAppIsLoadingAction(true));

                    post(`api/comments/delete`, commentId)
                        .then(() => {
                            const { app } = getState();

                            dispatch(getSuccessNotificationAction("Comment successfully deleted", app.isCurrentTabFocused));
                            dispatch(getDeleteCommentAction(commentId));
                            dispatch(getSetAppIsLoadingAction(false));
                        })
                        .catch(setError(dispatch, getState));
                },
                cancelCallback: (): void => { }
            }
        }));
    };
