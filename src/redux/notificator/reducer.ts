import { generateGuid } from 'utils/guid';

import { NotificationItem } from 'models/notification';
import { NotificatorState, NotificatorAction, AddNotification, RemoveAllNotifications, RemoveNotification } from './types';

/** Default state of notification module */
const defaultState: NotificatorState = {
    notifications: []
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
                notifications: [
                    ...state.notifications,
                    ...addingNotifications.map(x => ({ ...x, id: generateGuid() })) // menual id will be owerriten
                ]
            };
        }
        case RemoveNotification: {
            const removingIds: Array<string> = action.notifications as Array<string>;

            if (removingIds.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            return {
                notifications: state.notifications.filter(x => !removingIds.includes(x.id as string))
            };
        }
        case RemoveAllNotifications: {
            return defaultState;
        }
        default: {
            return state;
        }
    }
}
