import { Action } from "redux/types";

import { isNullOrUndefined } from "utils/common";
import { ensurePropertyDefined } from "utils/object";

import { CommentsState } from "./types";
import { setCommentActionType, setCommentsActionType, setErrorActionType, setIsLoadingActionType } from "./actions";

const initialState: CommentsState = {
    isLoading: false,
    comments: [],
};

/**
 * API:
    comments/add
    comments/getAll
    comments/setDescription
    comments/increment
    comments/update
    comments/delete
 * 
 */

// TODO: fix type and handle ensurePropertyDefined calls
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (state = initialState, action: Action<any>): CommentsState {

    switch (action.type) {
        case setIsLoadingActionType: {
            ensurePropertyDefined(action.payload, 'isLoading');
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        }
        case setErrorActionType: {
            ensurePropertyDefined(action.payload, 'error');
            return {
                ...state,
                error: action.payload.error
            };
        }
        case setCommentsActionType: {
            ensurePropertyDefined(action.payload, 'comment');
            if (isNullOrUndefined(action.payload.comment)) {
                // log warning
                return state;
            }
            return {
                ...state,
                comment: action.payload.comment
            };
        }
        case setCommentActionType: {
            ensurePropertyDefined(action.payload, 'comments');
            if (isNullOrUndefined(action.payload.comments)) {
                // log warning
                return state;
            }
            return {
                ...state,
                comments: action.payload.comments
            };
        }
        default:
            return state;
    }
}
