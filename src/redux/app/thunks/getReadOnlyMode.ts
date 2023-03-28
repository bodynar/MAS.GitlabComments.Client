import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { get } from "@app/utils";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { getSetReadOnlyModeAction } from "../actions/setReadOnlyMode";
import { getSetAppIsLoadingAction } from "../actions/setAppIsLoading";

/**
 * Get application read only mode state
 * @returns Get application read only mode state function that can be called with redux dispatcher
 */
export const getReadOnlyMode = (): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>): void => {
        dispatch(getSetAppIsLoadingAction(true));

        get<boolean>(`/api/app/getIsReadOnly`)
            .then((readOnlyMode: boolean) => {
                dispatch(getSetReadOnlyModeAction(readOnlyMode || false));

                dispatch(getSetAppIsLoadingAction(false));
            })
            .catch(() => dispatch(getSetAppIsLoadingAction(false)));
    };
