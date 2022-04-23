import { StatsRecord } from "@app/models/response/statsRecord";
import { getPropertyValueWithCheck } from "@app/utils/object";

import { ActionWithPayload } from "../types";
import { SetStatsData, SetStatsFilters, StatsFilter, StatsState } from "./types";

/** Default stats module state */
const defaultState: StatsState = {
    data: [],
};

/**
 * Update statistics module state depending on dispatched action
 * @param state Current state
 * @param action Dispatched action
 * @returns Updated state
 */
export default function (state: StatsState = defaultState, action: ActionWithPayload): StatsState {
    switch (action.type) {
        case SetStatsData: {
            const data: Array<StatsRecord> = getPropertyValueWithCheck<Array<StatsRecord>>(action.payload, 'data') || [];

            return {
                ...state,
                data
            };
        }
        case SetStatsFilters: {
            const filter: StatsFilter = getPropertyValueWithCheck<StatsFilter>(action.payload, 'filter');

            return {
                ...state,
                filter: filter
            };
        }
        default: {
            return state;
        }
    }
}
