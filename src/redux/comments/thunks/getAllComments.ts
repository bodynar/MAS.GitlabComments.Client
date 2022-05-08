import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { get } from "@app/utils/delayedApi";

import { CompositeAppState } from "@app/redux/rootReducer";
import { ActionWithPayload } from "@app/redux/types";

import { getSetAppIsLoadingAction } from "@app/redux/app/actions/setAppIsLoading";
import { setErrorWithDelay } from "@app/redux/app/utils";

import { Comment } from "@app/models/comment";

import { getSetModuleStateAction } from "../actions/setModuleState";
import { getSetCommentsAction } from "../actions/setComments";

// import { generateGuid } from "@app/utils/guid";

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const getAllComments = (): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState
    ): void => {
        dispatch(getSetAppIsLoadingAction(true));

        // getState();
        get<Array<Comment>>(`/api/comments/getAll`)
            .then((comments: Array<Comment>) => {
                dispatch(getSetCommentsAction(comments));
                dispatch(getSetAppIsLoadingAction(false));
                dispatch(getSetModuleStateAction("idle"));
            })
            .catch(() => {
                setErrorWithDelay(dispatch, getState);
                dispatch(getSetModuleStateAction("idle"));
            });
    };

// const mockComments: Array<Comment> =
//     new Array(100)
//         .fill(0, 0, 100)
//         .map((_, i) => ({
//             id: generateGuid(),
//             appearanceCount: i + 1,
//             message: `Comment ${i + 1}`
//         }))
//         .map(x => ({
//             ...x,
//             id: x.appearanceCount === 15 ? 'afb494f8-5977-4a12-9fca-b7da599802e4' : x.id
//         }))
//         .map(x => ({
//             ...x,
//             message: `Comment ${x.id}`
//         }));
