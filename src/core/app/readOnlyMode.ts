import { get } from "@app/utils";

/**
 * Get readonly mode application state
 * @returns Promise with boolean value
 */
export const getFlag = (): Promise<boolean> => {
    return get<boolean>(`/api/app/getIsReadOnly`);
};
