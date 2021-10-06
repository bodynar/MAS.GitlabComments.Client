import React, { useCallback, useEffect, useState } from 'react';

import { connect } from 'react-redux';

import './viewModeSwitcher.scss';

import { isUndefined } from '@app/utils/common';
import { appStorage } from '@app/utils/localStorage';

import { CompositeAppState } from '@app/redux/rootReducer';
import { setDarkModeState } from '@app/redux/app/action';

import Icon from '@app/sharedComponents/icon';

type ViewModeSwitcherProps = {
    /** Is dark mode currently active */
    isDarkMode?: boolean;

    /** Set new state for dark mode setting */
    setDarkModeState: (isDarkMode: boolean) => void;
};

/** App view mode switcher. From light mode to dark mode */
function ViewModeSwitcher({ isDarkMode, setDarkModeState }: ViewModeSwitcherProps): JSX.Element {
    const onDarkModeStateChange = useCallback(
        (enabled: boolean, suppressSave: boolean) => {
            setDarkModeState(enabled);
            setDarkModeEnabled(enabled);

            if (!suppressSave) {
                appStorage.saveRecord<boolean>('darkmode-state', enabled);
            }
        }, [setDarkModeState]
    );

    useEffect(() => {
        const darkModeState = getDarkModeState(isDarkMode);

        onDarkModeStateChange(darkModeState, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDarkModeStateChange]);

    const onCheckedChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            onDarkModeStateChange(event.target.checked, false);
        }, [onDarkModeStateChange]);

    const [darkModeEnabled, setDarkModeEnabled] = useState(isDarkMode === true);

    const sunClassName: string = darkModeEnabled ? 'sun' : 'sun-fill';
    const moonClassName: string = !darkModeEnabled ? 'moon' : 'moon-stars-fill';

    return (
        <div className="app-mode-switcher">
            <Icon className={sunClassName} />
            <label className="app-mode-switcher__switch">
                <input
                    type="checkbox"
                    onChange={onCheckedChange}
                    checked={darkModeEnabled}
                />
                <span className="app-mode-switcher__slider"></span>
            </label>
            <Icon className={moonClassName} />
        </div>
    );
}

/**
 * Get dark mode state from prop or local storage
 * @param isDarkMode Current state of dark mode
 * @returns Flag representing dark mode state
 */
const getDarkModeState = (isDarkMode?: boolean): boolean => {
    if (isUndefined(isDarkMode)) {
        const hasAlreadyStored: boolean =
            appStorage.hasRecord('darkmode-state');

        if (hasAlreadyStored) {
            const darkModeState: boolean | undefined =
                appStorage.getRecord<boolean>('darkmode-state');

            return !isUndefined(darkModeState) && (darkModeState as boolean);
        } else {
            return false;
        }
    }

    return isDarkMode as boolean;
};

export default connect(
    ({ app }: CompositeAppState) => ({ isDarkMode: app.isDarkMode }),
    { setDarkModeState: setDarkModeState }
)(ViewModeSwitcher);
