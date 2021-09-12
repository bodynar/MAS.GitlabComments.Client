import { getPropertyValueWithCheck } from "@app/utils/object";

import { ActionWithPayload } from "../types";

import { AppState, SetTabIsFocused } from "./types";

const defaultState: AppState = {
    isCurrentTabFocused: false
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
                getPropertyValueWithCheck(action.payload, 'isTabFocused');

            return {
                ...state,
                isCurrentTabFocused: isTabFocused
            };
        }
        default: {
            return state;
        }
    }
}
