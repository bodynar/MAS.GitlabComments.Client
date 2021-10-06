/** Set tab is focused */
export const SetTabIsFocused = "app/setTabIsFocused";

/** Set application readonly mode state */
export const SetReadOnlyModeState = "app/setReadOnlyMode";

/** Set dark mode state for app */
export const SetDarkModeState = "app/setDarkMode";

/** Root application state */
export type AppState = {
    /** Is browser tab with app is in focus */
    isCurrentTabFocused: boolean;

    /** Is app in read only mode */
    readOnlyMode?: boolean;

    /** Is dark mode active */
    isDarkMode?: boolean;
};
