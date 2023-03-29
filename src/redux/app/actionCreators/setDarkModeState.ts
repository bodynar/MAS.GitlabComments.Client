import { ActionWithPayload } from "@app/redux";

import { SET_DARK_MODE_STATE } from "../actions";

/**
 * Get redux action "Set dark mode state"
 * @param isDarkMode 
 * @returns Redux action to update state
 */
export const getSetDarkModeStateAction = (isDarkMode: boolean): ActionWithPayload => ({
    type: SET_DARK_MODE_STATE,
    payload: {
        isDarkMode
    }
});
