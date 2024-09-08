import { FC, useCallback, useState } from "react";

import { connect } from "react-redux";

import { ButtonType } from "@bodynarf/react.components";
import { generateGuid } from "@bodynarf/utils";
import Button from "@bodynarf/react.components/components/button";

import { NotificationDisplayItem, NotificationType } from "@app/models/notification";

import { addNotification } from "@app/redux/notificator";

/** Notification type to Button type map */
const notificationTypeToButtonTypeMap = new Map<string, ButtonType>([
    ["info", "info"],
    ["success", "success"],
    ["warn", "warning"],
    ["error", "danger"],
]);

type DevelopmentPanelProps = {
    /** Show notification */
    show: (notifications: Array<NotificationDisplayItem>) => void;
};

/** Dev panel with "show notification" buttons */
const DevelopmentPanel: FC<DevelopmentPanelProps> = ({ show }) => {
    const [types] = useState(
        Object.values(NotificationType).filter(x => typeof x === "string") as Array<string>
    );

    const onBtnClick = useCallback(
        (type: string) => {
            show([{
                id: generateGuid(),
                createdAt: new Date(),
                message: "Test message in DEV mode\nNew line content\nLorem ipsum dorem dolores",
                type: NotificationType[type as keyof typeof NotificationType],
                important: true,
            }]);
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
export default connect(
    _ => ({}),
    { show: addNotification } as Pick<DevelopmentPanelProps, "show">
)(DevelopmentPanel);
