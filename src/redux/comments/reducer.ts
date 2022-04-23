import { ActionWithPayload } from "@app/redux/types";

import { Comment } from "@app/models/comment";

import { isNullOrEmpty, isNullOrUndefined } from "@app/utils/common";
import { getPropertyValueWithCheck } from "@app/utils/object";

import { CommentModuleState, CommentsState } from "./types";
import { addComment, deleteComment, increment, setComments, setModuleState, setSearchQuery, updateComment } from "./actions";

/** Initial comment module state */
const initialState: CommentsState = {
    state: 'init',
    comments: [],
    searchQuery: '',
};

/** Comment module reducer function */
export default function (state = initialState, action: ActionWithPayload): CommentsState {
    switch (action.type) {
        case setModuleState: {
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
        case addComment: {
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
        case setComments: {
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
        case increment: {
            const commentId: string | undefined = getPropertyValueWithCheck(action.payload, 'commentId', false);

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
        case updateComment: {
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
        case deleteComment: {
            const commentId: string | undefined = getPropertyValueWithCheck(action.payload, 'commentId', false);

            if (isNullOrEmpty(commentId)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== commentId)
            };
        }
        case setSearchQuery: {
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
