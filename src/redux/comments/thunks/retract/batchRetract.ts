import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { ModalType } from "@app/models/modal";

import { batchRetract } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";
import { open } from "@app/redux/modal";
import { registerHttpRequest } from "@app/redux/app";
import { batchRetract as batchRetractAction } from "@app/redux/comments";

/**
 * Retract batch of tokens
 * @returns Redux thunk
 */
export const batchRetractAsync = (): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
        getState: () => CompositeAppState,
    ): Promise<void> => {
        const tokens = getState().comments.retractionTokens;
        const [showSuccess, showError] = getNotifications(dispatch);

        const onConfirmClick = async () => {
            const [_, onRequestCompleted] = registerHttpRequest(dispatch);

            try {
                const result = await batchRetract(tokens.map(({ id }) => id));

                dispatch(
                    batchRetractAction(
                        result.success
                            .map(({ tokenId }) => tokenId)
                            .concat(result.outdated.map(({ tokenId }) => tokenId))
                    )
                );

                if (result.success.length !== 0) {
                    showSuccess("Batch retraction completed successfully");
                }

                if (result.errors.length > 0) {
                    dispatch(
                        open({
                            modalType: ModalType.Info,
                            title: "Batch retraction errors",
                            message: `There was some errors during operation of batch retraction
                        \nPlease, contact system administrator
                        \n\n${result.errors
                                    .map(({ error }) => `- ${error}`)
                                    .join("\n")
                                }`,
                        })
                    );
                }
            } catch (error) {
                showError(error as string | Error, true);
            }

            onRequestCompleted();
        };

        dispatch(
            open({
                modalType: ModalType.Confirm,
                title: "Confirm batch retract",
                message: `Are you sure want to retract all ${tokens.length} tokens?`,
                callback: {
                    saveCallback: (): void => {
                        onConfirmClick();
                    },
                }
            })
        );
    };
