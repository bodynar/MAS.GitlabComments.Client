import { createReducer } from "@reduxjs/toolkit";

import { AppState, setDarkMode, setIsLoadingState, setReadOnlyMode, setTabIsFocused, setVariables } from "@app/redux/app";

const defaultState: AppState = {
    isCurrentTabFocused: true,
    loading: false,
    isDarkMode: false,
    variables: [],
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
            .addCase(setVariables, (state, { payload }) => {
                state.variables = payload;
            })
            ;
    }
);
