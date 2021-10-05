import React from 'react';

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
    React.useEffect(() => {
        const darkModeState = getDarkModeState(isDarkMode);

        setDarkModeState(darkModeState);
    }, [isDarkMode, setDarkModeState]);

    const onClick = React.useCallback((event: React.MouseEvent) => {
        event.preventDefault();

        setDarkModeState(!(isDarkMode as boolean));
    }, [isDarkMode, setDarkModeState]);

    const sunClassName: string = isDarkMode === true ? 'sun' : 'sun-fill';
    const moonClassName: string = isDarkMode !== true ? 'moon' : 'moon-stars-fill';
// TODO: update style, fix click handler
// TODO: add handler on click icons => change state
    return (
        <div className="app-mode-switcher">
            <Icon className={sunClassName} />
            <label className="app-mode-switcher__switch">
                <input type="checkbox" onChange={e => setDarkModeState(e.target.checked)} />
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
