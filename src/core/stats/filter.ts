import moment from "moment";

import { SelectableItem } from "@bodynarf/react.components";

import { DateRange, StatsFilter } from "@app/models/stats";
import { isNullOrUndefined } from "@bodynarf/utils";

const today = moment();

/** Map of date range options key - selectable item */
export const dateRangeOptionsMap = new Map(
    Object.entries(DateRange)
        .splice(1)
        .map(([key, value], i) => [
            value,
            { id: i.toString(), displayValue: key, value: value } as SelectableItem
        ])
);

/** Array of date range options as dropdown items */
export const dateRangeOptions = [...dateRangeOptionsMap.values()];

/**
 * Check first date less than second date
 * @param leftDate First date to compare
 * @param rightDate Second date to compare
 * @returns false if first date is greater than second date; otherwise - true
 */
export const isDateValid = (leftDate?: Date, rightDate?: Date): boolean => {
    if (isNullOrUndefined(leftDate) || isNullOrUndefined(rightDate)) {
        return true;
    }

    return leftDate!.getTime() < rightDate!.getTime();
};

/**
 * Check accessibility for "Apply filters" button
 * @param filter Stats module current filter
 * @returns true if "Apply filters" button should be disabled; otherwise - true
 */
export const isButtonDisabled = (filter: StatsFilter): boolean => {
    if (filter.type === DateRange.None) {
        return true;
    }

    if (filter.type === DateRange.Manual) {
        if (isNullOrUndefined(filter.leftDate) || isNullOrUndefined(filter.rightDate)) {
            return true;
        }

        return !isDateValid(filter.leftDate, filter.rightDate);
    }

    return false;
};

/**
 * Get formatted date range string
 * @param filterRange Selected date range
 * @returns Formatted date range string
 */
export const getDateRange = (filterRange?: SelectableItem): string => {
    if (isNullOrUndefined(filterRange)) {
        return "";
    }

    const { value } = filterRange!;

    if (value == DateRange.Manual) {
        return "";
    }

    let period: moment.unitOfTime.DurationConstructor = "month";

    switch (value) {
        case DateRange.Month:
            period = "month";
            break;

        case DateRange.Week:
            period = "week";
            break;

        case DateRange.Year:
            period = "year";
            break;
    }

    const left = today.clone().add(-1, period);
    return `(${left.format("DD.MM.yyyy")} - ${today.format("DD.MM.yyyy")})`;
};
