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

/**
 * Get property value from object with defined check
 * @param object Object to check for property existence
 * @param propertyName Name of property
 * @param throwOnUndefined Flag determines that function should throw error when value is not defined
 * @returns Value stored by specified property in object
 * @throws Parameter object is not defined
 * @throws Parameter propertyName is not defined or empty string
 * @throws Specified key is not declared in object
 * @throws Property is undefined or cannot be used as requested type if flag throwOnUndefined is set to true
 */
export const getPropertyValueWithCheck = <TResult>(object: Record<string, unknown>, propertyName: string, throwOnUndefined = true): TResult => {
    ensurePropertyDefined(object, propertyName);

    const value: TResult = object[propertyName] as TResult;

    if (throwOnUndefined && isNullOrUndefined(value)) {
        throw new Error(`Property \"${propertyName}\" is not defined as requested type in object.`);
    }

    return value;
};
