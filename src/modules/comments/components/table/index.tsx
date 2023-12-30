import { CSSTransition, TransitionGroup } from "react-transition-group";

import { isStringEmpty } from "@bodynarf/utils";

import "@app/styles/comments/comments.scss";

import { Comment as CommentModel } from "@app/models/comments";

import Comment from "../comment";

interface CommentTableProps {
    /** Current visible comments */
    displayedComments: Array<CommentModel>;

    /** Comments which should be highlighted after render */
    highlightedCommentId: string;

    /** Is app in read only mode */
    readOnlyMode: boolean;

    /** Current "no-items" message */
    noCommentsMessage: string;

    /** Update specified comment in modal box */
    updateComment: (commentId: string) => void;

    /** Increment comment appearance count */
    increment: (commentId: string) => void;

    /** Show comment description */
    showDescription: (commentId: string) => void;

    /** Delete comment by it"s identifier */
    deleteComment: (commentId: string) => void;
}

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
            ? "No items"
            : noCommentsMessage;
        return (
            <div className="block has-text-centered has-text-grey is-italic is-unselectable">
                <span style={{ whiteSpace: "pre-line" }}>
                    {displayMessage}
                </span>
            </div>
        );
    }

    return (
        <section>
            <div className="comments-table my-2 px-2">
                <span className="comments-table__appearance">
                    Appearance
                </span>
                <span className="comments-table__number">
                    Number
                </span>
                <span className="comments-table__content">
                    Comment
                </span>
                <span className="comments-table__actions">
                    Actions
                </span>
            </div>

            <TransitionGroup>
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
                            isReadOnlyMode={readOnlyMode ?? false}
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
