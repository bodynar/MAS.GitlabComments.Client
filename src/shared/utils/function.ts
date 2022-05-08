/**
 * Delay resolve of promise in specified amount of milliseconds
 * @param time Delay time in milliseconds
 * @returns Delayed resolved promise
 */
export const delay = <TResult>(time: number) => (result: TResult): Promise<TResult> => {
    return new Promise(resolve => setTimeout(() => resolve(result), time));
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

