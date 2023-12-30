import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ElementSize } from "@bodynarf/react.components";
import Button from "@bodynarf/react.components/components/button";

import "@app/styles/comments/comment.scss";

import { StatsRecord } from "@app/models/stats";

interface StatsRecordProps extends StatsRecord {
    /** Show comment description */
    showDescription: (commentId: string) => void;
}

const StatsRecordComponent = ({
    commentId, text: commentText, count, number,
    showDescription,
}: StatsRecordProps): JSX.Element => {
    const navigate = useNavigate();

    const onShowClick = useCallback(() => {
        const url = `${window.location.origin}#${commentId}`;

        navigator.clipboard.writeText(url).then(() =>
            navigate({ pathname: "/", hash: commentId })
        );
    }, [navigate, commentId]);

    const onShowDescriptionClick = useCallback(() => showDescription(commentId), [commentId, showDescription]);

    return (
        <div className="app-comment-item comments-table my-2 p-3">
            <span className="comments-table__appearance">
                +{count}
            </span>
            <span className="comments-table__number">
                {number}
            </span>
            <p className="comments-table__content">
                {commentText}
            </p>
            <div className="comments-table__actions my-auto">
                <div className="buttons is-justify-content-center">
                    <Button
                        type="info"
                        outlined={true}
                        icon={{ name: "info-lg", size: ElementSize.Medium }}
                        title="Show description"
                        onClick={onShowDescriptionClick}
                    />
                    <Button
                        type="link"
                        icon={{ name: "link-45deg", size: ElementSize.Medium }}
                        title="Show in list"
                        onClick={onShowClick}
                    />
                </div>
            </div>
        </div >
    );
};

export default StatsRecordComponent;
