import { StatsRecord } from "@app/models/response/statsRecord";

import { ActionWithPayload } from "../types";

import { SetStatsData, SetStatsFilters, StatsFilter } from "./types";

/**
 * Get setting stats data state action
 * @param data Fetched statistics data
 * @returns Redux action to dispatch to update app state
 */
export const setStatsData = (data: Array<StatsRecord>): ActionWithPayload => ({
    type: SetStatsData,
    payload: { data },
});

/**
 * Get setting stats filter state action
 * @param filter Selected filter
 * @returns Redux action to dispatch to update app state
 */
export const setStatsFilter = (filter: StatsFilter): ActionWithPayload => ({
    type: SetStatsFilters,
    payload: { filter }
});
