import { createReducer } from "@reduxjs/toolkit";

import { removeByKey } from "@app/utils";

import { NotificatorState, addNotification, hideAllNotifications, hideNotification, setNotificationsBadgeToZero } from "@app/redux/notificator";

/** Default state of notification module */
const defaultState: NotificatorState = {
    notifications: [],
    history: [],
    historyBadgeCount: 0,
};

/** Notification module reducer */
export const reducer = createReducer(defaultState,
    (builder) => {
        builder
            .addCase(setNotificationsBadgeToZero, (state) => {
                state.historyBadgeCount = 0;
            })
            .addCase(hideAllNotifications, (state) => {
                state.notifications = [];
            })
            .addCase(hideNotification, (state, { payload }) => {
                if (payload.length === 0) {
                    return;
                }

                state.notifications = removeByKey(state.notifications, x => x.id, payload);
            })
            .addCase(addNotification, (state, { payload }) => {
                const addingNotifications = payload.filter(({ id }) => !state.notifications.some(x => x.id === id));

                if (addingNotifications.length === 0) {
                    return;
                }



                state.historyBadgeCount += addingNotifications.filter(({ important }) => important).length;
                state.history = [...state.history, ...addingNotifications];
                state.notifications = [...addingNotifications, ...state.notifications];
            })
            ;
    }
);
