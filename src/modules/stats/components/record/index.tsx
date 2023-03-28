import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@bodynarf/react.components/components/button";

import "./record.scss";
import "./record.dark.scss";

import { StatsRecord } from "@app/models";

type StatsRecordProps = StatsRecord & {
    /** Show comment description */
    showDescription: (commentId: string) => void;
};

const StatsRecordComponent = ({ commentId, text: commentText, count, showDescription }: StatsRecordProps): JSX.Element => {
    const navigate = useNavigate();

    const onShowClick = useCallback(() => {
        const url = `${window.location.origin}#${commentId}`;

        navigator.clipboard.writeText(url).then(() =>
            navigate({ pathname: "/", hash: commentId })
        );
    }, [navigate, commentId]);

    const onShowDescriptionClick = useCallback(() => showDescription(commentId), [commentId, showDescription]);

    return (
        <div className="app-stats-record columns ml-1">
            <div className="column is-2 m-auto has-text-centered">
                +{count}
            </div>
            <div className="column m-auto">
                <span>
                    {commentText}
                </span>
            </div>
            <div className="column is-2 my-auto">
                <div className="buttons is-justify-content-center">
                    <Button
                        type="info"
                        outlined={true}
                        icon={{ name: "info-lg" }}
                        title="Show description"
                        onClick={onShowDescriptionClick}
                    />
                    <Button
                        type="link"
                        icon={{ name: "link-45deg" }}
                        title="Show in list"
                        onClick={onShowClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default StatsRecordComponent;
