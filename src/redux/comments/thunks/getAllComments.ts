import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { Comment } from "@app/models";

import { get } from "@app/utils";

import { CompositeAppState, ActionWithPayload } from "@app/redux";
import { getSetAppIsLoadingAction, setError } from "@app/redux/app";
import { getSetCommentsAction, getSetModuleStateAction } from "@app/redux/comments";

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const getAllComments = (): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState
    ): void => {
        dispatch(getSetAppIsLoadingAction(true));

        get<Array<Comment>>(`/api/comments/getAll`)
            .then((comments: Array<Comment>) => {
                dispatch(getSetCommentsAction(comments));
                dispatch(getSetAppIsLoadingAction(false));
                dispatch(getSetModuleStateAction("idle"));
            })
            .catch(error => {
                dispatch(getSetModuleStateAction("idle"));
                setError(dispatch, getState)(error);
            });
    };
