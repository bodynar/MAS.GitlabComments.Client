/**
 * @enum
 * Type of selected date range to filter records
*/
export enum DateRange {
    None = "",

    /** Last week */
    Week = "Last week",

    /** Last month */
    Month = "Last month",

    /** Last year */
    Year = "Last year",

    /** Manual date selecting */
    Manual = "Custom",
}
