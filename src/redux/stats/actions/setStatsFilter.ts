import { ActionWithPayload } from "@app/redux";

import { SetStatsFilters } from "../actions";
import { StatsFilter } from "../types";

/**
 * Get setting stats filter state action
 * @param filter Selected filter
 * @returns Redux action to dispatch to update app state
 */
export const getSetStatsFilterAction = (filter: StatsFilter): ActionWithPayload => ({
    type: SetStatsFilters,
    payload: { filter }
});

