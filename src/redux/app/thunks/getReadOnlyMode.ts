import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { get } from "@app/utils";

import { ActionWithPayload, CompositeAppState } from "@app/redux";
import { getSetAppIsLoadingAction, getSetReadOnlyModeAction } from "@app/redux/app";

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
