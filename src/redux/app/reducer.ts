import { createReducer } from "@reduxjs/toolkit";

import { appendRequest, AppState, removeRequest, setDarkMode, setReadOnlyMode, setTabIsFocused, setVariables } from "@app/redux/app";

const defaultState: AppState = {
    isCurrentTabFocused: true,
    loading: false,
    variables: [],
    httpRequests: [],
};

/** App container module reducer */
export const reducer = createReducer(defaultState,
    (builder) => {
        builder
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
            .addCase(appendRequest, (state, { payload }) => {
                state.httpRequests.push(payload);

                state.loading = true;
            })
            .addCase(removeRequest, (state, { payload }) => {
                const hasHttpRequest = state.httpRequests.some(({ id }) => id === payload);

                if (!hasHttpRequest) {
                    return;
                }

                state.httpRequests = [
                    ...state.httpRequests.filter(({ id }) => id !== payload)
                ];

                if (state.httpRequests.length === 0) {
                    state.loading = false;
                }
            })
            ;
    }
);
