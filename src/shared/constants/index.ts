import cfg from "public/app.settings.json";

/**
 * @constant
 * Delay before notification will be hidden
*/
export const NOTIFICATION_HIDE_DELAY: number = cfg.Notification.HideDelay * 1000;

/**
 * @constant
 * Amount of notification to show "Dismiss all" button
 */
export const NOTIFICATION_COUNT_TO_SHOW_HIDE_ALL_BUTTON = cfg.Notification.ItemsRequiredToShowDismissAllBtn;

/**
 * @constant
 * Delay before loading state gif will be hidden
 */
export const LOADING_STATE_HIDE_DELAY: number = cfg.Request.LoaderMinSecondsLife * 1000;

/**
 * @constant
 * Max length of performing request before aborting (in seconds)
 */
export const REQUEST_TIMEOUT: number = cfg.Request.Timeout * 1000;
