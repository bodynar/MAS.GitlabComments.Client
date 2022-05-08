/** Set tab is focused */
export const SetTabIsFocused = "app/setTabIsFocused";

/** Set application readonly mode state */
export const SetReadOnlyModeState = "app/setReadOnlyMode";

/** Set dark mode state for app */
export const SetDarkModeState = "app/setDarkMode";

/** Set app loading state */
export const SetIsAppLoadingState = "app/setAppIsLoading";

/** Root application state */
export type AppState = {
    /** Is browser tab with app is in focus */
    isCurrentTabFocused: boolean;

    /** 
     * Is app currently loading something important.
     * If so - covers content with loading gif block
    */
    loading: boolean;

    /** Is app in read only mode */
    readOnlyMode?: boolean;

    /** Is dark mode active */
    isDarkMode?: boolean;
};
