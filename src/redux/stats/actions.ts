import { createAction } from "@reduxjs/toolkit";

import { StatsFilter, StatsRecord } from "@app/models/stats";

/**
 * @constant
 * Store fetched stats data
 */
export const setData = createAction<Array<StatsRecord>>("mas.gc/stats/setData");

/**
 * @constant
 * Store selected stats filter
 */
export const setFilter = createAction<StatsFilter>("mas.gc/stats/setFilter");

/**
 * @constant
 * Save current stats loaded state
 */
export const setLoaded = createAction<boolean | undefined>("mas.gc/stats/setLoaded");
