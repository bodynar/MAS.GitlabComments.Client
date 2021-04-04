import { Action } from "redux/types";

import { Comment } from "models/comment";

import { isNullOrUndefined, isStringEmpty } from "utils/common";
import { getPropertyValueWithCheck } from "utils/object";

import { CommentModuleState, CommentsState } from "./types";
import { addComment, deleteComment, increment, setComment, setComments, setError, setModuleState, updateComment } from "./actions";

const initialState: CommentsState = {
    state: 'init',
    comments: [],
};

// TODO: add manual setting state to each case
// depending on flow-chart
export default function (state = initialState, action: Action): CommentsState {
    switch (action.type) {
        case setModuleState: {
            const nextState: CommentModuleState = getPropertyValueWithCheck(action.payload, 'nextState', false);

            if (isNullOrUndefined(nextState)) {
                // log warning
                return state;
            }

            return {
                ...state,
                state: nextState,
            };
        }
        case setError: {
            const error: string = getPropertyValueWithCheck(action.payload, 'error', false);

            if (isNullOrUndefined(error) || isStringEmpty(error)) {
                return state;
            }

            return {
                ...state,
                state: 'error',
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
                state: 'showModal',
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
                comments: state.comments.filter(comment => comment.id !== commentId)
            };
        }
        default:
            return state;
    }
}
