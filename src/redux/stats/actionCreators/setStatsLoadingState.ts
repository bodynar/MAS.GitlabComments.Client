import { ActionWithPayload } from "@app/redux";

import { SET_STATS_LOADED_STATE } from "@app/redux/stats";

/**
 * Get setting stats loaded state action
 * @param loaded Is stats record loaded
 * @returns Redux action to dispatch to update app state
 */
export const getSetStatsLoadedStateAction = (loaded?: boolean): ActionWithPayload => ({
    type: SET_STATS_LOADED_STATE,
    payload: { loaded }
});
