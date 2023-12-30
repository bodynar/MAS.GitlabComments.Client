import { generateGuid } from "@bodynarf/utils";

import { NotificationDisplayItem, NotificationType } from "@app/models/notification";

/**
 * Build a success notification
 * @param message Notification message
 * @param important Is notification important? (check same property in `NotificationDisplayItem` model)
 * @returns Notification to display
 */
export const getSuccessNotification = (
    message: string,
    important: boolean = false,
): NotificationDisplayItem =>
    buildNotification(message, important, NotificationType.success);

/**
 * Build a warning notification
 * @param message Notification message
 * @param important Is notification important? (check same property in `NotificationDisplayItem` model)
 * @returns Notification to display
 */
export const getWarningNotification = (
    message: string,
    important: boolean = false,
): NotificationDisplayItem =>
    buildNotification(message, important, NotificationType.warn);

/**
 * Get notifications module action which adding error notification
 * @param message Notification message
 * @param important Is notification important? (check same property in `NotificationDisplayItem` model)
 * @returns Notification to display
 */
export const getErrorNotification = (
    message: string,
    important: boolean = false,
): NotificationDisplayItem =>
    buildNotification(message, important, NotificationType.error);

/**
 * Build notification via constant values & variables from arguments
 * @param message Message content
 * @param important Is notification important? (check same property in `NotificationDisplayItem` model)
 * @param type Notification type
 * @returns Notification
 */
const buildNotification = (
    message: string,
    important: boolean,
    type: NotificationType
): NotificationDisplayItem => ({
    message,
    important,
    id: generateGuid(),
    createdAt: new Date(),
    type,
});
