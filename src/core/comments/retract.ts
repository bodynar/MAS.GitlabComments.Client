import { get, post } from "@app/utils";
import { BatchRetractResult, RetractionToken } from "@app/models/comments";

/**
 * Retract operation by token id
 * @param tokenId Identifier of retraction token
 * @returns Promise with no result
 */
export const retract = (tokenId: string): Promise<void> => {
    return post(`api/ret-tokens/retract`, tokenId);
};

/**
 * Retract operations by tokens ids
 * @param tokens Retraction tokens (identifiers)
 * @returns Promise with batch operation result
 */
export const batchRetract = (tokens: Array<string>): Promise<BatchRetractResult> => {
    return post<BatchRetractResult>(`api/ret-tokens/batchRetract`, tokens);
};

/**
 * Remove all expired tokens
 * @returns Promise with no result
 */
export const removeExpired = (): Promise<void> => {
    return post(`api/ret-tokens/removeExpired`);
};

/**
 * Get non-expired tokens
 * @returns Promise with array of active tokens
 */
export const getAllTokens = (): Promise<Array<RetractionToken>> => {
    return get<Array<RetractionToken>>(`api/ret-tokens/getAll`);
};
