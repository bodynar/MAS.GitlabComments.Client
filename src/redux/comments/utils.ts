import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Action, ActionWithPayload } from 'redux/types';

import { ModalCallback, ModalData, ModalParams } from 'redux/modal/types';
import { AddNotification, NotificatorAction } from 'redux/notificator/types';
import { NotificationItem } from 'models/notification';

import { isNullOrUndefined } from 'utils/common';

import { ModalFormItem } from 'modules/modalBox/modalForm';

import { setModuleState } from './actions';
import { CommentModuleState, CommentsState } from './types';
import { BaseCommentModel } from 'models/comment';

/**
 * Create dispatch-based action to set comments module error state
 * @param dispatch Redux store dispatcher
 * @returns Redux store action setting error
 */
export const setError = (dispatch: ThunkDispatch<CommentsState, unknown, Action>) => (error: string): void => {
    dispatch({
        type: AddNotification,
        notifications: [{
            type: 'error',
            message: error,
        } as NotificationItem]
    });

    dispatch({
        type: setModuleState,
        payload: {
            nextState: 'idle' as CommentModuleState
        }
    });
};

/**
 * Create comments module redux action to set module state according to loading state flag.
 * Will set idle if flag is false
 * @param isLoading Is module in loading state
 * @returns Comments module redux store action
 */
export const getSetIsLoadingAction = (isLoading: boolean): ActionWithPayload => {
    const nextState: CommentModuleState = isLoading ? 'loading' : 'idle';

    return {
        type: setModuleState,
        payload: { nextState }
    };
};

/**
 * Get comment form configuration for form in modal box
 * @param commentShortModel Comment data model, optional
 * @returns Modal params configuration for modal with comment forn
 */
export const getCommentModalFormConfig = (commentShortModel?: BaseCommentModel): ModalParams => {
    const isCommentModelDefined =
        !isNullOrUndefined(commentShortModel);

    const modalFields: Array<ModalFormItem> =
        [
            {
                name: 'Comment',
                type: 'text',
                caption: 'Comment',
                isRequired: true,
                value: isCommentModelDefined ? commentShortModel?.message as string : undefined
            },
            {
                name: 'Description',
                type: 'multiline',
                caption: 'Description',
                value: isCommentModelDefined ? commentShortModel?.description as string : undefined
            },
        ];

    const modalParams: ModalParams = {
        modalType: 'form',
        title: 'Update comment',
        formData: { fields: modalFields },
    };

    return modalParams;
};

/**
 * Get modal callback configuration with custom callback
 * @param dispatch Redux store dispatcher
 * @param action Custom handler for modal save action
 * @returns Modal callback configuration
 */
export const getCommentModalFormCallbackConfig = (
    dispatch: ThunkDispatch<CommentsState, unknown, ActionWithPayload | NotificatorAction>,
    action: (updateComment: BaseCommentModel) => ThunkAction<void, CommentsState, unknown, ActionWithPayload | NotificatorAction>
): ModalCallback => {
    return {
        saveCallback: (modalData: ModalData): void => {
            dispatch(getSetIsLoadingAction(false));

            const message: string | undefined = modalData.formData?.fields.find(x => x.name === 'Comment')?.value;

            if (isNullOrUndefined(message)) {
                throw new Error('Comment message is empty after modal form with required flag');
            }

            const comment: BaseCommentModel = {
                message: message as string,
                description: modalData.formData?.fields.find(x => x.name === 'Description')?.value
            };

            dispatch(action(comment));
        },
        cancelCallback: (): void => {
            dispatch(getSetIsLoadingAction(false));
        },
    };
};
