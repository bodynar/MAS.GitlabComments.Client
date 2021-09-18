/** Set tab is focused */
export const SetTabIsFocused = "app/setTabIsFocused";

/** Set application readonly mode state */
export const SetReadOnlyModeValue = "appGlobal/setReadOnlyMode";


/** Root application state */
export type AppState = {
    /** Is browser tab with app is in focus */
    isCurrentTabFocused: boolean;

    /** Is app in read only mode */
    readOnlyMode?: boolean;
};
