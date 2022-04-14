import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { get } from "@app/utils/api";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { getSetIsLoadingAction, setError } from "@app/redux/comments/utils";

import { SetReadOnlyModeState } from "../types";

/**
 * Get application read only mode state
 * @returns Get application read only mode state function that can be called with redux dispatcher
 */
export const getReadOnlyMode = (): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState
    ): void => {
        dispatch(getSetIsLoadingAction(true));

        get<boolean>(`api/app/getIsReadOnly`)
            .then((readOnlyMode: boolean) => {
                dispatch({
                    type: SetReadOnlyModeState,
                    payload: {
                        readOnlyMode: readOnlyMode || false
                    }
                });

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch, getState));
    };
