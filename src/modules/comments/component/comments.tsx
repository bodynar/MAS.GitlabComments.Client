import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useLocation } from "react-router-dom";

import { connect } from 'react-redux';

import { CSSTransition, TransitionGroup } from 'react-transition-group';


import { isNullOrEmpty, isStringEmpty } from '@bodynarf/utils/common';

import './comments.scss';
import './comments.dark.scss';

import { Comment as CommentModel } from '@app/models/comment';

import { CompositeAppState } from '@app/redux/rootReducer';
import { getAllComments, addComment, updateComment, increment, showDescription, deleteComment } from '@app/redux/comments/thunks';
import { getSetSearchQueryAction } from '@app/redux/comments/actions/setSearchQuery';
import { CommentModuleState } from '@app/redux/comments/types';

import Button from '@app/sharedComponents/button';
import Search from '@app/sharedComponents/search';

import useQueryParam from '@app/hooks/useQueryParam';

import Comment from '../components/comment';

type CommentsProps = {
    /** Is app in read only mode */
    readOnlyMode?: boolean;

    /** All comments */
    comments: Array<CommentModel>;

    /** Current module state */
    state: CommentModuleState;

    /** Current search query */
    searchQuery: string;

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

    /** Save current search query */
    setSearchQuery: (searchQuery: string) => void;
};

/** Comments module main component */
function Comments(props: CommentsProps): JSX.Element {
    const searchQueryParam = useQueryParam('q') || '';
    const navigate = useNavigate();
    const location = useLocation();

    const highlightedCommentId = location.hash.length > 0 ? location.hash.substring(1) : '';

    const [displayedComments, setDisplayedComments] = useState<Array<CommentModel>>(
        props.comments.filter(x =>
            x.message.toLowerCase().includes((props.searchQuery || searchQueryParam).toLocaleLowerCase())
        )
    );

    const onSearch = useCallback(
        (searchPattern: string) => {
            const params = new URLSearchParams();

            if (isStringEmpty(searchPattern)) {
                setDisplayedComments([...props.comments]);
            } else {
                const filteredComments: Array<CommentModel> =
                    [...props.comments].filter(x => x.message.toLowerCase().includes(searchPattern.toLowerCase()));

                setDisplayedComments(filteredComments);

                params.append('q', searchPattern);
            }

            navigate({ search: params.toString(), hash: location.hash, });

            props.setSearchQuery(searchPattern);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [location.hash, navigate, props.comments]);

    useEffect(() => {
        if (props.state === 'init') {
            props.getComments();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.state]);

    useEffect(() => {
        if (isNullOrEmpty(props.searchQuery) && !isNullOrEmpty(searchQueryParam)) {
            props.setSearchQuery(searchQueryParam!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => onSearch(props.searchQuery), [onSearch, props.comments, props.searchQuery]);

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
                    onClick={props.addComment}
                    disabled={props.readOnlyMode}
                />
            </div>
            <div className="block">
                <Search
                    caption="Search comment by text.."
                    defaultValue={props.searchQuery}
                    onSearch={onSearch}
                    minCharsToSearch={0}
                />
            </div>
            <div className="app-comments__items">
                {displayedComments.length > 0
                    ? <>
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
                                        {...props}
                                        comment={comment}
                                        shouldBeScrolledTo={highlightedCommentId === comment.id}
                                        isReadOnlyMode={props.readOnlyMode === true}
                                    />
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </>
                    : <EmptyListPlaceholder message={noCommentsMessage} />
                }
            </div>
        </section>
    );
}

/** Comments module main component */
export default connect(
    ({ comments, app }: CompositeAppState) => ({ ...comments, readOnlyMode: app.readOnlyMode }),
    {
        addComment: addComment,
        getComments: getAllComments,
        updateComment: updateComment,
        increment: increment,
        showDescription: showDescription,
        deleteComment: deleteComment,
        setSearchQuery: getSetSearchQueryAction,
    }
)(Comments);

/** Empty list placeholder */
const EmptyListPlaceholder = ({ message }: { message: string; }): JSX.Element => {
    const displayMessage: string =
        isStringEmpty(message)
            ? 'No items' : message;

    return (
        <span className="app-empty-list-placeholder is-unselectable">
            {displayMessage}
        </span>
    );
};
