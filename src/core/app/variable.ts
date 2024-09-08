import { SysVariable } from "@app/models/app";

import { get, post } from "@app/utils";

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

/**
 * Perform an operation with specific system variable
 * @param variableCode System variable code
 */
export const performVariableAction = async (variableCode: string): Promise<void> => {
    await post(`api/app/executeOnVariable`, variableCode);
};
