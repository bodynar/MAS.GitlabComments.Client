import { DependencyList, useCallback, useEffect } from "react";

import { isNull, isNullOrUndefined } from "@bodynarf/utils/common";

/**
 * Subscribe to component outside click
 * @param selector Component root selector
 * @param clickHandleCondition Condition to handle document click
 * @param clickHandleChange Handler of outside component click
 * @param clickListenCondition Condition to start listening document clicks
 * @param dependencies Additional dependencies to update hook
 */
export const useComponentOutsideClick = (
    selector: string,
    clickHandleCondition: boolean,
    clickHandleChange: () => void,
    clickListenCondition?: boolean,
    dependencies?: DependencyList
): void => {
    const onDocumentClick = useCallback(
        (event: MouseEvent): void => {
            if (clickHandleCondition) {
                const target: HTMLElement = event.target as HTMLElement;

                if (isNullOrUndefined(target)) {
                    return;
                }

                const relatedComponent: Element | null =
                    target.closest(selector);

                if (isNull(relatedComponent)) {
                    clickHandleChange();
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [clickHandleCondition, selector, clickHandleChange, dependencies]);

    useEffect(() => {
        if (isNullOrUndefined(clickListenCondition) || clickListenCondition === true) {
            document.addEventListener('click', onDocumentClick);

            return (): void => document.removeEventListener('click', onDocumentClick);
        }

        return () => { };
    }, [clickListenCondition, onDocumentClick]);
};
