import React from 'react';

import { connect } from 'react-redux';

import './bell.scss';

import { isNull, isNullOrUndefined } from '@app/utils/common';

import { NotificationHistoryItem } from '@app/models/notification';

import { CompositeAppState } from '@app/redux/rootReducer';
import { setNotificationsBadgeToZero } from '@app/redux/notificator/actions';

import NotificationStoryRecord from '../components/notificationStoryRecord';

type BellProps = {
    /** All notifications in current session */
    notifications: Array<NotificationHistoryItem>;

    /** Amount of unread notifications */
    notificationBadge: number;

    /** Handler of open notifications list action  */
    onListOpened: () => void;
};

/** Bell with notifications component */
function Bell(props: BellProps): JSX.Element {
    const [isListVisible, setListVisibility] = React.useState<boolean>(false);

    const onBellClick = React.useCallback(
        () => {
            setListVisibility(!isListVisible);

            if (props.notificationBadge !== 0) {
                props.onListOpened();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isListVisible, props.notificationBadge, props.onListOpened]
    );

    const onDocumentClick = React.useCallback(
        (event: MouseEvent): void => {
            if (isListVisible) {
                const target: HTMLElement = event.target as HTMLElement;

                if (isNullOrUndefined(target)) {
                    return;
                }

                const rootBellComponent: Element | null =
                    target.closest('.app-bell');

                if (isNull(rootBellComponent)) {
                    setListVisibility(false);
                }
            }
        }, [isListVisible]);

    React.useEffect(() => {
        document.addEventListener('click', onDocumentClick);

        return (): void => document.removeEventListener('click', onDocumentClick);
    }, [onDocumentClick]);

    const shouldBadgeBeVisible: boolean = props.notificationBadge > 0;
    const badgeNumber: string = props.notificationBadge > 10 ? '9+' : `${props.notificationBadge}`;
    const title: string = shouldBadgeBeVisible ? `${badgeNumber} new notifications` : 'No new notifications';

    return (
        <div className="app-bell">
            <div
                className={`app-bell__icon${isListVisible ? " app-bell__icon--opened" : ""}`}
                onClick={onBellClick}
                title={title}
            >
                <span className="icon">
                    <i className="gg-bell"></i>
                </span>
                {shouldBadgeBeVisible &&
                    <span className="app-bell__badge">{badgeNumber}</span>
                }
            </div>
            <div className="app-bell__list" aria-hidden={!isListVisible}>
                <BellList notifications={props.notifications} />
            </div>
        </div>
    );
}

/** Bell notification list component */
function BellList({ notifications }: { notifications: Array<NotificationHistoryItem>; }): JSX.Element {
    if (notifications.length > 0) {
        return (
            <ul>
                {notifications.map(x =>
                    <NotificationStoryRecord
                        key={x.id}
                        item={x}
                    />
                )}
            </ul>
        );
    }

    return (
        <span className="app-bell__empty-list">
            You haven&apos;t received any notifications yet
        </span>
    );
}

export default connect(
    ({ notificator }: CompositeAppState) => ({
        notifications: notificator.history,
        notificationBadge: notificator.historyBadgeCount
    }),
    { onListOpened: setNotificationsBadgeToZero }
)(Bell);
