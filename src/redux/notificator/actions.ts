import { NotificationItem } from "@app/models/notification";

import { AddNotification, NotificatorAction, RemoveNotification, RemoveAllNotifications } from "./types";

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
export const removeNotification = (notificationId: string): NotificatorAction => {
    return removeNotifications([notificationId]);
};

/** Hide pack of notifications */
export const removeNotifications = (notificationIds: Array<string>): NotificatorAction => {
    return {
        type: RemoveNotification,
        notifications: notificationIds
    };
};

/** Hide all notifications */
export const removeAllNotifications = (): NotificatorAction => ({
    type: RemoveAllNotifications,
    notifications: [],
});
