import { Action } from "redux/types";

import { isNullOrUndefined, isStringEmpty } from "utils/common";
import { ensurePropertyDefined } from "utils/object";

import { CommentsState } from "./types";
import { increment, setComment, setComments, setError, setIsLoading, updateComment } from "./actions";

const initialState: CommentsState = {
    isLoading: false,
    comments: [],
};
// TODO: fix type and handle ensurePropertyDefined calls
export default function (state = initialState, action: Action): CommentsState {

    switch (action.type) {
        case setIsLoading: {
            ensurePropertyDefined(action.payload, 'isLoading');
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        }
        case setError: {
            ensurePropertyDefined(action.payload, 'error');
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case setComment: {
            ensurePropertyDefined(action.payload, 'comment');
            if (isNullOrUndefined(action.payload.comment)) {
                // log warning
                return state;
            }
            return {
                ...state,
                isLoading: false,
                comment: action.payload.comment
            };
        }
        case setComments: {
            ensurePropertyDefined(action.payload, 'comments');
            if (isNullOrUndefined(action.payload.comments)) {
                // log warning
                return state;
            }
            return {
                ...state,
                isLoading: false,
                comments: action.payload.comments
            };
        }
        case increment: {
            ensurePropertyDefined(action.payload, 'commentId');
            if (isNullOrUndefined(action.payload.commentId) || isStringEmpty(action.payload.commentId)) {
                // log warning
                return state;
            }
            return {
                ...state,
                isLoading: false,
                comments: state.comments.map(comment => {
                    let appearanceCount: number = comment.appearanceCount;

                    if (comment.id === action.payload.commentId) {
                        ++appearanceCount;
                    }

                    return { ...comment, appearanceCount: appearanceCount };
                })
            };
        }
        case updateComment: {
            ensurePropertyDefined(action.payload, 'comment');
            if (isNullOrUndefined(action.payload.comment)) {
                // log warning
                return state;
            }
            return {
                ...state,
                isLoading: false,
                comments: state.comments.map(comment =>
                    comment.id === action.payload.comment.id
                        ? { ...comment, ...action.payload.comment }
                        : comment
                )
            };
        }
        default:
            return state;
    }
}
