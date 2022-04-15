import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { get } from "@app/utils/api";

import { CompositeAppState } from "@app/redux/rootReducer";
import { ActionWithPayload } from "@app/redux/types";

import { setComments } from "../actions";
import { getSetIsLoadingAction, setError } from "../utils";

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const getAllComments = (): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState
    ): void => {
        dispatch(getSetIsLoadingAction(true));

        get<Array<Comment>>(`/api/comments/getAll`)
            .then((comments: Array<Comment>) => {
                dispatch({
                    type: setComments,
                    payload: {
                        comments: comments
                    }
                });

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch, getState));
    };
