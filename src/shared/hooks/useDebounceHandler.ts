import { useCallback, useState } from "react";

import { isNullOrUndefined } from "@bodynarf/utils";

/**
 * Get debounced handler
 * @param handler Action to handle
 * @param debounceTime Amount of seconds to stay inactive
 * @returns Pair: current state, is in debounce state; handler with debounce
 */
export const useDebounceHandler = (
    handler: () => Promise<void>,
    debounceTime: number
): [boolean, () => void] => {
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

    const debounceHandler = useCallback(() => {
        handler()
            .then(() => {
                setDebounceTimer(
                    setTimeout(() => {
                        clearTimeout(debounceTimer!);
                        setDebounceTimer(undefined);
                    }, debounceTime * 1000)
                );
            });
    }, [handler, debounceTime, debounceTimer]);

    return [isNullOrUndefined(debounceTimer), debounceHandler];
};
