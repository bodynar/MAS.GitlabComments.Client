import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { AddComment } from "models/request/addComment";
import { UpdateComment } from "models/request/updateComment";

import { Action } from "redux/types";
import { get, post } from "utils/api";

import {
    setComment,
    setError as setErrorAction,
    setIsLoading,
    increment as incrementAction,
    addComment as addCommentAction,
    updateComment as updateCommentAction,
    deleteComment as deleteCommentAction,
    setModuleState
} from "./actions";
import { CommentModuleState, CommentsState } from "./types";

const getSetIsLoadingAction = (isLoading: boolean): Action => {
    const nextState: CommentModuleState = isLoading ? 'loading' : 'idle';

    return {
        type: setModuleState,
        payload: { nextState }
    };
};

const setError = (dispatch: ThunkDispatch<CommentsState, unknown, Action>) => (error: string): void => {
    dispatch({
        type: setErrorAction,
        payload: {
            error: error
        }
    });

    setTimeout(() => {
        dispatch({
            type: setModuleState,
            payload: {
                nextState: 'idle' as CommentModuleState
            }
        });
    }, 5 * 1000); // TODO: configure this with error display message timeout
};

/**
 * Add comment via api
 * @param addComment Model for adding comment
 * @returns Add comment function that can be called with redux dispatcher
 */
export const addComment = (addComment: AddComment): ThunkAction<void, CommentsState, unknown, Action> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, Action>): void => {
        dispatch(getSetIsLoadingAction(true));

        post<string>(`api/comments/add`, addComment)
            .then((id: string) => dispatch({
                type: addCommentAction,
                payload: {
                    comment: {
                        ...addComment,
                        id: id
                    }
                }
            }))
            .catch(setError(dispatch));
    };

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const getAllComments = (): ThunkAction<void, CommentsState, unknown, Action> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, Action>): void => {
        dispatch(getSetIsLoadingAction(true));

        get<Array<Comment>>(`api/comments/getAll`)
            .then((comments: Array<Comment>) => {
                dispatch({
                    type: setIsLoading,
                    payload: {
                        comments: comments
                    }
                } as Action);

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch));
    };

/**
 * Get description for specified comment from api
 * @param commentId Comment identifier value
 * @param commentMessage Comment message
 * @returns Get description function that can be called with redux dispatcher
 */
export const getDescription = (commentId: string, commentMessage: string): ThunkAction<void, CommentsState, unknown, Action> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, Action>): void => {
        dispatch(getSetIsLoadingAction(true));

        get<string>(`api/comments/description?commentId=${commentId}`)
            .then((description: string) => {
                dispatch({
                    type: setComment,
                    payload: {
                        comment: {
                            commentId: commentId,
                            message: commentMessage,
                            description: description
                        }
                    }
                });
            })
            .catch(setError(dispatch));
    };

/**
 * Increment appearance count in specified comment
 * @param commentId Comment identifier value
 * @returns Increment appearance count function that can be called with redux dispatcher
 */
export const increment = (commentId: string): ThunkAction<void, CommentsState, unknown, Action> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, Action>): void => {
        dispatch(getSetIsLoadingAction(true));

        post(`api/comments/increment`, { commentId: commentId })
            .then(() => {
                dispatch({
                    type: incrementAction,
                    payload: {
                        commentId: commentId
                    }
                });
            })
            .catch(setError(dispatch));
    };

/**
 * Update specified comment
 * @param updateComment Model with updated comment values
 * @returns Update comment function that can be called with redux dispatcher
 */
export const updateComment = (updateComment: UpdateComment): ThunkAction<void, CommentsState, unknown, Action> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, Action>): void => {
        dispatch(getSetIsLoadingAction(true));

        post(`api/comments/update`, updateComment)
            .then(() => dispatch({
                type: updateCommentAction,
                payload: {
                    comment: updateComment
                }
            }))
            .catch(setError(dispatch));
    };

/**
 * Delete specified comment
 * @param commentId Comment identifier value
 * @returns Delete comment function that can be called with redux dispatcher
 */
export const deleteComment = (commentId: string): ThunkAction<void, CommentsState, unknown, Action> =>
    (dispatch: ThunkDispatch<CommentsState, unknown, Action>): void => {
        dispatch(getSetIsLoadingAction(true));

        post(`api/comments/delete`, { commentId: commentId })
            .then(() => dispatch({
                type: deleteCommentAction,
                payload: {
                    commentId: commentId
                }
            }))
            .catch(setError(dispatch));
    };
