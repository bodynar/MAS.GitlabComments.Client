import { generateGuid } from "@bodynarf/utils";

import { NotificationType } from "@app/models";

import { getAddNotificationAction } from "./actions/addNotification";
import { ActionWithPayload } from "@app/redux";

/**
 * Get notifications module action which adding success notification
 * @param message Notification message
 * @param shouldDisplay Should display dismissable block
 * @returns Notification module redux store action
 */
export const getSuccessNotificationAction = (
    message: string,
    shouldDisplay: boolean
): ActionWithPayload => getAddNotificationAction({ type: NotificationType.success, message, id: generateGuid(), createdAt: new Date() }, shouldDisplay);

/**
 * Get notifications module action which adding error notification
 * @param message Notification message
 * @param shouldDisplay Should display dismissable block
 * @returns Notification module redux store action
 */
export const getErrorNotificationAction = (
    message: string,
    shouldDisplay: boolean
): ActionWithPayload => getAddNotificationAction({ type: NotificationType.error, message, id: generateGuid(), createdAt: new Date() }, shouldDisplay);
