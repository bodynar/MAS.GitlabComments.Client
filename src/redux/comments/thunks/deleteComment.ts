import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { deleteComment } from "@app/core/comments";

import { ModalType } from "@app/models/modal";

import { CompositeAppState } from "@app/redux";
import { setIsLoadingState } from "@app/redux/app";
import { getNotifications, } from "@app/redux/notificator";
import { deleteComment as deleteCommentAction } from "@app/redux/comments";
import { open } from "@app/redux/modal";

/**
 * Delete specified comment
 * @param commentId Comment identifier value
 * @returns Delete comment function that can be called with redux dispatcher
 */
export const deleteCommentAsync = (commentId: string): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
        getState: () => CompositeAppState,
    ): void => {
        const [success, error] = getNotifications(dispatch);

        dispatch(
            open({
                modalType: ModalType.Confirm,
                title: "Confirm delete",
                buttonCaption: { saveCaption: "Delete" },
                message: "Are you sure want to delete selected comment?",
                callback: {
                    saveCallback: (): void => {
                        dispatch(setIsLoadingState(true));

                        deleteComment(commentId)
                            .then(() => {
                                const { app } = getState();

                                success("Comment successfully deleted", true, app.isCurrentTabFocused);
                                dispatch(deleteCommentAction(commentId));
                                dispatch(setIsLoadingState(false));
                            })
                            .catch(error);
                    },
                    cancelCallback: (): void => { } // todo: what will be if do not define this?
                }
            })
        );
    };
