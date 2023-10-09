import { createReducer } from "@reduxjs/toolkit";

import { AppState, setDarkMode, setIsLoadingState, setReadOnlyMode, setTabIsFocused } from "@app/redux/app";

const defaultState: AppState = {
    isCurrentTabFocused: true,
    loading: false,
};

/** App container module reducer */
export const reducer = createReducer(defaultState,
    (builder) => {
        builder
            .addCase(setIsLoadingState, (state, { payload }) => {
                state.loading = payload;
            })
            .addCase(setTabIsFocused, (state, { payload }) => {
                state.isCurrentTabFocused = payload;
            })
            .addCase(setReadOnlyMode, (state, { payload }) => {
                state.readOnlyMode = payload;
            })
            .addCase(setDarkMode, (state, { payload }) => {
                state.isDarkMode = payload;
            })
            ;
    }
);
