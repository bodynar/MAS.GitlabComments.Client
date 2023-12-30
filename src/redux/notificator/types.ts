import { NotificationDisplayItem, NotificationHistoryItem } from "@app/models/notification";

/** State of notification module */
export interface NotificatorState {
    /** Active notifications */
    notifications: Array<NotificationDisplayItem>;

    /** Stack of all notifications */
    history: Array<NotificationHistoryItem>;

    /** Number on history badge */
    historyBadgeCount: number;
}

/**
 * Function that can display notification
 * @param message Message to display
 * @param important Should message stay on screen until manual user close action
 * @param removeLoadingState Should app loading state be removed
 */
type ShowNotificationFn<TMessage> = (message: TMessage, important?: boolean, removeLoadingState?: boolean) => void;

/** Success notification show function type */
export type ShowSimpleMessageFn = ShowNotificationFn<string>;

/** Error notification show function type */
export type ShowErrorFn = ShowNotificationFn<Error | string>;
