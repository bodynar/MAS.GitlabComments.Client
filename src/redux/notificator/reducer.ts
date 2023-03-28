import { getPropertyValueWithCheck } from "@bodynarf/utils";

import { NotificationItem } from "@app/models";

import { removeByKey } from "@app/utils";

import { ActionWithPayload } from "@app/redux";
import { NotificatorState, ADD_NOTIFICATION, HIDE_ALL_NOTIFICATIONS, HIDE_NOTIFICATION, SET_NOTIFICATIONS_BADGE_TO_ZERO } from "@app/redux/notificator";

/** Default state of notification module */
const defaultState: NotificatorState = {
    notifications: [],
    history: [],
    historyBadgeCount: 0,
};

/** Notification redux reducer function */
export default function (state: NotificatorState = defaultState, action: ActionWithPayload): NotificatorState {
    switch (action.type) {
        case ADD_NOTIFICATION: {
            const addingNotifications: Array<NotificationItem> = getPropertyValueWithCheck(action.payload, "notifications", false);

            if (addingNotifications.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            const displayDismissableNotification: boolean = getPropertyValueWithCheck(action.payload, "displayDismissableNotification", false) || false;

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
        case HIDE_NOTIFICATION: {
            const addingNotifications: Array<string> = getPropertyValueWithCheck(action.payload, "notificationIds", false);


            if (addingNotifications.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            return {
                ...state,
                notifications: removeByKey(state.notifications, x => x.id, addingNotifications),
            };
        }
        case HIDE_ALL_NOTIFICATIONS: {
            return {
                ...state,
                notifications: [],
            };
        }
        case SET_NOTIFICATIONS_BADGE_TO_ZERO: {
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
