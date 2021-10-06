import React, { useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { connect } from 'react-redux';

import './notificator.scss';

import { isStringEmpty } from '@app/utils/common';

import { NotificationItem } from '@app/models/notification';

import { CompositeAppState } from '@app/redux/rootReducer';
import { HideNotifications } from '@app/redux/notificator/actions';

import Notification from '../components/notificationItem';

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

/** Container component for notifications */
export default connect(
    ({ notificator }: CompositeAppState) => ({ ...notificator }),
    { hideNotifications: HideNotifications }
)(Notificator);
