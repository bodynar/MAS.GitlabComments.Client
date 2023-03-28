import { useCallback, useState } from "react";

import { connect } from "react-redux";

import { ButtonType } from "@bodynarf/react.components/components/button/types";
import { generateGuid } from "@bodynarf/utils/guid";

import { NotificationItem, NotificationType } from "@app/models";

import Button from "@bodynarf/react.components/components/button";

import { getAddNotificationAction } from "@app/redux/notificator";

/** Notification type to Button type map */
const notificationTypeToButtonTypeMap = new Map<string, ButtonType>([
    ["info", "info"],
    ["success", "success"],
    ["warn", "warning"],
    ["error", "danger"],
]);

type DevelopmentPanelProps = {
    /** Show notification */
    show: (notification: NotificationItem, notifyOnBadge: boolean) => void;
};

const DevelopmentPanel = ({ show }: DevelopmentPanelProps): JSX.Element => {
    const [types, _] = useState(Object.keys(NotificationType));

    const onBtnClick = useCallback(
        (type: string) => {
            show({
                id: generateGuid(),
                createdAt: new Date(),
                message: "Test message in DEV mode\nNew line content\nLorem ipsum dorem dolores",
                type: type as NotificationType
            }, true);
        }, [show]);

    return (
        <section
            className="block has-border-top-width-3 p-3"
            style={{ border: "1px solid #2196f3" }}
        >
            <h4 className="subtitle block has-text-centered">
                Development panel
            </h4>
            <section className="block is-flex is-justify-content-space-evenly">
                {types.map(type =>
                    <div key={type}>
                        <Button
                            type={notificationTypeToButtonTypeMap.get(type)!}
                            caption={`Show ${type}`}
                            onClick={() => onBtnClick(type)}
                        />
                    </div>
                )}
            </section>
        </section>

    );
};

/** Development panel */
export default connect(_ => ({}), {
    show: getAddNotificationAction
})(DevelopmentPanel);
