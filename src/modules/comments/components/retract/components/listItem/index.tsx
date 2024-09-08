import { FC, useCallback } from "react";

import { getClassName } from "@bodynarf/utils";
import Icon from "@bodynarf/react.components/components/icon/component";

import { ExtendedRetractionToken } from "@app/models/comments";

/** Props type of `RetractionListItem` */
type RetractionListItemProps = {
    /** Retraction token item */
    item: ExtendedRetractionToken;

    /**
     * Handler of retraction item click
     * @param item Retraction token item
     */
    showComment: (item: ExtendedRetractionToken) => void;

    /**
     * Retract operation by token
     * @param tokenId Token identifier
     */
    retract: (tokenId: string) => Promise<void>;
};

/** Single retraction token item in ret-token list */
const RetractionListItem: FC<RetractionListItemProps> = ({
    item,
    showComment, retract,
}) => {
    const className = getClassName([
        "ret-token-item",
        "is-flex",
        "is-align-items-center",
        "is-justify-content-space-between",
        "pt-1",
        item.blocked ? "is-disabled" : "",
    ]);

    const onRetractClick = useCallback(() => retract(item.id), [item.id, retract]);
    const onNumberClick = useCallback(() => showComment(item), [item, showComment]);

    return (
        <li
            className={className}
        >
            <span
                title="Show comment"
                onClick={onNumberClick}
                className="is-clickable"
            >
                {item.commentNumber}
            </span>
            <Icon
                name="arrow-counterclockwise"
                onClick={item.blocked ? undefined : onRetractClick}
                className={item.blocked ? undefined : "is-clickable"}
                title={item.blocked ? "Retraction in process" : "Retract"}
            />
        </li>
    );
};

export default RetractionListItem;
