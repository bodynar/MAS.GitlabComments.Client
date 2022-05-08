import { ActionWithPayload } from "@app/redux/types";

import { SetTabIsFocused } from "../types";

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

