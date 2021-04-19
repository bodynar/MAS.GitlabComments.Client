import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import './comments.scss';

import { isStringEmpty } from 'utils/common';

import { Comment as CommentModel } from 'models/comment';

import Button from 'sharedComponents/button/button';
import Search from 'sharedComponents/search/search';

import { AppState } from 'redux/rootReducer';
import { getAllComments, addComment, updateComment, increment, showDescription, deleteComment } from 'redux/comments/thunks';
import { CommentModuleState } from 'redux/comments/types';

import Comment from '../components/comment/comment';


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

function Comments(props: CommentsProps): JSX.Element {
    // TODO: when adding new comment - update displaying comments
    const [displayedComments, setDisplayedComments] = useState<Array<CommentModel>>(props.comments);

    useEffect(() => {
        if (props.state === 'init' && props.comments.length === 0) {
            props.getComments();
        }
    }, [props, props.comments]);

    const isLoading = useMemo(
        (): boolean => props.state === 'loading', [props.state]);

    const onSearch = useCallback(
        (searchPattern: string) => {
            if (isStringEmpty(searchPattern)) {
                setDisplayedComments([...props.comments]);
            } else {
                const filteredComments: Array<CommentModel> =
                    [...props.comments].filter(x => x.message.toLowerCase().includes(searchPattern.toLowerCase()));

                setDisplayedComments(filteredComments);
            }
        }, [props.comments]);

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

            <div className="app-comments__items">
                <Search
                    caption="Search comment by text.."
                    onSearch={onSearch}
                    minCharsToSearch={0}
                    isLoading={isLoading}
                />
                {displayedComments.map(comment =>
                    <Comment
                        key={comment.id}
                        comment={comment}
                    />
                )}
            </div>
        </section>
    );
}

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
