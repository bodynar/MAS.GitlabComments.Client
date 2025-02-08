import { isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils";

import { Comment, EditCommentModel } from "@app/models/comments";
import { ModalFormItem, ModalFormItemType, ModalParams, ModalType } from "@app/models/modal";

import { getLengthValidator } from "@app/core/modal";

/**
 * List of required comment entity fields
 * @constant
*/
const requiredFields = ["message", "commentWithLinkToRule"];

/**
 * Map column name to form field config
 * @constant
*/
const modalFormConfig: Map<string, ModalFormItem> =
    new Map([
        [
            "message",
            {
                name: "message",
                type: ModalFormItemType.Text,
                caption: "Comment",
                validationConfiguration: {
                    customValidators: [getLengthValidator(512)],
                },
            }
        ],
        [
            "commentWithLinkToRule",
            {
                name: "commentWithLinkToRule",
                type: ModalFormItemType.Text,
                caption: "Link to rule",
                validationConfiguration: {
                    customValidators: [getLengthValidator(1024)],
                }
            },
        ],
        [
            "description",
            {
                name: "description",
                type: ModalFormItemType.Multiline,
                caption: "Description",
            },
        ]
    ]);

/**
 * Get modal configuration for edit comment (create or edit mode)
 * @param comment Comment data (for edit modal)
 * @returns Modal configuration parameters
 */
export const getEditModalConfig = (
    comment: EditCommentModel | undefined = undefined
): ModalParams => {
    const isCommentModelDefined =
        !isNullOrUndefined(comment);

    const formConfig: Array<ModalFormItem> = [];

    modalFormConfig.forEach((config, key) => {
        const isRequired = requiredFields.includes(key);

        const item = {
            ...config,
            value: isCommentModelDefined
                ? comment![key as keyof EditCommentModel]
                : "",
        };

        if (isRequired) {
            item.validationConfiguration = {
                ...item.validationConfiguration!,
                required: true,
            };
        }

        formConfig.push(item);
    });

    return {
        modalType: ModalType.Form,
        title: isCommentModelDefined ? "Update comment" : "Add comment",
        formData: {
            fields: formConfig,
            readonly: false,
        },
    };
};

/**
 * Get modal config for view comment data
 * @returns Modal configuration parameters
 */
export const getViewModalConfig = (comment: EditCommentModel): ModalParams => {
    return {
        modalType: ModalType.Form,
        title: "Comment info",
        formData: {
            readonly: true,
            fields:
                Array
                    .from(modalFormConfig.values())
                    .map(config => ({
                        ...config,
                        value: comment[config.name as keyof EditCommentModel]
                    })),
        },
    };
};

/** Url href regEx */
const urlRegex = /(https?:\/\/|www\.)\S+/gi;

/**
 * Filter comments which lookalike specified data
 * @param comments Source comments
 * @param editModel Comment model
 * @returns Comments that are lookalike
 */
export const getCommentsThatLookalike = (
    comments: Array<Comment>,
    { message, commentWithLinkToRule }: EditCommentModel
): Array<Comment> => {
    if (isNullOrEmpty(message) && isNullOrEmpty(commentWithLinkToRule)) {
        return [];
    }

    if (message?.length < 2 && commentWithLinkToRule?.length < 2) {
        return [];
    }

    const characters = message?.length + commentWithLinkToRule?.length;

    if (characters < 4) {
        return [];
    }

    const trimmedComment = message
        ?.replace(/\s{2,}/g, " ").trim().toLowerCase()
        ?? "";

    const commentWithLinkWithoutHref = commentWithLinkToRule
        ?.replace(urlRegex, "").replace(/\s{2,}/g, " ").trim().toLowerCase()
        ?? "";

    const isLinkToRuleEmpty = isNullOrEmpty(commentWithLinkToRule);
    const isMessageEmpty = isNullOrEmpty(message);

    return comments
        .filter(comment => {
            if (!isMessageEmpty
                && comment.message
                    .replace(/\s{2,}/g, " ")
                    .trim()
                    .toLowerCase()
                    .includes(trimmedComment)
            ) {
                return true;
            }

            if (!isLinkToRuleEmpty
                && comment.commentWithLinkToRule
                    ?.replace(urlRegex, "")
                    .replace(/\s{2,}/g, " ")
                    .trim()
                    .toLowerCase()
                    .includes(commentWithLinkWithoutHref)
            ) {
                return true;
            }

            return false;
        })
        .sort((x, y) => y.appearanceCount - x.appearanceCount)
        .map(x => ({
            ...x,
            commentWithLinkToRule: isNullOrEmpty(x.commentWithLinkToRule)
                ? x.commentWithLinkToRule
                : x.commentWithLinkToRule.includes("http")
                    ? x.commentWithLinkToRule.substring(
                        0,
                        x.commentWithLinkToRule.indexOf("http") - 1
                    )
                    : x.commentWithLinkToRule
        }));
};
