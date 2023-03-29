import { Action } from "@app/redux";
import { HIDE_ALL_NOTIFICATIONS } from "@app/redux/notificator";

/**
 * Get redux action "Hide all notifications"
 * @returns State updating action
 */
export const getHideAllNotificationsAction = (): Action => ({
    type: HIDE_ALL_NOTIFICATIONS
});
