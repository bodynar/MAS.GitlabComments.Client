import { getPropertyValue, getPropertyValueWithCheck } from "@bodynarf/utils/object";

import { StatsRecord } from "@app/models/response/statsRecord";

import { ActionWithPayload } from "../types";
import { SetStatsData, SetStatsFilters, SetStatsLoadedState } from "./actions";
import { DateRange, StatsFilter, StatsState } from "./types";

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
        case SetStatsData: {
            const data: Array<StatsRecord> = getPropertyValueWithCheck<Array<StatsRecord>>(action.payload, "data") || [];

            return {
                ...state,
                data
            };
        }
        case SetStatsFilters: {
            const filter: StatsFilter = getPropertyValueWithCheck<StatsFilter>(action.payload, "filter");

            return {
                ...state,
                filter: filter
            };
        }
        case SetStatsLoadedState: {
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
