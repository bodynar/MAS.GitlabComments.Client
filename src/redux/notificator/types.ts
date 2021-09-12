import { Action } from "@app/redux/types";

import { NotificationItem } from "@app/models/notification";

/** Add notification to store */
export const AddNotification = "notification/add";

/** Hide specified notifications */
export const HideNotification = "notification/hide";

/** Clear all active notifications */
export const HideAllNotifications = "notification/hideAll";

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
