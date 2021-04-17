/** Notification types */
export type NotificationType =
    | 'info' /** Blue color */
    | 'success' /** Green color */
    | 'warn' /** Orange color */
    | 'error' /** Red color */
    ;

/** Notification model */
export interface NotificationItem {
    /** Unique identifier, automaticly generated */
    id?: string;

    /** Type  */
    type: NotificationType;

    /** Displaying message */
    message: string;

    /** Optional delay in seconds */
    delay?: number;

    /** Should notification be light-colored */
    isLightColor?: boolean;
}
