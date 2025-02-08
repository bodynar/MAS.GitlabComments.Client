/**
 * @enum
 * Type of selected date range to filter records
*/
export enum DateRange {
    None = "",

    /** Previous week */
    PreviousWeek = "Previous week",

    /** Previous month */
    PreviousMonth = "Previous month",

    /** Previous year */
    PreviousYear = "Previous year",

    /** Current week */
    CurrentWeek = "Current week",

    /** Current month */
    CurrentMonth = "Current month",

    /** Current year */
    CurrentYear = "Current year",

    /** Manual date selecting */
    Manual = "Custom",
}
