import { ThunkAction, ThunkDispatch } from "redux-thunk";

// import { get } from "@app/utils/api";

import { CompositeAppState } from "@app/redux/rootReducer";
import { ActionWithPayload } from "@app/redux/types";

import { Comment } from "@app/models/comment";

import { setComments } from "../actions";
import { getSetIsLoadingAction } from "../utils";
import { generateGuid } from "@app/utils/guid";

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const getAllComments = (): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState
    ): void => {
        dispatch(getSetIsLoadingAction(true));

        getState();
        // get<Array<Comment>>(`/api/comments/getAll`)
        // .then((comments: Array<Comment>) => {
        dispatch({
            type: setComments,
            payload: {
                comments: mockComments
            }
        });

        dispatch(getSetIsLoadingAction(false));
        // })
        // .catch(setError(dispatch, getState));
    };

const mockComments: Array<Comment> =
    new Array(100)
        .fill(0, 0, 100)
        .map((_, i) => ({
            id: generateGuid(),
            appearanceCount: i + 1,
            message: `Comment ${i + 1}`
        }))
        .map(x => ({
            ...x,
            id: x.appearanceCount === 15 ? 'afb494f8-5977-4a12-9fca-b7da599802e4' : x.id
        }))
        .map(x => ({
            ...x,
            message: `Comment ${x.id}`
        }));
