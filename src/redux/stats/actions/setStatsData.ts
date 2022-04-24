import { StatsRecord } from "@app/models/response/statsRecord";

import { ActionWithPayload } from "@app/redux/types";

import { SetStatsData } from "../actions";

/**
 * Get setting stats data state action
 * @param data Fetched statistics data
 * @returns Redux action to dispatch to update app state
 */
export const setStatsData = (data: Array<StatsRecord>): ActionWithPayload => ({
    type: SetStatsData,
    payload: { data },
});
