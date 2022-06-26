import { ActionWithPayload } from "@app/redux/types";

import { SetDarkModeState } from "../actions";

/**
 * Get redux action "Set dark mode state"
 * @param isDarkMode 
 * @returns Redux action to update state
 */
export const getSetDarkModeStateAction = (isDarkMode: boolean): ActionWithPayload => ({
    type: SetDarkModeState,
    payload: {
        isDarkMode
    }
});
