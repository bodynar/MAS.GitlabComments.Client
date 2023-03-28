import { ActionWithPayload } from "@app/redux";
import { HIDE_NOTIFICATION } from "@app/redux/notificator";

/**
 * Get redux action "Hide specified notification"
 * @param notificationId 
 * @returns State updating action
 */
export const getHideNotificationAction = (notificationId: string): ActionWithPayload => {
    return getHideNotificationsAction([notificationId]);
};

/**
 * Get redux action "Hide specified notifications"
 * @param notificationIds 
 * @returns State updating action
 */
export const getHideNotificationsAction = (notificationIds: Array<string>): ActionWithPayload => {
    return {
        type: HIDE_NOTIFICATION,
        payload: { notificationIds },
    };
};
