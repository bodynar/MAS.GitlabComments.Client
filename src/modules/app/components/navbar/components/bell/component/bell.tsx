import { useCallback, useState } from 'react';

import { connect } from 'react-redux';

import Icon from '@bodynarf/react.components/components/icon';
import { useComponentOutsideClick } from '@bodynarf/react.components/hooks/useComponentOutsideClick';

import './bell.scss';
import './bell.dark.scss';

import { NotificationHistoryItem } from '@app/models/notification';

import { CompositeAppState } from '@app/redux/rootReducer';

import { setNotificationsBadgeToZero } from '@app/redux/notificator/actions/setNotificationsBadgeToZero';

import BellList from '../components/bellList/bellList';

type BellProps = {
    /** All notifications in current session */
    notifications: Array<NotificationHistoryItem>;

    /** Amount of unread notifications */
    notificationBadge: number;

    /** Handler of open notifications list action  */
    onListOpened: () => void;
};

/** Bell with notifications component */
function Bell({
    notificationBadge, notifications, onListOpened
}: BellProps): JSX.Element {
    const [isListVisible, setListVisibility] = useState<boolean>(false);

    const onBellClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            setListVisibility(!isListVisible);

            if (notificationBadge !== 0) {
                onListOpened();
            }

            event.stopPropagation();
        }, [isListVisible, notificationBadge, onListOpened]
    );

    useComponentOutsideClick(
        '.app-bell',
        isListVisible,
        () => setListVisibility(false),
    );

    const shouldBadgeBeVisible: boolean = notificationBadge > 0;
    const badgeNumber: string = notificationBadge > 9 ? '9+' : `${notificationBadge}`;
    const title: string = shouldBadgeBeVisible ? `${badgeNumber} new notifications` : 'No new notifications';
    const listClassName: string = !shouldBadgeBeVisible
        ? 'app-bell__list app-bell__list--empty'
        : 'app-bell__list';

    return (
        <div className="app-bell">
            <div
                className={`app-bell__icon${isListVisible ? " app-bell__icon--opened" : ""}`}
                onClick={onBellClick}
                title={title}
            >
                <Icon name="bell" />
                {shouldBadgeBeVisible &&
                    <span
                        className="app-bell__badge"
                        onClick={onBellClick}
                    >
                        {badgeNumber}
                    </span>
                }
            </div>
            <div className={listClassName} aria-hidden={!isListVisible}>
                <div className="app-bell__list-wrapper">
                    <BellList notifications={notifications} />
                </div>
            </div>
        </div>
    );
}

export default connect(
    ({ notificator }: CompositeAppState) => ({
        notifications: notificator.history,
        notificationBadge: notificator.historyBadgeCount
    }),
    { onListOpened: setNotificationsBadgeToZero }
)(Bell);
