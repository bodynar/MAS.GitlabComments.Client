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

/** Function that can display notification */
type ShowNotificationFn<TMessage> = (message: TMessage, removeLoadingState?: boolean, important?: boolean) => void;

/** Success notification show function type */
export type ShowSuccessFn = ShowNotificationFn<string>;

/** Error notification show function type */
export type ShowErrorFn = ShowNotificationFn<Error | string>;
