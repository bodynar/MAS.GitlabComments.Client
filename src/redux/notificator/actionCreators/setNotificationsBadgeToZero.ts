import { Action } from "@app/redux";
import { SET_NOTIFICATIONS_BADGE_TO_ZERO } from "@app/redux/notificator";

/**
 * Get redux action "Set notifications badge to 0"
 * @returns State updating action
 */
export const setNotificationsBadgeToZero = (): Action => ({
    type: SET_NOTIFICATIONS_BADGE_TO_ZERO,
});
