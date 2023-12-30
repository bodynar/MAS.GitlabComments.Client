import { isUndefined, localStorage } from "@bodynarf/utils";

/**
 * Get dark mode state from local storage
 * @returns Current dark mode state as boolean value
 */
export const getDarkModeState = (): boolean => {
    const hasAlreadyStored: boolean =
        localStorage.hasRecord("darkmode-state");

    if (!hasAlreadyStored) {
        return false;
    }

    const darkModeState: boolean | undefined =
        localStorage.getRecord<boolean>("darkmode-state");

    return !isUndefined(darkModeState) && (darkModeState as boolean);
};
