import { generateGuid } from '@app/utils/guid';

import { NotificationItem } from '@app/models/notification';
import { NotificatorState, NotificatorAction, AddNotification, HideAllNotifications, HideNotification } from './types';

import { removeByKey } from '@app/utils/array';

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
        case HideNotification: {
            const removingIds: Array<string> = action.notifications as Array<string>;

            if (removingIds.length === 0) {
                // TOOD: v2 log warning
                return state;
            }

            return {
                notifications: removeByKey(state.notifications, x => x.id, removingIds),
            };
        }
        case HideAllNotifications: {
        }
        default: {
            return state;
        }
    }
}
