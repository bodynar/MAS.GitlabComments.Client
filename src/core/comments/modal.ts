import { isNullOrUndefined } from "@bodynarf/utils";

import { EditCommentModel } from "@app/models/comments";
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
                    customValidators: [getLengthValidator(128)],
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
                    customValidators: [getLengthValidator(128)],
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
