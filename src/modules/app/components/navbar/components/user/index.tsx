import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getClassName } from "@bodynarf/utils";
import { ElementSize } from "@bodynarf/react.components";
import Icon from "@bodynarf/react.components/components/icon/component";

/** User module ref icon component */
const UserModuleRef = (): JSX.Element => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isUserModuleOpened = pathname.startsWith("/user");

    const onIconClick = useCallback(() => {

        if (isUserModuleOpened) {
            return;
        }

        navigate("/user/", { replace: true });
    }, [isUserModuleOpened, navigate]);

    const className = getClassName([
        "app-navbar__item",
        "app-user-ref",
        isUserModuleOpened ? "app-user-ref--active" : ""
    ]);

    return (
        <div
            className={className}
            onClick={onIconClick}
        >
            <Icon
                name={isUserModuleOpened ? "gear-fill" : "gear"}
                size={ElementSize.Medium}
            />
        </div>
    );
};

/** User module ref icon component */
export default UserModuleRef;
