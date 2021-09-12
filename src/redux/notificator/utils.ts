import { generateGuid } from "@app/utils/guid";

import { AddNotification, NotificatorAction } from "./types";

/**
 * Get notifications module action which adding success notification
 * @param message Notification message
 * @returns Notification module redux store action
 */
export const getSuccessNotificationAction = (message: string): NotificatorAction => ({
    type: AddNotification,
    notifications: [{ type: 'success', message, id: generateGuid(), createdAt: new Date() }]
});

/**
 * Get notifications module action which adding error notification
 * @param message Notification message
 * @returns Notification module redux store action
 */
export const getErrorNotificationAction = (message: string): NotificatorAction => ({
    type: AddNotification,
    notifications: [{ type: 'error', message, id: generateGuid(), createdAt: new Date() }]
});
