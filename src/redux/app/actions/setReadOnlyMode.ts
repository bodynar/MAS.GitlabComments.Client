import { ActionWithPayload } from "@app/redux/types";

import { SetReadOnlyModeState } from "../actions";

/**
 * Get redux action "Set app is read only mode state"
 * @param readOnlyMode Is app should be in read only state
 * @returns Redux action to update state
 */
export const getSetReadOnlyModeAction = (readOnlyMode: boolean): ActionWithPayload => ({
    type: SetReadOnlyModeState,
    payload: { readOnlyMode },
});
