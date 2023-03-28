import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { connect } from "react-redux";

import { isUndefined, localStorage } from "@bodynarf/utils";
import Icon from "@bodynarf/react.components/components/icon";

import "./style.scss";

import { CompositeAppState } from "@app/redux";
import { getSetDarkModeStateAction } from "@app/redux/app";

interface ViewModeSwitcherProps {
    /** Is dark mode currently active */
    isDarkMode?: boolean;

    /** Set new state for dark mode setting */
    setDarkModeState: (isDarkMode: boolean) => void;
}

/** App view mode switcher. From light mode to dark mode */
function ViewModeSwitcher({
    isDarkMode,
    setDarkModeState,
}: ViewModeSwitcherProps): JSX.Element {
    const onDarkModeStateChange = useCallback(
        (enabled: boolean, suppressSave: boolean) => {
            setDarkModeState(enabled);
            setDarkModeEnabled(enabled);

            if (!suppressSave) {
                localStorage.saveRecord<boolean>("darkmode-state", enabled);
            }
        }, [setDarkModeState]
    );

    useEffect(() => {
        const darkModeState = getDarkModeState(isDarkMode);

        onDarkModeStateChange(darkModeState, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDarkModeStateChange]);

    const onCheckedChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            onDarkModeStateChange(event.target.checked, false);
        }, [onDarkModeStateChange]);

    const [darkModeEnabled, setDarkModeEnabled] = useState(isDarkMode === true);

    const sunClassName: string = darkModeEnabled ? "sun" : "sun-fill";
    const moonClassName: string = !darkModeEnabled ? "moon" : "moon-stars-fill";

    return (
        <div className="app-mode-switcher">
            <Icon name={sunClassName} />
            <label className="app-mode-switcher__switch">
                <input
                    type="checkbox"
                    onChange={onCheckedChange}
                    checked={darkModeEnabled}
                />
                <span className="app-mode-switcher__slider"></span>
            </label>
            <Icon name={moonClassName} />
        </div>
    );
}

export default connect(
    ({ app }: CompositeAppState) => ({ isDarkMode: app.isDarkMode }),
    { setDarkModeState: getSetDarkModeStateAction }
)(ViewModeSwitcher);

/**
 * Get dark mode state from prop or local storage
 * @param isDarkMode Current state of dark mode
 * @returns Flag representing dark mode state
 */
const getDarkModeState = (isDarkMode?: boolean): boolean => {
    if (isUndefined(isDarkMode)) {
        const hasAlreadyStored: boolean =
            localStorage.hasRecord("darkmode-state");

        if (hasAlreadyStored) {
            const darkModeState: boolean | undefined =
                localStorage.getRecord<boolean>("darkmode-state");

            return !isUndefined(darkModeState) && (darkModeState as boolean);
        } else {
            return false;
        }
    }

    return isDarkMode as boolean;
};
