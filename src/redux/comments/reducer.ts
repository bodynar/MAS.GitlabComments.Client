import { isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils/common";
import { getPropertyValueWithCheck } from "@bodynarf/utils/object";

import { ActionWithPayload } from "@app/redux/types";

import { Comment } from "@app/models/comment";

import { CommentModuleState, CommentsState } from "./types";
import { AddComment, DeleteComment, Increment, SetComments, SetModuleState, SetSearchQuery, UpdateComment } from "./actions";

/** Initial comment module state */
const initialState: CommentsState = {
    state: 'init',
    comments: [],
    searchQuery: '',
};

/** Comment module reducer function */
export default function (state = initialState, action: ActionWithPayload): CommentsState {
    switch (action.type) {
        case SetModuleState: {
            const nextState: CommentModuleState = getPropertyValueWithCheck(action.payload, 'nextState', false);

            if (isNullOrUndefined(nextState)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                state: nextState,
            };
        }
        case AddComment: {
            const comment: Comment = getPropertyValueWithCheck(action.payload, 'comment', false);

            if (isNullOrUndefined(comment) || isNullOrUndefined(comment.id)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                comments: [...state.comments, comment]
            };
        }
        case SetComments: {
            const comments: Array<Comment> = getPropertyValueWithCheck(action.payload, 'comments', false);

            if (isNullOrUndefined(comments)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                comments: comments
            };
        }
        case Increment: {
            const commentId: string = getPropertyValueWithCheck(action.payload, 'commentId', false);

            if (isNullOrEmpty(commentId)) {
                // TODO: v2 log warning
                return state;
            }

            const specifiedComment: Comment | undefined =
                state.comments.find(({ id }) => id === commentId);

            if (isNullOrUndefined(specifiedComment)) {
                // TODO: v2 log warning
                return state;
            }

            (specifiedComment as Comment).appearanceCount += 1;
            // TODO: v2 when increment - sort in view

            return {
                ...state,
                comments: state.comments.sort((x, y) => y.appearanceCount - x.appearanceCount)
            };
        }
        case UpdateComment: {
            const comment: Comment = getPropertyValueWithCheck(action.payload, 'comment', false);

            if (isNullOrUndefined(comment)) {
                // TODO: v2 log warning
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
        case DeleteComment: {
            const commentId: string = getPropertyValueWithCheck(action.payload, 'commentId', false);

            if (isNullOrEmpty(commentId)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== commentId)
            };
        }
        case SetSearchQuery: {
            const searchQuery: string = getPropertyValueWithCheck(action.payload, 'searchQuery', false) || '';

            return {
                ...state,
                searchQuery
            };
        }
        default:
            return state;
    }
}
