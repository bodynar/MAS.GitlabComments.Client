import React from "react";
import { connect } from "react-redux";

import { Comment } from "models/comment";
import { AddComment } from "models/request";
import {
    getAllComments,
    onAddComment as addCommentAction,
    addComment
} from 'redux/comments/thunks';
import { CommentModuleState, CommentsState } from "redux/comments/types";

type CommentsProps = {
    comments: Array<Comment>;
    state: CommentModuleState;
    error?: string;
    testAdd: () => void;
    addComment: (addComment: AddComment) => void;
    getComments: () => void;
};

function Comments(props: CommentsProps): JSX.Element {
    React.useEffect(() => {
        if (props.state === 'init' && props.comments.length === 0) {
            props.getComments();
        }
    }, [props, props.comments]);

    return (
        <section style={{ padding: '0 5em 5em 5em' }}>
            {props.state === 'error'
                && <span style={{ color: 'red' }}>{props.error}</span>
            }
            <br />
            <span>Comments: {props.comments.length}</span>
            <br />
            <span>State: {props.state}</span>
            <br />
            {props.state !== 'showModal'
                && <button className="button is-primary" onClick={props.testAdd}>Add comment</button>
            }
        </section>
    );
}

export default connect(
    ({ comments, state, error }: CommentsState) => ({ comments, state, error }),
    {
        addComment: addCommentAction,
        getComments: getAllComments,
        testAdd: addComment
    }
)(Comments);
