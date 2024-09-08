import { FC, ReactNode } from "react";

import loadingIcon from "@app/assets/loading01.svg";

import "./styles.scss";
import "./styles.dark.scss";

/** Loader wrapper props */
type LoaderWrapProps = {
    /** Is app currently in loading mode */
    loading: boolean;

    /** Wrapped contentА */
    children: ReactNode;
};

/** Content loader wrapper */
const LoaderWrap: FC<LoaderWrapProps> = ({
    loading, children,
}) => {
    return (
        <div className="app-loading-cover">
            {loading &&
                <div className="app-loading-cover__image">
                    <img src={loadingIcon} alt="loading" />
                </div>
            }
            <div
                className="app-loading-cover__content"
                data-disabled={loading}
            >
                {children}
            </div>
        </div>
    );
};

export default LoaderWrap;
