import { useState, useCallback, useEffect } from 'react';

import './comment.scss';
import './comment.dark.scss';

import { Comment as CommentModel } from '@app/models/comment';

import Button from '@bodynarf/react.components/components/button';

import { getClassName } from '@bodynarf/utils/component';

type CommentProps = {
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

    /** Delete comment by it's identifier */
    deleteComment: (commentId: string) => void;
};

/** Comment component */
export default function Comment({ shouldBeScrolledTo, comment, increment, showDescription, updateComment, deleteComment, isReadOnlyMode }: CommentProps): JSX.Element {
    const onIncrementClick = useCallback(() => { increment(comment.id); }, [comment.id, increment]);
    const onShowDescriptionClick = useCallback(() => { showDescription(comment.id); }, [comment.id, showDescription]);
    const onUpdateCommentClick = useCallback(() => { updateComment(comment.id); }, [comment.id, updateComment]);
    const onDeleteCommentClick = useCallback(() => { deleteComment(comment.id); }, [comment.id, deleteComment]);

    const [highlighted, setHighlighted] = useState(false);

    const className = getClassName([
        "app-comment",
        "columns",
        "ml-1",
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

        return () => { };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={className} id={comment.id}>
            <div className="column is-1 my-auto">
                <div className="is-flex is-justify-content-center is-align-content-space-around  is-align-items-center">
                    <Button
                        type="default"
                        icon={{ name: 'arrow-up' }}
                        title="Increment count"
                        onClick={onIncrementClick}
                        disabled={isReadOnlyMode}
                    />
                    <span className="ml-2">
                        {comment.appearanceCount}
                    </span>
                </div>
            </div>
            <p className="column m-auto">
                {comment.message}
            </p>
            <div className="column is-2 my-auto">
                <div className="buttons is-justify-content-center">
                    <Button
                        type="info"
                        outlined={true}
                        icon={{ name: 'info-lg' }}
                        title="Show description"
                        onClick={onShowDescriptionClick}
                    />
                    <Button
                        type="warning"
                        outlined={true}
                        icon={{ name: 'pencil' }}
                        title="Edit"
                        onClick={onUpdateCommentClick}
                        disabled={isReadOnlyMode}
                    />
                    <Button
                        type="danger"
                        outlined={true}
                        icon={{ name: 'trash' }}
                        title="Delete"
                        onClick={onDeleteCommentClick}
                        disabled={isReadOnlyMode}
                    />
                </div>
            </div>
        </div>
    );
}
