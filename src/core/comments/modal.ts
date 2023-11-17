import { isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils";

import { EditCommentModel } from "@app/models/comments";
import { ModalFormItem, ModalFormItemType, ModalParams, ModalType } from "@app/models/modal";

/**
 * List of required comment entity fields
 * @constant
*/
const requiredFields = ["message", "commentWithLinkToRule"];

/**
 * Get length validator function
 * @param maxLength Maximum allowed value length
 * @param minLength Minimum allowed value length
 * @returns Validator function
 */
const getLengthValidator = (maxLength: number, minLength: number = 0): (value: string) => string | undefined => {
    if (maxLength <= minLength) {
        throw new Error(`maxLength "${maxLength}" must be greater that minLength "${minLength}"`);
    }

    return (value: string): string | undefined => {
        if (isNullOrEmpty(value)) {
            return undefined;
        }

        if (value.length > maxLength) {
            return `Value must be ${maxLength} symbols long max`;
        }

        if (minLength > 0 && value.length > minLength) {
            return `Value must be at least ${minLength} symbols long`;
        }

        return undefined;
    };
};

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
                    customValidation: getLengthValidator(128),
                },
            }
        ],
        [
            "commentWithLinkToRule",
            {
                name: "commentWithLinkToRule",
                type: ModalFormItemType.Text,
                caption: "Link to rule",

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

        formConfig.push({
            ...config,
            isRequired,
            value: isCommentModelDefined
                ? comment![key as keyof EditCommentModel]
                : "",
        });
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
