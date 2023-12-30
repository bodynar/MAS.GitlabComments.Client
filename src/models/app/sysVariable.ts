/** System variable display model */
export interface SysVariable {
    /** Unique identifier */
    id: string;

    /** Date of last update */
    modifiedOn: Date;

    /** Unique code */
    code: string;

    /** Readable caption */
    caption: string;

    /** Data value type*/
    type: string;

    /** Raw value */
    value: string;
}
