import React from 'react';

import { connect } from 'react-redux';

import './bell.scss';

import { isNull, isNullOrUndefined } from '@app/utils/common';

import { NotificationHistoryItem } from '@app/models/notification';

import { CompositeAppState } from '@app/redux/rootReducer';
import { setNotificationsBadgeToZero } from '@app/redux/notificator/actions';

import BellList from '../components/bellList/bellList';
import Icon from '@app/sharedComponents/icon';

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
    const badgeNumber: string = props.notificationBadge > 9 ? '9+' : `${props.notificationBadge}`;
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
                <Icon className="bell" />
                {shouldBadgeBeVisible &&
                    <span className="app-bell__badge">{badgeNumber}</span>
                }
            </div>
            <div className={listClassName} aria-hidden={!isListVisible}>
                <div className="app-bell__list-wrapper">
                    <BellList notifications={props.notifications} />
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
