import { createAction } from "@reduxjs/toolkit";

import { NotificationDisplayItem } from "@app/models/notification";

/** Add notification to store */
export const addNotification = createAction<Array<NotificationDisplayItem>>("mas.gc/notification/add");

/** Hide specified notifications */
export const hideNotification = createAction<Array<string>>("mas.gc/notification/hide");

/** Clear all active notifications */
export const hideAllNotifications = createAction("mas.gc/notification/hideAll");

/** Clear notification badge by setting to zero */
export const setNotificationsBadgeToZero = createAction("mas.gc/notification/setBadgeToZero");
