import React from "react";
import { connect } from "react-redux";

import { Comment } from "models/comment";
import { AddComment } from "models/request";
import {
    getAllComments,
    addComment as addCommentAction,

} from 'redux/comments/thunks';
import { CommentsState } from "redux/comments/types";

type CommentsProps = {
    comments: Array<Comment>;
    addComment: (addComment: AddComment) => void;
    getComments: () => void;
};

function Comments(props: CommentsProps): JSX.Element {
    React.useEffect(() => {
        if (props.comments.length === 0) {
            props.getComments();
        }
    }, [props, props.comments]);

    return <>Comments: {props.comments.length}</>;
}

export default connect(
    (state: CommentsState) => ({ comments: state.comments }),
    {
        addComment: addCommentAction,
        getComments: getAllComments,
    }
)(Comments);
