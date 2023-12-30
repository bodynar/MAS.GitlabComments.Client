import { SysVariable } from "@app/models/app";

import { get } from "@app/utils";

/**
 * Read all system variables
 * @returns Promise with all system variables
 */
export const loadSysVariables = async (): Promise<Array<SysVariable>> => {
    const variables = await get<Array<SysVariable>>(`api/app/getVariables`);

    return variables.map((x: any) => ({
        ...x,
        value: x["rawValue"]
    }));
};
