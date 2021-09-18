import React, { useCallback, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { connect } from 'react-redux';

import './notificator.scss';

import { isStringEmpty } from '@app/utils/common';
import { NotificationHideDelay } from 'src/shared/constants';

import { NotificationItem, NotificationType } from '@app/models/notification';

import { CompositeAppState } from '@app/redux/rootReducer';
import { HideNotifications } from '@app/redux/notificator/actions';

type NotificatorProps = {
    /** Active notifications */
    notifications: Array<NotificationItem>;

    /** Hide notification handler */
    hideNotifications: (notificationIds: Array<string>) => void;
};

/** Container component for notifications */
function Notificator({ notifications, hideNotifications }: NotificatorProps): JSX.Element {
    const hideNotification = useCallback(
        (notificationId: string): void => {
            if (!isStringEmpty(notificationId)) {
                hideNotifications([notificationId]);
            }
        }, [hideNotifications]);

    return (
        <TransitionGroup className="app-notificator">
            {notifications.map(x =>
                <CSSTransition
                    key={x.id}
                    timeout={250}
                    classNames="app-notificator__item"
                >
                    <Notification
                        key={x.id}
                        item={x}
                        onHideClick={hideNotification}
                    />
                </CSSTransition>
            )}
        </TransitionGroup>
    );
}

/** Map of notification type to bulma class name */
const typeClassNameMap: Map<NotificationType, string> = new Map([
    ['info', 'is-info'],
    ['success', 'is-success'],
    ['warn', 'is-warning'],
    ['error', 'is-danger'],
]);

/** Single notification component configuration */
type NotificationProps = {
    /** Notification configuration */
    item: NotificationItem;

    /** Close notification click handler */
    onHideClick: (notificationId: string) => void;
};

/** Single notification component */
const Notification = ({ item, onHideClick }: NotificationProps): JSX.Element => {
    const hide = useCallback(() => {
        onHideClick(item.id);
    }, [item.id, onHideClick]);

    useEffect(() => {
        const timer: NodeJS.Timeout = setTimeout(hide, NotificationHideDelay);

        return (): void => { clearTimeout(timer); };
    }, [hide]);

    return (
        <div className={`notification app-notification ${typeClassNameMap.get(item.type)}`}>
            <button
                className="delete"
                onClick={hide}
            ></button>
            {item.message}
        </div>
    );
};

/** Container component for notifications */
export default connect(
    ({ notificator }: CompositeAppState) => ({ ...notificator }),
    { hideNotifications: HideNotifications }
)(Notificator);
