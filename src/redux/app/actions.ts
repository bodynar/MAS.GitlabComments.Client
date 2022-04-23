import { ActionWithPayload } from "../types";

import { SetTabIsFocused, SetDarkModeState } from "./types";

/**
 * Get redux action "Set tab is focused"
 * @param isTabFocused Is tab currently in focus
 * @returns Redux action to update state
 */
export const setTabIsFocused = (isTabFocused: boolean): ActionWithPayload => ({
    type: SetTabIsFocused,
    payload: {
        isTabFocused
    }
});

/**
 * Get redux action "Set dark mode state"
 * @param isDarkMode 
 * @returns Redux action to update state
 */
export const setDarkModeState = (isDarkMode: boolean): ActionWithPayload => ({
    type: SetDarkModeState,
    payload: {
        isDarkMode
    }
});
