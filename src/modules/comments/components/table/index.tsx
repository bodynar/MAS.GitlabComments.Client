import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { isStringEmpty } from '@bodynarf/utils/common';

import { Comment as CommentModel } from '@app/models/comment';

import Comment from '../comment';

type CommentTableProps = {
    /** Current visible comments */
    displayedComments: Array<CommentModel>;

    /** Comments which should be highlighted after render */
    highlightedCommentId: string;

    /** Is app in read only mode */
    readOnlyMode: boolean;

    /** Current 'no-items' message */
    noCommentsMessage: string;

    /** Update specified comment in modal box */
    updateComment: (commentId: string) => void;

    /** Increment comment appearance count */
    increment: (commentId: string) => void;

    /** Show comment description */
    showDescription: (commentId: string) => void;

    /** Delete comment by it's identifier */
    deleteComment: (commentId: string) => void;
};

/** Comments list component */
const CommentTable = ({
    displayedComments,
    highlightedCommentId,
    readOnlyMode,
    updateComment, increment, showDescription, deleteComment,
    noCommentsMessage,
}: CommentTableProps): JSX.Element => {
    if (displayedComments.length === 0) {
        const displayMessage: string = isStringEmpty(noCommentsMessage)
            ? 'No items'
            : noCommentsMessage;
        return (
            <div className="block has-text-centered has-text-grey is-italic is-unselectable">
                <span style={{ whiteSpace: 'pre-line' }}>
                    {displayMessage}
                </span>
            </div>
        );
    }

    return (
        <section>
            <div className="columns ml-1">
                <div className="column is-1">
                    <span className="is-flex is-justify-content-center">
                        Appearance
                    </span>
                </div>
                <div className="column ml-2">
                    <span>
                        Comment
                    </span>
                </div>
                <div className="column is-2">
                    <span className="is-flex is-justify-content-center">
                        Actions
                    </span>
                </div>
            </div>

            <TransitionGroup role="transition-container">
                {displayedComments.map(comment =>
                    <CSSTransition
                        key={comment.id}
                        timeout={250}
                        classNames="app-comment"
                        unmountOnExit
                    >
                        <Comment
                            key={comment.id}
                            comment={comment}
                            shouldBeScrolledTo={highlightedCommentId === comment.id}
                            isReadOnlyMode={readOnlyMode === true}
                            updateComment={updateComment}
                            increment={increment}
                            showDescription={showDescription}
                            deleteComment={deleteComment}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </section>
    );
};

export default CommentTable;
