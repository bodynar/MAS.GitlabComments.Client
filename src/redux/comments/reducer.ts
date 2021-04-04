import { Action } from "redux/types";

import { Comment } from "models/comment";

import { isNullOrUndefined, isStringEmpty } from "utils/common";
import { getPropertyValueWithCheck } from "utils/object";

import { CommentsState } from "./types";
import { addComment, deleteComment, increment, setComment, setComments, setError, setIsLoading, updateComment } from "./actions";

const initialState: CommentsState = {
    isLoading: false,
    comments: [],
};

export default function (state = initialState, action: Action): CommentsState {

    switch (action.type) {
        case setIsLoading: {
            const isLoading: boolean = getPropertyValueWithCheck(action.payload, 'isLoading', false);

            return {
                ...state,
                isLoading: isLoading
            };
        }
        case setError: {
            const error: string = getPropertyValueWithCheck(action.payload, 'error', false);

            if (isNullOrUndefined(error) || isStringEmpty(error)) {
                return state;
            }

            return {
                ...state,
                isLoading: false,
                error: error
            };
        }
        case addComment: {
            const comment: Comment = getPropertyValueWithCheck(action.payload, 'comment', false);

            if (isNullOrUndefined(comment) || isNullOrUndefined(comment.id)) {
                // log warning
                return state;
            }

            return {
                ...state,
                isLoading: false,
                comments: [...state.comments, comment]
            };
        }
        case setComments: {
            const comments: Array<Comment> = getPropertyValueWithCheck(action.payload, 'comments', false);

            if (isNullOrUndefined(comments)) {
                // log warning
                return state;
            }

            return {
                ...state,
                isLoading: false,
                comments: comments
            };
        }
        case setComment: {
            const comment: Comment = getPropertyValueWithCheck(action.payload, 'comment', false);

            if (isNullOrUndefined(comment)) {
                // log warning
                return state;
            }

            return {
                ...state,
                isLoading: false,
                comment: comment
            };
        }
        case increment: {
            const commentId: string = getPropertyValueWithCheck(action.payload, 'commentId', false);

            if (isNullOrUndefined(commentId) || isStringEmpty(commentId)) {
                // log warning
                return state;
            }

            return {
                ...state,
                isLoading: false,
                comments: state.comments.map(comment => {
                    let appearanceCount: number = comment.appearanceCount;

                    if (comment.id === commentId) {
                        ++appearanceCount;
                    }

                    return { ...comment, appearanceCount: appearanceCount };
                })
            };
        }
        case updateComment: {
            const comment: Comment = getPropertyValueWithCheck(action.payload, 'comment', false);

            if (isNullOrUndefined(comment)) {
                // log warning
                return state;
            }
            return {
                ...state,
                isLoading: false,
                comments: state.comments.map(x =>
                    x.id === comment.id
                        ? { ...x, ...comment }
                        : x
                )
            };
        }
        case deleteComment: {
            const commentId: string = getPropertyValueWithCheck(action.payload, 'commentId', false);

            if (isNullOrUndefined(commentId) || isStringEmpty(commentId)) {
                // log warning
                return state;
            }

            return {
                ...state,
                isLoading: false,
                comments: state.comments.filter(comment => comment.id !== commentId)
            };
        }
        default:
            return state;
    }
}
