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
