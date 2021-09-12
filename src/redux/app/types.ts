/** Set tab is focused */
export const SetTabIsFocused = "app/setTabIsFocused";

/** Root application state */
export type AppState = {
    /** Is browser tab with app is in focus */
    isCurrentTabFocused: boolean;
};
