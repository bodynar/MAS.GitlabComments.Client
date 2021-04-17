import { Action } from "redux/types";

import { NotificationItem } from "models/notification";

/** Add notification to store */
export const AddNotification = "notification/add";

/** Remove specified notifications */
export const RemoveNotification = "notification/remove";

/** Clear all active notifications */
export const RemoveAllNotifications = "notification/removeAll";

/** State of notification module */
export type NotificatorState = {
    /** Stored notification */
    notifications: Array<NotificationItem>;
};


/** Notification store action */
export type NotificatorAction = Action & {
    /** Payload notifications or their identifiers */
    notifications: Array<NotificationItem> | Array<string>;
};
