import { FC, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

import { isNullish, isNullOrEmpty, Optional } from "@bodynarf/utils";
import { ButtonProps, ElementSize, ValidationState, ValidationStatus } from "@bodynarf/react.components";
import Icon from "@bodynarf/react.components/components/icon";
import Multiline from "@bodynarf/react.components/components/primitives/multiline";
import Text from "@bodynarf/react.components/components/primitives/text";

import { MODAL_KEYS } from "@app/constants";
import { Comment, EditCommentModel } from "@app/models/comments";
import { getLengthValidator } from "@app/core/modal";
import { getCommentsThatLookalike } from "@app/core/comments";

import { CompositeAppState } from "@app/redux/types";
import { close } from "@app/redux/modal";
import { addCommentAsync, displayCommentInsteadOfCreate } from "@app/redux/comments";

import ModalWrapper from "@app/modal";

import "./style.scss";


/** Validator for comment message field */
const commentLengthValidator = getLengthValidator(512);

/** Error message for required but empty field */
const valueIsRequiredMessage = "Value is required";

/** Props type of `AddComment` */
type AddCommentProps = {
    /** All comments */
    comments: Array<Comment>;

    /** Is modal with component displayed */
    isOpen: boolean;

    /** Close modal */
    closeModal: () => void;

    /**
     * Add comment via DTO model
     * @param model DTO for create
     */
    addComment: (model: EditCommentModel) => void;

    /**
     * Display lookalike comment with modal form close
     * @param id Comment identifier
     */
    displayCommentInsteadOfCreate: (id: string) => void;
};

/** */
const AddComment: FC<AddCommentProps> = ({
    comments,
    isOpen,
    closeModal, addComment,
    displayCommentInsteadOfCreate,
}) => {
    const [model, setModel] = useState<EditCommentModel>(initialModelState);

    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(true);
    const [validationStateMap, setValidationStateMap] = useState<EditCommentModelValidationState>(initialValidationState);

    const onCloseClick = useCallback(() => closeModal(), [closeModal]);
    const onSaveClick = useCallback(() => addComment(model), [addComment, model]);

    const onCommentChange = useCallback(
        (value?: string) => {
            setModel(model => ({
                message: value ?? "",
                commentWithLinkToRule: model.commentWithLinkToRule,
                description: model.description,
            }));


            validationStateMap.message[0] = isNullOrEmpty(value)
                ? valueIsRequiredMessage
                : undefined;

            const lengthValidationError = commentLengthValidator(value ?? "");

            validationStateMap.message[1] = !isNullOrEmpty(lengthValidationError)
                ? lengthValidationError
                : undefined;
        },
        [validationStateMap]
    );

    const onLinkToRuleChange = useCallback(
        (value?: string) => {
            setModel(model => ({
                message: model.message,
                commentWithLinkToRule: value ?? "",
                description: model.description,
            }));

            validationStateMap.commentWithLinkToRule[0] = isNullOrEmpty(value)
                ? valueIsRequiredMessage
                : undefined;
        },
        [validationStateMap]
    );

    const onDescriptionChange = useCallback(
        (value?: string) =>
            setModel(model => ({
                message: model.message,
                commentWithLinkToRule: model.commentWithLinkToRule,
                description: value,
            }))
        ,
        []
    );

    const onCommentNumberClick = useCallback(
        (id: string) => displayCommentInsteadOfCreate(id),
        [displayCommentInsteadOfCreate]
    );

    useEffect(() => {
        const values = [
            ...validationStateMap.message,
            ...validationStateMap.commentWithLinkToRule,
        ].flat().filter(x => !isNullish(x));

        setSaveButtonDisabled(
            values.length !== 0
            || isNullOrEmpty(model.message)
            || isNullOrEmpty(model.commentWithLinkToRule)
        );
    }, [validationStateMap, model.message, model.commentWithLinkToRule]);

    useEffect(() => {
        if (!isOpen) {
            setValidationStateMap(initialValidationState);
            setModel(initialModelState);
        }
    }, [isOpen]);

    if (!isOpen) {
        return <></>;
    }

    const lookalikeComments = getCommentsThatLookalike(comments, model);

    const actions: Array<ButtonProps> = [{
        type: "success",
        caption: "Save",
        onClick: onSaveClick,
        disabled: isSaveButtonDisabled,
    }, {
        type: "default",
        caption: "Cancel",
        onClick: onCloseClick,
    }];

    return (
        <ModalWrapper
            title="Add comment"
            onCloseClick={onCloseClick}
            actions={actions}
        >
            <>
                <Text
                    name="message"
                    placeholder="Comment"
                    label={{
                        className: "is-required",
                        caption: "Comment",
                        horizontal: false,
                    }}
                    onValueChange={onCommentChange}
                    validationState={getValidationState(validationStateMap, "message")}
                />
                <Text
                    placeholder="Link to rule"
                    name="commentWithLinkToRule"
                    label={{
                        className: "is-required",
                        caption: "Link to rule",
                        horizontal: false,
                    }}
                    onValueChange={onLinkToRuleChange}
                    validationState={getValidationState(validationStateMap, "commentWithLinkToRule")}
                />
                {lookalikeComments.length > 0 &&
                    <LookalikeCommentList
                        lookalikeComments={lookalikeComments}
                        onCommentNumberClick={onCommentNumberClick}
                    />
                }
                <Multiline
                    name="description"
                    placeholder="Description"
                    label={{
                        caption: "Description",
                        horizontal: false,
                    }}
                    onValueChange={onDescriptionChange}
                />
            </>
        </ModalWrapper>
    );
};

export default connect(
    ({ comments, modal }: CompositeAppState) => ({
        comments: comments.comments,
        isOpen: modal.isOpen && modal.customModalKey === MODAL_KEYS.ADD_COMMENT
    }),
    {
        closeModal: close,
        addComment: addCommentAsync,
        displayCommentInsteadOfCreate: displayCommentInsteadOfCreate,
    }
)(AddComment);

/** Props of `LookalikeCommentList` */
type LookalikeCommentListProps = {
    /** List of comments */
    lookalikeComments: Array<Comment>;

    /**
     * Handler of click on comment number
     * @param id Comment identifier
     */
    onCommentNumberClick: (id: string) => void;
};

/** List of lookalike comments */
const LookalikeCommentList: FC<LookalikeCommentListProps> = ({
    lookalikeComments, onCommentNumberClick
}) => {
    return (
        <section className="lookalike-comments">
            <label className="label is-normal">
                Similar comments <Icon
                    name="question-circle"
                    title="These existing comments have a similar text or link to rule.
It might be better to use existing comment instead of creating another similar one."
                    size={ElementSize.Small}
                />
            </label>
            <ul>
                {lookalikeComments.map(c =>
                    <li
                        key={c.id}
                        className="mb-2"
                    >
                        <div>
                            <span
                                className="has-text-weight-bold is-comment-link"
                                onClick={() => onCommentNumberClick(c.id)}
                                title={`Display ${c.number} comment`}
                            >
                                {c.number}
                            </span> • {c.message}
                        </div>
                        <div className="is-italic">
                            ↑ {c.appearanceCount}{isNullOrEmpty(c.commentWithLinkToRule)
                                ? undefined
                                : " • " + c.commentWithLinkToRule}
                        </div>
                    </li>
                )}
            </ul>
        </section>
    );
};

/** Validation state of `EditCommentModel` */
type EditCommentModelValidationState = {
    /** Validation errors for `EditCommentModel.message` */
    message: Array<Optional<string>>;

    /** Validation errors for `EditCommentModel.commentWithLinkToRule` */
    commentWithLinkToRule: Array<Optional<string>>;
};

/** Default validation state */
const initialValidationState: EditCommentModelValidationState = {
    message: [],
    commentWithLinkToRule: [],
};

const initialModelState: EditCommentModel = {
    commentWithLinkToRule: "",
    message: "",
    description: "",
};

/**
 * Get field validation state
 * @param validationStateMap Validation map
 * @param fieldName Name of a field
 * @returns Current validation state
 */
const getValidationState = (
    validationStateMap: EditCommentModelValidationState,
    fieldName: keyof EditCommentModelValidationState
): ValidationState => {
    const validationData = validationStateMap[fieldName].filter(x => !isNullish(x));

    if (isNullish(validationData)) {
        throw new Error(`Validation data for not "${fieldName}" found`);
    }

    return {
        messages: validationData.map(x => x as string),
        status: validationData.length === 0
            ? ValidationStatus.None
            : ValidationStatus.Invalid,
    };
};
