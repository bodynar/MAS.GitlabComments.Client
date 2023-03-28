import { getPropertyValueWithCheck } from "@bodynarf/utils";

import { ActionWithPayload } from "../types";
import { SetDarkModeState, SetIsAppLoadingState, SetReadOnlyModeState, SetTabIsFocused } from "./actions";

import { AppState } from "./types";

const defaultState: AppState = {
    isCurrentTabFocused: true,
    loading: false
};

/**
 * Update application state depending on dispatched action
 * @param state Current state
 * @param action Dispatched action
 * @returns Updated state
 */
export default function (state: AppState = defaultState, action: ActionWithPayload): AppState {
    switch (action.type) {
        case SetTabIsFocused: {
            const isTabFocused: boolean =
                getPropertyValueWithCheck(action.payload, "isTabFocused");

            return {
                ...state,
                isCurrentTabFocused: isTabFocused
            };
        }
        case SetReadOnlyModeState: {
            const readOnlyMode: boolean =
                getPropertyValueWithCheck(action.payload, "readOnlyMode", false) || false;

            return {
                ...state,
                readOnlyMode: readOnlyMode
            };
        }
        case SetDarkModeState: {
            const isDarkMode: boolean =
                getPropertyValueWithCheck(action.payload, "isDarkMode", false) || false;

            return {
                ...state,
                isDarkMode: isDarkMode
            };
        }
        case SetIsAppLoadingState: {
            const isLoading: boolean =
                getPropertyValueWithCheck(action.payload, "loading", false) || false;

            return {
                ...state,
                loading: isLoading
            };
        }
        default: {
            return state;
        }
    }
}
