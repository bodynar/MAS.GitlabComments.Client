import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullOrEmpty } from "@bodynarf/utils/common";

import { get } from "@app/utils/delayedApi";

import { ActionWithPayload } from "@app/redux/types";
import { CompositeAppState } from "@app/redux/rootReducer";

import { setError } from "@app/redux/app/utils";

import { ModalAction } from "@app/redux/modal/types";
import { getOpenModalAction } from "@app/redux/modal/actionCreators/open";

import { getSetAppIsLoadingAction } from "@app/redux/app/actions/setAppIsLoading";

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
                    ? "Comment does not have any description."
                    : description;

                dispatch(getOpenModalAction({
                    modalType: "info",
                    title: "Comment description",
                    message: modalMessage,
                }));
            })
            .catch(setError(dispatch, getState));
    };
