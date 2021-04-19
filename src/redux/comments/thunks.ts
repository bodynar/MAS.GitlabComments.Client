import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { Action, ActionWithPayload } from "redux/types";

import { OpenModal } from "redux/modal/actions";
import { ModalAction, ModalCallback, ModalParams } from "redux/modal/types";
import { AddNotification, NotificatorAction } from "redux/notificator/types";

import { get, post } from "utils/api";

import { NotificationItem } from "models/notification";
import { BaseCommentModel } from "models/comment";

import {
    increment as incrementAction,
    addComment as addCommentAction,
    updateComment as updateCommentAction,
    deleteComment as deleteCommentAction,
    setModuleState,
    setComments
} from "./actions";
import { CommentModuleState, CommentsState } from "./types";
import { getCommentModalFormCallbackConfig, getCommentModalFormConfig } from "./utils";

const getSetIsLoadingAction = (isLoading: boolean): ActionWithPayload => {
    const nextState: CommentModuleState = isLoading ? 'loading' : 'idle';

    return {
        type: setModuleState,
        payload: { nextState }
    };
};

const getSuccessNotificationAction = (message: string): NotificatorAction => ({
    type: AddNotification,
    notifications: [{ type: 'success', message }]
});

const setError = (dispatch: ThunkDispatch<CommentsState, unknown, Action>) => (error: string): void => {
    dispatch({
        type: AddNotification,
        notifications: [{ type: 'error', message: error } as NotificationItem]
    });

    dispatch({
        type: setModuleState,
        payload: {
            nextState: 'idle' as CommentModuleState
        }
    });
};

/**
 * Add comment via modal form
 * @returns Add comment function that can be called with redux dispatcher
 */
export const addComment = (): ThunkAction<void, CommentsState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, ModalAction | ActionWithPayload>): void => {
        dispatch({
            type: setModuleState,
            payload: { nextState: 'showModal' }
        } as ActionWithPayload);

        const modalParams: ModalParams = getCommentModalFormConfig();

        const modalCallback: ModalCallback = getCommentModalFormCallbackConfig(dispatch,
            (comment) => {
                return (dispatch): void => {
                    dispatch(getSetIsLoadingAction(true));

                    post<string>(`api/comments/add`, comment)
                        .then((id: string) => {
                            dispatch(getSuccessNotificationAction('Comment was added successfully'));

                            dispatch({
                                type: addCommentAction,
                                payload: {
                                    comment: {
                                        ...comment,
                                        id: id
                                    }
                                }
                            });

                            dispatch(getSetIsLoadingAction(false));
                        })
                        .catch(setError(dispatch));
                };
            });

        dispatch({
            type: OpenModal,
            params: {
                ...modalParams,
                callback: { ...modalCallback },
            }
        } as ModalAction);
    };

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const getAllComments = (): ThunkAction<void, CommentsState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, ActionWithPayload>): void => {
        dispatch(getSetIsLoadingAction(true));

        get<Array<Comment>>(`api/comments/getAll`)
            .then((comments: Array<Comment>) => {
                dispatch({
                    type: setComments,
                    payload: {
                        comments: comments
                    }
                });

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch));
    };

/**
 * Show description for specified comment from api
 * @param commentId Comment identifier value
 * @returns Show description function that can be called with redux dispatcher
 */
export const showDescription = (commentId: string): ThunkAction<void, CommentsState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, ActionWithPayload | ModalAction>): void => {
        dispatch(getSetIsLoadingAction(true));

        get<string>(`api/comments/description?commentId=${commentId}`)
            .then((description: string) => {
                dispatch(getSetIsLoadingAction(false));

                dispatch({
                    type: OpenModal,
                    params: {
                        modalType: 'info',
                        title: 'Comment description',
                        message: description,
                    }
                } as ModalAction);
            })
            .catch(setError(dispatch));
    };

/**
 * Increment appearance count in specified comment
 * @param commentId Comment identifier value
 * @returns Increment appearance count function that can be called with redux dispatcher
 */
export const increment = (commentId: string): ThunkAction<void, CommentsState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, ActionWithPayload | NotificatorAction>): void => {
        dispatch(getSetIsLoadingAction(true));

        post(`api/comments/increment`, { commentId: commentId })
            .then(() => {
                dispatch(getSuccessNotificationAction('Comment appearence count was updated successfully'));

                dispatch({
                    type: incrementAction,
                    payload: {
                        commentId: commentId
                    }
                });

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch));
    };

/**
 * Update specified comment
 * @param commentId Comment identifier value
 * @returns Update comment function that can be called with redux dispatcher
 */
export const updateComment = (commentId: string): ThunkAction<void, CommentsState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, ActionWithPayload | ModalAction>): void => {
        dispatch(getSetIsLoadingAction(true));

        get<BaseCommentModel>(`api/comments/get?commentId=${commentId}`)
            .then(comment => {
                dispatch(getSetIsLoadingAction(false));

                const modalParams: ModalParams =
                    getCommentModalFormConfig(comment);

                const modalCallback: ModalCallback = getCommentModalFormCallbackConfig(dispatch,
                    (comment) => {
                        return (dispatch): void => {
                            dispatch(getSetIsLoadingAction(true));

                            post(`api/comments/update`, comment)
                                .then(() => {
                                    dispatch(getSuccessNotificationAction('Comment was updated successfully'));

                                    dispatch({
                                        type: updateCommentAction,
                                        payload: {
                                            comment: { ...comment, id: commentId }
                                        }
                                    });

                                    dispatch(getSetIsLoadingAction(false));
                                })
                                .catch(setError(dispatch));
                        };
                    });

                dispatch({
                    type: OpenModal,
                    params: {
                        ...modalParams,
                        callback: { ...modalCallback },
                    }
                } as ModalAction);
            })
            .catch(setError(dispatch));
    };

/**
 * Delete specified comment
 * @param commentId Comment identifier value
 * @returns Delete comment function that can be called with redux dispatcher
 */
export const deleteComment = (commentId: string): ThunkAction<void, CommentsState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, ActionWithPayload>): void => {
        // TODO: add confirm
        dispatch(getSetIsLoadingAction(true));

        post(`api/comments/delete`, { commentId: commentId })
            .then(() => {
                dispatch({
                    type: deleteCommentAction,
                    payload: {
                        commentId: commentId
                    }
                });

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch));
    };
