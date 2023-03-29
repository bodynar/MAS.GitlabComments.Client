import { NotificationHistoryItem, NotificationItem } from "@app/models";

/** State of notification module */
export type NotificatorState = {
    /** Active notifications */
    notifications: Array<NotificationItem>;

    /** Stack of all notifications */
    history: Array<NotificationHistoryItem>;

    /** Number on history badge */
    historyBadgeCount: number;
};
