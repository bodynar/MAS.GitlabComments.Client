import { NotificationItem } from "@app/models/notification";

import { AddNotification, NotificatorAction, HideNotification, HideAllNotifications } from "./types";

/** Show notification */
export const addNotification = (notification: NotificationItem): NotificatorAction => {
    return addNotifications([notification]);
};

/** Show pack of notifications */
export const addNotifications = (notifications: Array<NotificationItem>): NotificatorAction => {
    return {
        type: AddNotification,
        notifications: notifications
    };
};

/** Hide notification */
export const hideNotification = (notificationId: string): NotificatorAction => {
    return HideNotifications([notificationId]);
};

/** Hide pack of notifications */
export const HideNotifications = (notificationIds: Array<string>): NotificatorAction => {
    return {
        type: HideNotification,
        notifications: notificationIds
    };
};

/** Hide all notifications */
export const hideAllNotifications = (): NotificatorAction => ({
    type: HideAllNotifications,
    notifications: [],
});
