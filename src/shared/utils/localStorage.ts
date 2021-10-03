import { isNullOrEmpty, isStringEmpty } from "./string";

/** shortcut to local storage */
const storage: Storage = window.localStorage;

/**
 * Get flag of existance record in storage
 * @param key Unique record key
 * @returns Flag representing existance of record
 */
export const hasRecord = (key: string): boolean => {
    if (isStringEmpty(key)) {
        return false;
    }

    const record = storage.getItem(key);

    return !isNullOrEmpty(record);
};

/**
 * Get stored data
 * @param key Unique record key
 * @returns Undefined if record does not exist in storage; otherwise saved value
 */
export const getRecord = <TValue>(key: string): TValue | undefined => {
    if (isStringEmpty(key)) {
        return undefined;
    }

    const record = storage.getItem(key);

    if (isNullOrEmpty(record)) {
        return undefined;
    }

    return JSON.parse(record as string) as TValue;
};

/**
 * Store data in local storage
 * @param key Unique record key
 * @param value Some data to store
 */
export const saveRecord = <TValue>(key: string, value: TValue): void => {
    if (isStringEmpty(key)) {
        return;
    }

    const record = JSON.stringify(value);

    storage.setItem(key, record);
};
