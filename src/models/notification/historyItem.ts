import { NotificationType } from ".";

/** Notification item */
export interface NotificationHistoryItem {
    /** Unique identifier, automatically generated */
    id: string;

    /** Type  */
    type: NotificationType;

    /** Displaying message */
    message: string;

    /** Date of creation */
    createdAt: Date;
}
