import { getPropertyValueWithCheck } from "@app/utils/object";

import { ActionWithPayload } from "../types";

import { AppState, SetTabIsFocused, SetReadOnlyModeValue } from "./types";

const defaultState: AppState = {
    isCurrentTabFocused: true,
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
        case SetReadOnlyModeValue: {
            const readOnlyMode: boolean =
                getPropertyValueWithCheck(action.payload, 'readOnlyMode', false) || false;

            return {
                ...state,
                readOnlyMode: readOnlyMode
            };
        }
        default: {
            return state;
        }
    }
}
