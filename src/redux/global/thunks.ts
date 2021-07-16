import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { ActionWithPayload } from "@app/redux/types";
import { get } from "@app/utils/api";


import { getSetIsLoadingAction, setError } from "../comments/utils";

import { GlobalAppState } from "./types";
import { setReadOnlyModeValue } from "./actions";

/**
 * Get application read only mode state
 * @returns Get application read only mode state function that can be called with redux dispatcher
 */
export const getReadOnlyMode = (): ThunkAction<void, GlobalAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<GlobalAppState, unknown, ActionWithPayload>): void => {
        dispatch(getSetIsLoadingAction(true));

        get<boolean>(`api/app/getIsReadOnly`)
            .then((readOnlyMode: boolean) => {
                dispatch({
                    type: setReadOnlyModeValue,
                    payload: {
                        readOnlyMode: readOnlyMode || false
                    }
                });

                dispatch(getSetIsLoadingAction(false));
            })
            .catch(setError(dispatch));
    };
