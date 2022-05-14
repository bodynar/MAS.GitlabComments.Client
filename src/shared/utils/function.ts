/**
 * Delay resolve of promise in specified amount of milliseconds
 * @param time Delay time in milliseconds
 * @param result Promise result
 * @returns Delayed resolved promise
 */
export const delayResolve = <TResult>(time: number, result: TResult): Promise<TResult> => {
    return new Promise(resolve => setTimeout(() => resolve(result), time));
};

/**
 * Delay reject of promise in specified amount of milliseconds
 * @param time Delay time in milliseconds
 * @param error Promise error
 * @returns Delayed rejected promise
 */
export const delayReject = <TResult>(time: number, error: string): Promise<TResult> => {
    return new Promise<TResult>((_, reject) => setTimeout(() => reject(error), time));
};

/**
 * Perform action after some delay specified in milliseconds
 * @param time Delay time in milliseconds
 * @param action Action to perform after delay
 */
export const withDelay = (time: number, action: Function): undefined => {
    setTimeout(action, time);
    return undefined;
};

