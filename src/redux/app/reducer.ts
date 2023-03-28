import { getPropertyValueWithCheck } from "@bodynarf/utils";

import { ActionWithPayload } from "@app/redux";
import { AppState, SET_DARK_MODE_STATE, SET_IS_APP_IN_LOADING_STATE, SET_READONLY_MODE_STATE, SET_TAB_IS_FOCUSED } from "@app/redux/app";


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
        case SET_TAB_IS_FOCUSED: {
            const isTabFocused: boolean =
                getPropertyValueWithCheck(action.payload, "isTabFocused");

            return {
                ...state,
                isCurrentTabFocused: isTabFocused
            };
        }
        case SET_READONLY_MODE_STATE: {
            const readOnlyMode: boolean =
                getPropertyValueWithCheck(action.payload, "readOnlyMode", false) || false;

            return {
                ...state,
                readOnlyMode: readOnlyMode
            };
        }
        case SET_DARK_MODE_STATE: {
            const isDarkMode: boolean =
                getPropertyValueWithCheck(action.payload, "isDarkMode", false) || false;

            return {
                ...state,
                isDarkMode: isDarkMode
            };
        }
        case SET_IS_APP_IN_LOADING_STATE: {
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
