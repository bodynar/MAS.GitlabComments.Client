import { isStringEmpty, isNullOrUndefined } from "./common";

/**
 * Check is key declared in object. Throws errors if not
 * @param object Object to check for property existence
 * @param propertyName Name of property
 * @throws Parameter object is not defined
 * @throws Parameter propertyName is not defined or empty string
 * @throws Specified key is not declared in object
 */
export const ensurePropertyDefined = <T>(object: T, propertyName: string): void => {
    if (isNullOrUndefined(object)) {
        throw new Error("Parameter \"object\" is not defined.")
    }
    if (isNullOrUndefined(propertyName) || isStringEmpty(propertyName)) {
        throw new Error("Parameter \"propertyName\" is not defined")
    }

    const isKeyDefined: boolean = Object.keys(object).includes(propertyName);

    if (!isKeyDefined) {
        throw new Error(`Key \"${propertyName}\" is not defined in object`);
    }
};