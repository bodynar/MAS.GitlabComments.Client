import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { post } from "@app/utils/api";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { OpenModal } from "@app/redux/modal/actions";
import { ModalAction } from "@app/redux/modal/types";

import { deleteComment as deleteCommentAction, } from "../actions";
import { CommentsState } from "../types";
import { getSetIsLoadingAction, setError } from "../utils";

/**
 * Delete specified comment
 * @param commentId Comment identifier value
 * @returns Delete comment function that can be called with redux dispatcher
 */
export const deleteComment = (commentId: string): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, ActionWithPayload | ModalAction>,
        getState: () => CompositeAppState,
    ): void => {
        dispatch({
            type: OpenModal,
            params: {
                modalType: 'confirm',
                title: 'Confirm delete',
                buttonCaption: { saveCaption: 'Delete' },
                message: 'Are you sure want to delete selected comment?',
                callback: {
                    saveCallback: (): void => {
                        dispatch(getSetIsLoadingAction(true));

                        post(`api/comments/delete`, commentId)
                            .then(() => {
                                dispatch({
                                    type: deleteCommentAction,
                                    payload: {
                                        commentId: commentId
                                    }
                                });

                                dispatch(getSetIsLoadingAction(false));
                            })
                            .catch(setError(dispatch, getState));
                    },
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    cancelCallback: (): void => { }
                }
            }
        } as ModalAction);
    };