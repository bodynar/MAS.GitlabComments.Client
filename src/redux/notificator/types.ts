import { Action } from "@app/redux/types";

import { NotificationHistoryItem, NotificationItem } from "@app/models/notification";

/** Add notification to store */
export const AddNotification = "notification/add";

/** Hide specified notifications */
export const HideNotification = "notification/hide";

/** Clear all active notifications */
export const HideAllNotifications = "notification/hideAll";

/** State of notification module */
export type NotificatorState = {
    /** Active notifications */
    notifications: Array<NotificationItem>;

    /** Stack of all notifications */
    history: Array<NotificationHistoryItem>;

    /** Number on history badge */
    historyBadgeCount: number;
};

/** Notification store add action */
export type NotificationAddAction = Action & {
    /** Payload notifications */
    notifications: Array<NotificationItem>;

    /** Should notification be rendered as dismisasable block */
    displayDismissableNotification: boolean;
};

export type NotificationEditAction = Action & {
    /** Notification identifiers */
    notificationIds: Array<string>;
};

/** Notification store action */
export type NotificatorAction = NotificationAddAction | NotificationEditAction;
