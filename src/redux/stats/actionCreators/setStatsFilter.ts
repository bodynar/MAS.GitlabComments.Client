import { ActionWithPayload } from "@app/redux";
import { SET_STATS_FILTER, StatsFilter } from "@app/redux/stats";

/**
 * Get setting stats filter state action
 * @param filter Selected filter
 * @returns Redux action to dispatch to update app state
 */
export const getSetStatsFilterAction = (filter: StatsFilter): ActionWithPayload => ({
    type: SET_STATS_FILTER,
    payload: { filter }
});
