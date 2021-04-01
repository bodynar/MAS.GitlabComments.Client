import { AddComment } from "models/request/addComment";
import { UpdateComment } from "models/request/updateComment";

import { Action } from "redux/types";
import { get, post } from "utils/api";

import {
    setComment,
    setError,
    setIsLoading,
    increment as incrementAction,
    addComment as addCommentAction,
    updateComment as updateCommentAction,
    deleteComment as deleteCommentAction
} from "./actions";

const getSetIsLoadingAction = (isLoading: boolean): Action => {
    return {
        type: setIsLoading,
        payload: {
            isLoading: isLoading
        }
    };
};

const getSetErrorAction = (error: string): Action => {
    return {
        type: setError,
        payload: {
            error: error
        }
    };
};

/**
 * Add comment via api
 * @param addComment Model for adding comment
 * @returns Add comment function that can be called with redux dispatcher
 */
export const addComment = (addComment: AddComment): (dispatch: (action: Action) => void) => Promise<void> => {
    return async (dispatch: (action: Action) => void): Promise<void> => {
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
            .catch((error: string) => dispatch(getSetErrorAction(error)));
    };
};

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const getAllComments = (): (dispatch: (action: Action) => void) => Promise<void> => {
    return async (dispatch: (action: Action) => void): Promise<void> => {
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
            .catch((error: string) => dispatch(getSetErrorAction(error)));
    };
};

/**
 * Get description for specified comment from api
 * @param commentId Comment identifier value
 * @param commentMessage Comment message
 * @returns Get description function that can be called with redux dispatcher
 */
export const getDescription = (commentId: string, commentMessage: string): (dispatch: (action: Action) => void) => Promise<void> => {
    return async (dispatch: (action: Action) => void): Promise<void> => {
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
                })
            })
            .catch((error: string) => dispatch(getSetErrorAction(error)));
    };
};

/**
 * Increment appearance count in specified comment
 * @param commentId Comment identifier value
 * @returns Increment appearance count function that can be called with redux dispatcher
 */
export const increment = (commentId: string): (dispatch: (action: Action) => void) => Promise<void> => {
    return async (dispatch: (action: Action) => void): Promise<void> => {
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
            .catch((error: string) => dispatch(getSetErrorAction(error)));
    };
};

/**
 * Update specified comment
 * @param updateComment Model with updated comment values
 * @returns Update comment function that can be called with redux dispatcher
 */
export const updateComment = (updateComment: UpdateComment): (dispatch: (action: Action) => void) => Promise<void> => {
    return async (dispatch: (action: Action) => void): Promise<void> => {
        dispatch(getSetIsLoadingAction(true));

        post(`api/comments/update`, updateComment)
            .then(() => dispatch({
                type: updateCommentAction,
                payload: {
                    comment: updateComment
                }
            }))
            .catch((error: string) => dispatch(getSetErrorAction(error)));
    };
};

/**
 * Delete specified comment
 * @param commentId Comment identifier value
 * @returns Delete comment function that can be called with redux dispatcher
 */
export const deleteComment = (commentId: string): (dispatch: (action: Action) => void) => Promise<void> => {
    return async (dispatch: (action: Action) => void): Promise<void> => {
        dispatch(getSetIsLoadingAction(true));

        post(`api/comments/delete`, { commentId: commentId })
            .then(() => dispatch({
                type: deleteCommentAction,
                payload: {
                    commentId: commentId
                }
            }))
            .catch((error: string) => dispatch(getSetErrorAction(error)));
    };
};
