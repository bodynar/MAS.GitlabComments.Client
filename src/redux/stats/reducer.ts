import { getPropertyValue, getPropertyValueWithCheck } from "@bodynarf/utils";

import { StatsRecord } from "@app/models";

import { ActionWithPayload } from "@app/redux";
import { SET_STATS_DATA, SET_STATS_FILTER, SET_STATS_LOADED_STATE, DateRange, StatsFilter, StatsState } from "@app/redux/stats";

/** Default stats module state */
const defaultState: StatsState = {
    data: [],
    filter: {
        type: DateRange.None
    },
};

/**
 * Update statistics module state depending on dispatched action
 * @param state Current state
 * @param action Dispatched action
 * @returns Updated state
 */
export default function (state: StatsState = defaultState, action: ActionWithPayload): StatsState {
    switch (action.type) {
        case SET_STATS_DATA: {
            const data: Array<StatsRecord> = getPropertyValueWithCheck<Array<StatsRecord>>(action.payload, "data") || [];

            return {
                ...state,
                data
            };
        }
        case SET_STATS_FILTER: {
            const filter: StatsFilter = getPropertyValueWithCheck<StatsFilter>(action.payload, "filter");

            return {
                ...state,
                filter: filter
            };
        }
        case SET_STATS_LOADED_STATE: {
            const loaded: boolean | undefined = getPropertyValue<boolean>(action.payload, "loaded");

            return {
                ...state,
                loaded
            };
        }
        default: {
            return state;
        }
    }
}
