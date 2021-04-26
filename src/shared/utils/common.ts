/**
 * Check is value defined
 * @param value Value to check
 * @returns Flag determines that value is not defined
 */
export const isNullOrUndefined = <T>(value: T): boolean => {
    return isNull(value) || isUndefined(value);
};

/**
 * Check is value is null
 * @param value Value to check
 * @returns Flag determines that value is null
 */
export const isNull = <T>(value: T): boolean => {
    return value === null;
};

/**
 * Check is value undefined
 * @param value Value to check
 * @returns Flat determines that value is undefined
 */
export const isUndefined = <T>(value: T): boolean => {
    return value === undefined;
};

/**
 * Check is string is empty
 * @param value String to check
 * @returns Flag determines that string is empty
 */
export const isStringEmpty = (value: string): boolean => {
    return value.length === 0;
};

/**
 * Check is value is null or undefined or empty string
 * @param value Value to check
 * @returns Flag is passed value null or undefined or empty string
 */
export const isNullOrEmpty = (value?: string): boolean => {
    return isNullOrUndefined(value) || isStringEmpty(value as string);
};
