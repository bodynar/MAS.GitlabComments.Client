import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullOrEmpty } from "@app/utils/common";
import { get } from "@app/utils/api";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { OpenModal } from "@app/redux/modal/actions";
import { ModalAction } from "@app/redux/modal/types";

import { getSetAppIsLoadingAction } from "@app/redux/app/actions/setAppIsLoading";
import { setError } from "@app/redux/app/utils";

/**
 * Show description for specified comment from api
 * @param commentId Comment identifier value
 * @returns Show description function that can be called with redux dispatcher
 */
export const showDescription = (commentId: string): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload | ModalAction>,
        getState: () => CompositeAppState,
    ): void => {
        dispatch(getSetAppIsLoadingAction(true));

        get<string>(`/api/comments/description?commentId=${commentId}`)
            .then((description: string) => {
                dispatch(getSetAppIsLoadingAction(false));

                const modalMessage: string = isNullOrEmpty(description)
                    ? 'Comment does not have any description.'
                    : description;

                dispatch({
                    type: OpenModal,
                    params: {
                        modalType: 'info',
                        title: 'Comment description',
                        message: modalMessage,
                    }
                } as ModalAction);
            })
            .catch(setError(dispatch, getState));
    };
