import React, { useCallback } from 'react';

import './comment.scss';

import { Comment as CommentModel } from 'models/comment';
import Button from 'sharedComponents/button';

type CommentProps = {
    /** Displayed comment */
    comment: CommentModel;

    /** Should action buttons be disabled */
    isModuleInLoadingState: boolean;

    /** Increment comment appearance count */
    increment: (commentId: string) => void;

    /** Show comment description */
    showDescription: (commentId: string) => void;

    /** Update specified comment in modal box */
    updateComment: (commentId: string) => void;

    /** Delete comment by it's identifier */
    deleteComment: (commentId: string) => void;
};

export default function Comment({ comment, increment, showDescription, updateComment, deleteComment, isModuleInLoadingState }: CommentProps): JSX.Element {
    const onIncrementClick = useCallback(() => { increment(comment.id); }, [comment.id, increment]);
    const onShowDescriptionClick = useCallback(() => { showDescription(comment.id); }, [comment.id, showDescription]);
    const onUpdateCommentClick = useCallback(() => { updateComment(comment.id); }, [comment.id, updateComment]);
    const onDeleteCommentClick = useCallback(() => { deleteComment(comment.id); }, [comment.id, deleteComment]);

    return (
        <div className="app-comment">
            <Button
                type="default"
                icon={{ className: 'gg-arrow-up' }}
                title="Increment count"
                onClick={onIncrementClick}
                disabled={isModuleInLoadingState}
            />
            <span className="app-comment__appearance">
                {comment.appearanceCount}
            </span>
            <p className="app-comment__message">
                {comment.message}
            </p>
            <div className="buttons app-comment__actions">
                <Button
                    type="info"
                    outlined={true}
                    icon={{ className: 'gg-info' }}
                    title="Show description"
                    onClick={onShowDescriptionClick}
                    disabled={isModuleInLoadingState}
                />
                <Button
                    type="warning"
                    outlined={true}
                    icon={{ className: 'gg-pen' }}
                    title="Edit"
                    onClick={onUpdateCommentClick}
                    disabled={isModuleInLoadingState}
                />
                <Button
                    type="danger"
                    outlined={true}
                    icon={{ className: 'gg-trash' }}
                    title="Delete"
                    onClick={onDeleteCommentClick}
                    disabled={isModuleInLoadingState}
                />
            </div>
        </div>
    );
}
