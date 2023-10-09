import { createReducer } from "@reduxjs/toolkit";

import { StatsState, setData, setFilter, setLoaded } from "@app/redux/stats";
import { DateRange } from "@app/models/stats";

/** Default stats module state */
const initialState: StatsState = {
    data: [],
    filter: {
        type: DateRange.None
    },
};

/** Statistics module state reducer */
export const reducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(setData, (state, { payload }) => {
                state.data = payload;
            })
            .addCase(setFilter, (state, { payload }) => {
                state.filter = payload;
            })
            .addCase(setLoaded, (state, { payload }) => {
                state.loaded = payload;
            })
            ;
    }
);
