import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Comment } from 'models/comment';

import { AppState } from 'redux/rootReducer';
import { getAllComments, addComment, updateComment, increment, showDescription, deleteComment } from 'redux/comments/thunks';
import { CommentModuleState } from 'redux/comments/types';

import Button from 'sharedComponents/button/button';

type CommentsProps = {
    /** All comments */
    comments: Array<Comment>;

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
    useEffect(() => {
        if (props.state === 'init' && props.comments.length === 0) {
            props.getComments();
        }
    }, [props, props.comments]);

    return (
        <section>

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
