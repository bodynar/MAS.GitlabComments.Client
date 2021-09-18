import { NotificationItem } from "@app/models/notification";

import { AddNotification, HideNotification, HideAllNotifications, NotificationAddAction, NotificationEditAction, NotificatorAction, SetNotificationsBadgeToZero } from "./types";

/** Show notification */
export const addNotification = (notification: NotificationItem, notifyOnBadge: boolean): NotificationAddAction => {
    return addNotifications([notification], notifyOnBadge);
};

/** Show pack of notifications */
export const addNotifications = (notifications: Array<NotificationItem>, notifyOnBadge: boolean): NotificationAddAction => {
    return {
        type: AddNotification,
        notifications: notifications,
        displayDismissableNotification: notifyOnBadge
    };
};

/** Hide notification */
export const hideNotification = (notificationId: string): NotificationEditAction => {
    return HideNotifications([notificationId]);
};

/** Hide pack of notifications */
export const HideNotifications = (notificationIds: Array<string>): NotificationEditAction => {
    return {
        type: HideNotification,
        notificationIds: notificationIds
    };
};

/** Hide all notifications */
export const hideAllNotifications = (): NotificationEditAction => ({
    type: HideAllNotifications,
    notificationIds: [],
});

/** Clear notification badge by setting to zero  */
export const setNotificationsBadgeToZero = (): NotificatorAction => ({
    type: SetNotificationsBadgeToZero,
});
