import { NotificationItem } from '@app/models/notification';
import { NotificatorState, NotificatorAction, AddNotification, HideAllNotifications, HideNotification, NotificationAddAction, NotificationEditAction, SetNotificationsBadgeToZero } from './types';

import { removeByKey } from '@app/utils/array';
import { isNullOrUndefined } from '@app/utils/common';

/** Default state of notification module */
const defaultState: NotificatorState = {
    notifications: [],
    history: [],
    historyBadgeCount: 0,
};

/** Notification redux reducer function */
export default function (state: NotificatorState = defaultState, action: NotificatorAction): NotificatorState {
    switch (action.type) {
        case AddNotification: {
            const addAction: NotificationAddAction = action as NotificationAddAction;
            if (isNullOrUndefined(addAction)) {
                // TODO: v2 log error
                return state;
            }

            const addingNotifications: Array<NotificationItem> = addAction.notifications as Array<NotificationItem>;

            if (addingNotifications.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            const notifications: Array<NotificationItem> = addAction.displayDismissableNotification
                ? [...state.notifications, ...addAction.notifications]
                : state.notifications;

            const historyBadgeCount: number = addAction.displayDismissableNotification
                ? state.historyBadgeCount
                : state.historyBadgeCount + 1;

            return {
                ...state,
                history: [
                    ...state.history,
                    ...addAction.notifications
                ],
                notifications: notifications,
                historyBadgeCount: historyBadgeCount,
            };
        }
        case HideNotification: {
            const editAction: NotificationEditAction = action as NotificationEditAction;
            if (isNullOrUndefined(editAction)) {
                // TODO: v2 log error
                return state;
            }

            if (editAction.notificationIds.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            return {
                ...state,
                notifications: removeByKey(state.notifications, x => x.id, editAction.notificationIds),
            };
        }
        case HideAllNotifications: {
            return {
                ...state,
                notifications: [],
            };
        }
        case SetNotificationsBadgeToZero: {
            return {
                ...state,
                historyBadgeCount: 0,
            };
        }
        default: {
            return state;
        }
    }
}
