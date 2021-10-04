import React from 'react';

import { connect } from 'react-redux';

import { isUndefined } from '@app/utils/common';
import { appStorage } from '@app/utils/localStorage';

import { CompositeAppState } from '@app/redux/rootReducer';
import { setDarkModeState } from '@app/redux/app/action';

type ViewModeSwitcherProps = {
    /** Is dark mode currently active */
    isDarkMode?: boolean;

    /** Set new state for dark mode setting */
    setDarkModeState: (isDarkMode: boolean) => void;
};

/** App view mode switcher. From light mode to dark mode */
function ViewModeSwitcher({ isDarkMode, setDarkModeState }: ViewModeSwitcherProps): JSX.Element {
    React.useEffect(() => {
        const darkModeState = getDarkModeState(isDarkMode);

        setDarkModeState(darkModeState);
    }, [isDarkMode, setDarkModeState]);

    const onClick = React.useCallback(() => {
        setDarkModeState(!(isDarkMode as boolean));
    }, [isDarkMode, setDarkModeState]);

    return (
        <div className="app-mode-switcher" onClick={onClick}>
            gg-sun
            gg-moon
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
