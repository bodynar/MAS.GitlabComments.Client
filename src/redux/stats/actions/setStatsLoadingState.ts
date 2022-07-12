import { ActionWithPayload } from "@app/redux/types";

import { SetStatsLoadedState } from "../actions";

/**
 * Get setting stats loaded state action
 * @param loaded Is stats record loaded
 * @returns Redux action to dispatch to update app state
 */
export const getSetStatsLoadedStateAction = (loaded?: boolean): ActionWithPayload => ({
    type: SetStatsLoadedState,
    payload: { loaded }
});

