import { useState, useCallback, useEffect } from 'react';

import './comment.scss';
import './comment.dark.scss';

import { Comment as CommentModel } from '@app/models/comment';

import Button from '@app/sharedComponents/button';

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

    const className =
        'app-comment'
        + (highlighted ? ' app-comment--highlighted' : '');

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
            <div className="app-comment__appearance">
                <Button
                    type="default"
                    icon={{ className: 'arrow-up' }}
                    title="Increment count"
                    onClick={onIncrementClick}
                    disabled={isReadOnlyMode}
                />
                <span>
                    {comment.appearanceCount}
                </span>
            </div>
            <p className="app-comment__message">
                {comment.message}
            </p>
            <div className="buttons app-comment__actions">
                <Button
                    type="info"
                    outlined={true}
                    icon={{ className: 'info-lg' }}
                    title="Show description"
                    onClick={onShowDescriptionClick}
                />
                <Button
                    type="warning"
                    outlined={true}
                    icon={{ className: 'pencil' }}
                    title="Edit"
                    onClick={onUpdateCommentClick}
                    disabled={isReadOnlyMode}
                />
                <Button
                    type="danger"
                    outlined={true}
                    icon={{ className: 'trash' }}
                    title="Delete"
                    onClick={onDeleteCommentClick}
                    disabled={isReadOnlyMode}
                />
            </div>
        </div>
    );
}
