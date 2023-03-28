import { StatsRecord } from "@app/models";

import { ActionWithPayload } from "@app/redux";
import { SET_STATS_DATA } from "@app/redux/stats";

/**
 * Get setting stats data state action
 * @param data Fetched statistics data
 * @returns Redux action to dispatch to update app state
 */
export const getSetStatsDataAction = (data: Array<StatsRecord>): ActionWithPayload => ({
    type: SET_STATS_DATA,
    payload: { data },
});
