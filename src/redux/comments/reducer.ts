import { Action } from "redux/types";

import { isNullOrUndefined } from "utils/common";
import { ensurePropertyDefined } from "utils/object";

import { CommentsState } from "./types";
import { setCommentActionType, setCommentsActionType, setErrorActionType, setIsLoadingActionType } from "./actions";

const initialState: CommentsState = {
    isLoading: false,
    comments: [],
};
// TODO: fix type and handle ensurePropertyDefined calls
export default function (state = initialState, action: Action): CommentsState {

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
                isLoading: false,
                error: action.payload.error
            };
        }
        case setCommentActionType: {
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
        case setCommentsActionType: {
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
        default:
            return state;
    }
}
