import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { get } from "@app/utils";

import { CompositeAppState } from "@app/redux/rootReducer";
import { ActionWithPayload } from "@app/redux/types";

import { getSetAppIsLoadingAction } from "@app/redux/app/actions/setAppIsLoading";
import { setError } from "@app/redux/app/utils";

import { Comment } from "@app/models";

import { getSetModuleStateAction } from "../actions/setModuleState";
import { getSetCommentsAction } from "../actions/setComments";

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
