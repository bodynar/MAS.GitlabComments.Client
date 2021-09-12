import { NotificationItem } from '@app/models/notification';
import { NotificatorState, NotificatorAction, AddNotification, HideAllNotifications, HideNotification } from './types';

import { removeByKey } from '@app/utils/array';

/** Default state of notification module */
const defaultState: NotificatorState = {
    notifications: [],
    history: []
};

/** Notification redux reducer function */
export default function (state: NotificatorState = defaultState, action: NotificatorAction): NotificatorState {
    switch (action.type) {
        case AddNotification: {
            const addingNotifications: Array<NotificationItem> = action.notifications as Array<NotificationItem>;

            if (addingNotifications.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    ...addingNotifications
                ],
            };
        }
        case HideNotification: {
            const removingIds: Array<string> = action.notifications as Array<string>;

            if (removingIds.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            const hiddenNotifications: Array<NotificationItem> =
                state.notifications.filter(x => removingIds.includes(x.id));

            return {
                ...state,
                notifications: removeByKey(state.notifications, x => x.id, removingIds),
                history: [...state.history, ...hiddenNotifications]
            };
        }
        case HideAllNotifications: {
            return {
                ...state,
                notifications: [],
                history: state.notifications
            };
        }
        default: {
            return state;
        }
    }
}
