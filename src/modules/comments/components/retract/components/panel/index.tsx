import { FC, useCallback, useState } from "react";

import { getClassName } from "@bodynarf/utils";
import { ElementSize } from "@bodynarf/react.components";
import Button from "@bodynarf/react.components/components/button/component";
import Icon from "@bodynarf/react.components/components/icon/component";

import { ExtendedRetractionToken } from "@app/models/comments";

import RetractionListItem from "../listItem";

/** Props type of `RetractionPanel` */
type RetractionPanelProps = {
    /** Active tokens */
    tokens: Array<ExtendedRetractionToken>;

    /**
     * Retract operation by token
     * @param tokenId Token identifier
     */
    retract: (tokenId: string) => Promise<void>;

    /**
     * Retract all operations by all active tokens
     */
    batchRetract: () => Promise<void>;
};

/** Retraction tokens panel */
const RetractionPanel: FC<RetractionPanelProps> = ({
    tokens,
    retract, batchRetract,
}) => {
    const [isVisible, setVisibility] = useState(false);

    const toggleListDisplay = useCallback(() => setVisibility(x => !x), []);
    const onBatchClick = useCallback(() => batchRetract(), [batchRetract]);
    const onRetractClick = useCallback((tokenId: string) => retract(tokenId), [retract]);
    const showComment = useCallback(
        (item: ExtendedRetractionToken) => {
            window.location.hash = item.commentId;
        },
        []
    );

    const wrapClassName = getClassName([
        "ret-tokens-block",
        "box",
        "mx-2",
        "mt-2",
        isVisible ? "" : "is-collapsed"
    ]);

    const listClassName = getClassName([
        "ret-tokens-block__list",
        "pr-1",
        isVisible ? "mt-2" : "",
    ]);

    const caption = tokens.length > 99
        ? `99+ active tokens`
        : `${tokens.length} active tokens`;

    return (
        <section
            className={wrapClassName}
        >
            <div
                className="ret-tokens-block__caption pr-2 is-flex is-align-items-center"
            >
                <Button
                    light
                    type="danger"
                    title="Retract all"
                    onClick={onBatchClick}
                    size={ElementSize.Small}
                    icon={{ name: "arrow-counterclockwise" }}
                />
                <span className="ml-2">
                    {caption}
                </span>
                <Icon
                    name="chevron-up"
                    size={ElementSize.Small}
                    onClick={toggleListDisplay}
                    className="ml-auto is-clickable"
                />
            </div>
            <div className={listClassName}>
                <ul>
                    {tokens.map(x =>
                        <RetractionListItem
                            key={x.id}

                            item={x}
                            retract={onRetractClick}
                            showComment={showComment}
                        />
                    )}
                </ul>
            </div>
        </section>
    );
};

export default RetractionPanel;
