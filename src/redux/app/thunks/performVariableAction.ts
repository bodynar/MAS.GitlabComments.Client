import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullish } from "@bodynarf/utils";

import { loadSysVariables, performVariableAction } from "@app/core/app";
import { ModalType } from "@app/models/modal";

import { CompositeAppState } from "@app/redux";
import { registerHttpRequest, setVariables } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";
import { open } from "@app/redux/modal";

/**
 * Perform an action with system variable
 * @param variableCode System variable code
 * @returns Function that can be called with redux dispatcher
 */
export const performVariableActionAsync = (variableCode: string): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
        getState: () => CompositeAppState,
    ): Promise<void> => {
        const storedVars = getState().app.variables;
        const concreteVariable = storedVars.find(({ code }) => variableCode === code);

        const [showSuccess, showError] = getNotifications(dispatch);

        if (isNullish(concreteVariable)) {
            showError(`Variable with code "${variableCode}" not found. Please, contact system administrator.`);
            return;
        }

        const onConfirmClick = async () => {
            const [_, onRequestCompleted] = registerHttpRequest(dispatch);

            try {

                await performVariableAction(variableCode);

                const variables = await loadSysVariables();

                dispatch(setVariables(variables));
                showSuccess(`Action "${concreteVariable.actionCaption}" has been successfully performed with system variable "${variableCode}"`, false);
            } catch (error) {
                showError(error as Error | string, true);
            }

            onRequestCompleted();
        };

        dispatch(
            open({
                modalType: ModalType.Confirm,
                title: "Confirm performing action",
                message: `Are you sure want to perform action "${concreteVariable.actionCaption}" with variable "${variableCode}"?`,
                callback: {
                    saveCallback: (): void => {
                        onConfirmClick();
                    },
                }
            })
        );
    };
