import React from 'react';

import './comment.scss';

import { Comment as CommentModel } from 'models/comment';

type CommentProps = {
    comment: CommentModel;
};

export default function Comment({ comment }: CommentProps): JSX.Element {
    return (
        <div>
            {comment.id}
        </div>
    );
}
