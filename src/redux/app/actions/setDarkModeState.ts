import { ActionWithPayload } from "@app/redux/types";

import { SetDarkModeState } from "../types";

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
