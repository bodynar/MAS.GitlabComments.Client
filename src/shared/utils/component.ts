import { isNullOrUndefined, isStringEmpty } from "./common";

/**
 * Build classname react element value from different values
 * @param partialNames Array of possible class names
 * @returns Classname attribute value
 */
export const getClassName = (partialNames: Array<string | undefined>): string => {
    return partialNames
        .filter(x => !isNullOrUndefined(x))
        .filter(x => !isStringEmpty(x!))
        .join(' ')
    ;
};
