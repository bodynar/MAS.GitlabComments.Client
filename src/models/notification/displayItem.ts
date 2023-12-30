import { NotificationHistoryItem } from ".";

/** Model of displayed notification */
export interface NotificationDisplayItem extends NotificationHistoryItem {
    /**
     * If notification marked as important - it won't be hidden after few seconds
    */
    important: boolean;
}
