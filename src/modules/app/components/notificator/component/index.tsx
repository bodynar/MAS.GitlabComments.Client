import { useCallback } from "react";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { isStringEmpty } from "@bodynarf/utils";

import "./style.scss";
import "./style.dark.scss";

import { NOTIFICATION_COUNT_TO_SHOW_HIDE_ALL_BUTTON } from "@app/constants";
import { NotificationDisplayItem } from "@app/models/notification";

import { CompositeAppState } from "@app/redux";
import { hideAllNotifications, hideNotification } from "@app/redux/notificator";

import Notification from "../components/notificationItem";

interface NotificatorProps {
    /** Active notifications */
    notifications: Array<NotificationDisplayItem>;

    /** Hide notification handler */
    hideNotifications: (notificationIds: Array<string>) => void;

    /** Hide all active notifications */
    hideAll: () => void;
}

/** Container component for notifications */
function Notificator({
    notifications,
    hideNotifications, hideAll
}: NotificatorProps): JSX.Element {
    const hideNotification = useCallback(
        (notificationId: string): void => {
            if (!isStringEmpty(notificationId)) {
                hideNotifications([notificationId]);
            }
        }, [hideNotifications]);

    const hideAllNotifications = useCallback(() => hideAll(), [hideAll]);

    return (
        <TransitionGroup className="app-notificator">
            {notifications.length > NOTIFICATION_COUNT_TO_SHOW_HIDE_ALL_BUTTON &&
                <CSSTransition
                    key="app-notificator__cleaner"
                    timeout={250}
                    classNames="app-notificator__cleaner"
                >
                    <span
                        className="app-notificator__cleaner"
                        onClick={hideAllNotifications}
                        title="Dismiss all notifications"
                    >
                        Dismiss all
                    </span>
                </CSSTransition>
            }
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
    {
        hideNotifications: hideNotification,
        hideAll: hideAllNotifications
    }
)(Notificator);
