import { isNullOrEmpty, isNullOrUndefined, getPropertyValueWithCheck } from "@bodynarf/utils";

import { Comment } from "@app/models";

import { ActionWithPayload } from "@app/redux";
import { ADD_COMMENT, DELETE_COMMENT, INCREMENT, SET_COMMENTS, SET_MODULE_STATE, SET_SEARCH_QUERY, UPDATE_COMMENT, CommentModuleState, CommentsState } from "@app/redux/comments";

/** Initial comment module state */
const initialState: CommentsState = {
    state: "init",
    comments: [],
    searchQuery: "",
};

/** Comment module reducer function */
export default function (state = initialState, action: ActionWithPayload): CommentsState {
    switch (action.type) {
        case SET_MODULE_STATE: {
            const nextState: CommentModuleState = getPropertyValueWithCheck(action.payload, "nextState", false);

            if (isNullOrUndefined(nextState)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                state: nextState,
            };
        }
        case ADD_COMMENT: {
            const comment: Comment = getPropertyValueWithCheck(action.payload, "comment", false);

            if (isNullOrUndefined(comment) || isNullOrUndefined(comment.id)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                comments: [...state.comments, comment]
            };
        }
        case SET_COMMENTS: {
            const comments: Array<Comment> = getPropertyValueWithCheck(action.payload, "comments", false);

            if (isNullOrUndefined(comments)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                comments: comments
            };
        }
        case INCREMENT: {
            const commentId: string = getPropertyValueWithCheck(action.payload, "commentId", false);

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
        case UPDATE_COMMENT: {
            const comment: Comment = getPropertyValueWithCheck(action.payload, "comment", false);

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
        case DELETE_COMMENT: {
            const commentId: string = getPropertyValueWithCheck(action.payload, "commentId", false);

            if (isNullOrEmpty(commentId)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== commentId)
            };
        }
        case SET_SEARCH_QUERY: {
            const searchQuery: string = getPropertyValueWithCheck(action.payload, "searchQuery", false) || "";

            return {
                ...state,
                searchQuery
            };
        }
        default:
            return state;
    }
}
