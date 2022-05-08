import { ActionWithPayload } from "@app/redux/types";

import { SetIsAppLoadingState } from "../types";

/**
 * Get redux action "Set app is in loading state"
 * @param loading Is app in loading state 
 * @returns Redux action to update state
 */
export const setAppIsLoading = (loading: boolean): ActionWithPayload => ({
    type: SetIsAppLoadingState,
    payload: { loading },
});

