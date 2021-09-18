import { generateGuid } from "@app/utils/guid";

import { AddNotification, NotificationAddAction } from "./types";

/**
 * Get notifications module action which adding success notification
 * @param message Notification message
 * @param shouldDisplay Should display dismissable block
 * @returns Notification module redux store action
 */
export const getSuccessNotificationAction = (
    message: string,
    shouldDisplay: boolean
): NotificationAddAction => ({
    type: AddNotification,
    notifications: [{ type: 'success', message, id: generateGuid(), createdAt: new Date() }],
    displayDismissableNotification: shouldDisplay
});

/**
 * Get notifications module action which adding error notification
 * @param message Notification message
 * @param shouldDisplay Should display dismissable block
 * @returns Notification module redux store action
 */
export const getErrorNotificationAction = (
    message: string,
    shouldDisplay: boolean
): NotificationAddAction => ({
    type: AddNotification,
    notifications: [{ type: 'error', message, id: generateGuid(), createdAt: new Date() }],
    displayDismissableNotification: shouldDisplay
});
