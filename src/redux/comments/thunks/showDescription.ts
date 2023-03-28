import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullOrEmpty } from "@bodynarf/utils";

import { get } from "@app/utils";

import { ActionWithPayload, CompositeAppState } from "@app/redux";
import { setError, getSetAppIsLoadingAction } from "@app/redux/app";

import { getOpenModalAction } from "@app/redux/modal";

import { ModalType } from "@app/redux/modal";

/**
 * Show description for specified comment from api
 * @param commentId Comment identifier value
 * @returns Show description function that can be called with redux dispatcher
 */
export const showDescription = (commentId: string): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState,
    ): void => {
        dispatch(getSetAppIsLoadingAction(true));

        get<string>(`/api/comments/description?commentId=${commentId}`)
            .then((description: string) => {
                dispatch(getSetAppIsLoadingAction(false));

                const modalMessage: string = isNullOrEmpty(description)
                    ? "Comment does not have any description."
                    : description;

                dispatch(getOpenModalAction({
                    modalType: ModalType.Info,
                    title: "Comment description",
                    message: modalMessage,
                }));
            })
            .catch(setError(dispatch, getState));
    };
