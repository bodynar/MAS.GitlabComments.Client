import { useCallback, useEffect } from "react";

import "./style.scss";
import "./style.dark.scss";

import { NOTIFICATION_HIDE_DELAY } from "@app/constants";

import { NotificationDisplayItem, NotificationType } from "@app/models/notification";
import { emptyFn } from "@bodynarf/utils";

/** Map of notification type to bulma class name */
const typeClassNameMap: Map<NotificationType, string> = new Map([
    [NotificationType.info, "is-info"],
    [NotificationType.success, "is-success"],
    [NotificationType.warn, "is-warning"],
    [NotificationType.error, "is-danger"],
]);

/** Single notification component configuration */
interface NotificationProps {
    /** Notification configuration */
    item: NotificationDisplayItem;

    /** Close notification click handler */
    onHideClick: (notificationId: string) => void;
}

/** Single notification component */
export default function Notification({
    item,
    onHideClick,
}: NotificationProps): JSX.Element {
    const hide = useCallback(() => onHideClick(item.id), [item.id, onHideClick]);

    useEffect(() => {
        if (!item.important) {
            const timer = setTimeout(hide, NOTIFICATION_HIDE_DELAY);

            return (): void => { clearTimeout(timer); };
        }

        return emptyFn;
    }, [hide, item.important]);

    return (
        <div className={`app-notificator__item notification ${typeClassNameMap.get(item.type)}`}>
            <button
                className="delete"
                onClick={hide}
            ></button>
            {item.message}
        </div>
    );
}
