import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import './comments.scss';

import { isNullOrUndefined, isStringEmpty } from 'utils/common';

import { Comment as CommentModel } from 'models/comment';

import Button from 'sharedComponents/button';
import Search from 'sharedComponents/search';

import { AppState } from 'redux/rootReducer';
import { getAllComments, addComment, updateComment, increment, showDescription, deleteComment } from 'redux/comments/thunks';
import { CommentModuleState } from 'redux/comments/types';

import Comment from '../components/comment';

type CommentsProps = {
    /** All comments */
    comments: Array<CommentModel>;

    /** Current module state */
    state: CommentModuleState;

    /** Add comment in modal box */
    addComment: () => void;

    /** Get all comments */
    getComments: () => void;

    /** Update specified comment in modal box */
    updateComment: (commentId: string) => void;

    /** Increment comment appearance count */
    increment: (commentId: string) => void;

    /** Show comment description */
    showDescription: (commentId: string) => void;

    /** Delete comment by it's identifier */
    deleteComment: (commentId: string) => void;
};

// TODO: add transition to comments
// TODO: add header for columns
// TODO: add sorting
function Comments(props: CommentsProps): JSX.Element {
    const [displayedComments, setDisplayedComments] = useState<Array<CommentModel>>(props.comments);
    const [searchPattern, setSearchPattern] = useState<string>('');

    const onSearch = useCallback(
        (searchPattern: string) => {
            if (isStringEmpty(searchPattern)) {
                setDisplayedComments([...props.comments]);
            } else {
                const filteredComments: Array<CommentModel> =
                    [...props.comments].filter(x => x.message.toLowerCase().includes(searchPattern.toLowerCase()));

                setDisplayedComments(filteredComments);
            }

            setSearchPattern(searchPattern);
        }, [props.comments]);

    useEffect(() => {
        if (props.state === 'init') {
            props.getComments();
        }
    }, [props, props.comments]);

    useEffect(() => {
        onSearch(searchPattern);
    }, [onSearch, props.comments, searchPattern]);

    const isLoading = useMemo((): boolean => props.state === 'loading', [props.state]);

    const noCommentsMessage: string =
        props.comments.length === 0
            ? 'No comments'
            : `No comments that satisfy your filters found
            Try update your filters`;

    return (
        <section className="app-comments">
            <div className="field">
                <Button
                    caption="Add comment"
                    type="success"
                    isLoading={isLoading}
                    onClick={props.addComment}
                />
            </div>
            <div className="block">
                <Search
                    caption="Search comment by text.."
                    onSearch={onSearch}
                    minCharsToSearch={0}
                    isLoading={isLoading}
                />
            </div>
            <div className="app-comments__items">
                {displayedComments.length > 0
                    ? displayedComments.map(comment =>
                        <Comment
                            key={comment.id}
                            {...props}
                            comment={comment}
                            isModuleInLoadingState={props.state == 'loading'}
                        />
                    )
                    : <EmptyListPlaceholder message={noCommentsMessage} />
                }
            </div>
        </section>
    );
}

const EmptyListPlaceholder = ({ message }: { message: string; }): JSX.Element => {
    const displayMessage: string =
        isNullOrUndefined(message) || isStringEmpty(message)
            ? 'No items' : message;

    return (
        <span className="app-empty-list-placeholder">
            {displayMessage}
        </span>
    );
};

export default connect(
    ({ comments }: AppState) => ({ ...comments }),
    {
        addComment: addComment,
        getComments: getAllComments,
        updateComment: updateComment,
        increment: increment,
        showDescription: showDescription,
        deleteComment: deleteComment
    }
)(Comments);
