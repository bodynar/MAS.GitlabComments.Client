import { getPropertyValueWithCheck } from '@bodynarf/utils/object';

import { NotificationItem } from '@app/models/notification';
import { NotificatorState } from './types';

import { removeByKey } from '@app/utils/array';

import { ActionWithPayload } from '@app/redux/types';

import { AddNotification, HideAllNotifications, HideNotification, SetNotificationsBadgeToZero } from './actions';

/** Default state of notification module */
const defaultState: NotificatorState = {
    notifications: [],
    history: [],
    historyBadgeCount: 0,
};

/** Notification redux reducer function */
export default function (state: NotificatorState = defaultState, action: ActionWithPayload): NotificatorState {
    switch (action.type) {
        case AddNotification: {
            const addingNotifications: Array<NotificationItem> = getPropertyValueWithCheck(action.payload, 'notifications', false);

            if (addingNotifications.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            const displayDismissableNotification: boolean = getPropertyValueWithCheck(action.payload, 'displayDismissableNotification', false) || false;

            const notifications: Array<NotificationItem> = displayDismissableNotification
                ? [...addingNotifications, ...state.notifications]
                : state.notifications;

            const historyBadgeCount: number = displayDismissableNotification
                ? state.historyBadgeCount
                : state.historyBadgeCount + 1;

            return {
                ...state,
                history: [
                    ...addingNotifications,
                    ...state.history,
                ],
                notifications: notifications,
                historyBadgeCount: historyBadgeCount,
            };
        }
        case HideNotification: {
            const addingNotifications: Array<string> = getPropertyValueWithCheck(action.payload, 'notificationIds', false);


            if (addingNotifications.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            return {
                ...state,
                notifications: removeByKey(state.notifications, x => x.id, addingNotifications),
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
