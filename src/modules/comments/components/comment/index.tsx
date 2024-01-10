import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";

import { emptyFn, getClassName, isNullOrEmpty } from "@bodynarf/utils";
import { ElementSize } from "@bodynarf/react.components";
import Button from "@bodynarf/react.components/components/button";

import "@app/styles/comments/comment.scss";
import "./style.scss";

import { Comment as CommentModel } from "@app/models/comments";
import { displayWarn } from "@app/redux/notificator";

export interface CommentProps {
    /** Is comment should be scrolled into view after render */
    shouldBeScrolledTo: boolean;

    /** Displayed comment */
    comment: CommentModel;

    /** Is application in read only mode */
    isReadOnlyMode: boolean;

    /** Increment comment appearance count */
    increment: (commentId: string) => void;

    /** Show comment description */
    showDescription: (commentId: string) => void;

    /** Update specified comment in modal box */
    updateComment: (commentId: string) => void;

    /** Delete comment by it"s identifier */
    deleteComment: (commentId: string) => void;

    /** Display warn message */
    warn: (message: string, important: boolean) => void;
}

/** Comment component */
const Comment = ({
    shouldBeScrolledTo, isReadOnlyMode, comment,
    increment, showDescription, updateComment, deleteComment,
    warn,
}: CommentProps): JSX.Element => {
    const onShowDescriptionClick = useCallback(() => showDescription(comment.id), [comment.id, showDescription]);
    const onUpdateCommentClick = useCallback(() => updateComment(comment.id), [comment.id, updateComment]);
    const onDeleteCommentClick = useCallback(() => deleteComment(comment.id), [comment.id, deleteComment]);

    const [tippyVisible, setTippyVisible] = useState(false);
    const [tippyFadeOut, setTippyFadeOut] = useState(false);

    const onIncrementClick = useCallback(() => {
        let copyText = comment.commentWithLinkToRule;
        if (isNullOrEmpty(copyText)) {
            warn("Comment doesn't have Reference to rule. Please, update comment. Until then a message will be copied", true);
            copyText = comment.message;
        }

        navigator.clipboard.writeText(copyText);
        increment(comment.id);

        setTippyVisible(true);
    }, [comment.commentWithLinkToRule, comment.id, comment.message, increment, warn]);

    const [highlighted, setHighlighted] = useState(false);

    const className = getClassName([
        "app-comment",
        "app-comment-item",
        "comments-table",
        "my-2",
        "p-3",
        highlighted ? "app-comment--highlighted" : ""
    ]);

    useEffect(() => {
        if (shouldBeScrolledTo) {
            const element = document.getElementById(comment.id);

            if (element) {
                element.scrollIntoView();

                setHighlighted(true);

                const timer = setTimeout(() => {
                    setHighlighted(false);
                }, 5 * 1000);

                return () => clearTimeout(timer);
            }
        }

        return emptyFn;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (tippyVisible) {
            const timers: Array<NodeJS.Timeout> = [];

            const timer = setTimeout(() => {
                setTippyFadeOut(true);

                timers.push(
                    setTimeout(() => {
                        setTippyFadeOut(false);
                        setTippyVisible(false);
                    }, 1 * 1000)
                );
            }, 3 * 1000);

            timers.unshift(timer);

            return () => timers.forEach(x => clearTimeout(x));
        }

        return undefined;
    }, [tippyVisible]);

    return (
        <div
            id={comment.id}
            data-tippy-container
            className={className}
        >
            {tippyVisible &&
                <div className={`tippy ${tippyFadeOut ? "fade-out" : "fade-in"}`}>
                    Copied to clipboard
                </div>
            }
            <div className="comments-table__appearance">
                <div className="is-flex is-justify-content-center is-align-items-center">
                    <Button
                        type="ghost"
                        title="Increment count"
                        onClick={onIncrementClick}
                        isLoading={comment.blocked}
                        icon={{ name: "chevron-up", size: ElementSize.Medium }}
                        disabled={isReadOnlyMode || comment.blocked}
                    />
                    <span>
                        {comment.appearanceCount}
                    </span>
                </div>
            </div>
            <span className="comments-table__number">
                {comment.number}
            </span>
            <p className="comments-table__content">
                {comment.message}
            </p>
            <div className="comments-table__actions my-auto">
                <div className="buttons is-justify-content-center">
                    <Button
                        outlined
                        type="info"
                        title="Show description"
                        disabled={comment.blocked}
                        isLoading={comment.blocked}
                        onClick={onShowDescriptionClick}
                        icon={{ name: "info-lg", size: ElementSize.Medium }}
                    />
                    <Button
                        outlined
                        title="Edit"
                        type="warning"
                        isLoading={comment.blocked}
                        onClick={onUpdateCommentClick}
                        disabled={isReadOnlyMode || comment.blocked}
                        icon={{ name: "pencil", size: ElementSize.Medium }}
                    />
                    <Button
                        outlined
                        type="danger"
                        title="Delete"
                        isLoading={comment.blocked}
                        onClick={onDeleteCommentClick}
                        disabled={isReadOnlyMode || comment.blocked}
                        icon={{ name: "trash", size: ElementSize.Medium }}
                    />
                </div>
            </div>
        </div>
    );
};

export default connect(
    null,
    {
        warn: displayWarn,
    }
)(Comment);
