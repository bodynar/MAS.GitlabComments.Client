import { FC, useCallback, useMemo, useState } from "react";

import { isNullish, Optional } from "@bodynarf/utils";

import { SelectableItem } from "@bodynarf/react.components";
import Dropdown from "@bodynarf/react.components/components/dropdown";
import Date from "@bodynarf/react.components/components/primitives/date";
import Button from "@bodynarf/react.components/components/button";

import { DateRange, StatsFilter } from "@app/models/stats";
import { getDates } from "@app/core/stats";

/** Map of date range options key - selectable item */
const dateRangeOptionsMap = new Map(
    Object.entries(DateRange)
        .splice(1)
        .map(([key, value], i) => [
            value,
            {
                id: i.toString(),
                displayValue: value,
                value: key
            } as SelectableItem
        ])
);

/** Array of date range options as dropdown items */
const dateRangeOptions = [...dateRangeOptionsMap.values()];

const dateRangeKeyToValueMap = new Map(
    Array.from(dateRangeOptionsMap.values())
        .map((x: SelectableItem) => [x.value, x])
);

type StatsFiltersProps = {
    /** Current stats module filter */
    filter: StatsFilter;

    /** Is stats data loaded */
    loaded?: boolean;

    /** Save selected filter in app */
    setStatsFilter: (filter: StatsFilter) => void;

    /** Apply filters button click handler */
    onApplyFiltersClick: () => void;

    /** Set is stats data loaded */
    setIsLoaded: (loaded?: boolean) => void;
};

/** Stats module filter component */
const StatsFilters: FC<StatsFiltersProps> = ({
    filter,
    loaded = false,
    setStatsFilter,
    onApplyFiltersClick,
    setIsLoaded
}) => {
    const preSelected = filter.type === DateRange.None
        ? undefined
        : dateRangeOptionsMap.get(filter.type)
        ;

    const [filterRange, setRange] = useState<Optional<SelectableItem>>(preSelected);
    const [isManualDateValid, setManualDateValid] = useState<boolean>(
        isDateValid(filter.leftDate, filter.rightDate)
    );
    const [isFilterButtonDisabled, setFilterButtonDisabled] = useState<boolean>(
        isButtonDisabled(filter)
    );

    const onRangeSelect = useCallback((selectedItem?: SelectableItem) => {
        setRange(selectedItem);

        if (loaded) {
            setIsLoaded(undefined);
        }

        setManualDateValid(true);

        const type = isNullish(selectedItem)
            ? DateRange.None
            : selectedItem.displayValue as DateRange;

        setFilterButtonDisabled(
            isNullish(selectedItem) || type === DateRange.Manual
        );
        setStatsFilter({ type });
    }, [setStatsFilter, setIsLoaded, loaded]);

    const onDateChange = useCallback(
        (key: keyof StatsFilter, value?: Date, leftDate?: Date, rightDate?: Date) => {
            setStatsFilter({
                ...filter,
                [key]: value
            });

            if (loaded === true) {
                setIsLoaded(undefined);
            }

            if (isNullish(value)) {
                setFilterButtonDisabled(true);
                setManualDateValid(true);
                return;
            }

            if (isNullish(rightDate)) {
                return;
            }

            const isValid = isDateValid(leftDate, rightDate);

            setManualDateValid(isValid);
            setFilterButtonDisabled(!isValid);
        }, [setStatsFilter, filter, loaded, setIsLoaded]);

    const onLeftDateChange = useCallback((value?: Date) => onDateChange("leftDate", value, value, filter.rightDate), [filter.rightDate, onDateChange]);
    const onRightDateChange = useCallback((value?: Date) => onDateChange("rightDate", value, filter.leftDate, value), [filter.leftDate, onDateChange]);

    const dateRange = useMemo(() => getDateRange(filterRange), [filterRange]);

    return (
        <div className="block">
            <div className="block is-flex is-align-items-center">
                <Dropdown
                    placeholder="Date range type"
                    hideOnOuterClick={true}
                    deselectable={true}
                    items={dateRangeOptions}
                    onSelect={onRangeSelect}
                    value={filterRange}
                />
                <span className="ml-4">
                    {dateRange}
                </span>
            </div>
            {filterRange?.displayValue === DateRange.Manual &&
                <>
                    <div className="columns">
                        <div className="column">
                            <Date
                                onValueChange={onLeftDateChange}
                                defaultValue={filter.leftDate}
                                label={{ caption: "From", horizontal: true }}
                            />
                        </div>
                        <div className="column">
                            <Date
                                onValueChange={onRightDateChange}
                                defaultValue={filter.rightDate}
                                label={{ caption: "To", horizontal: true }}
                            />
                        </div>
                    </div>
                    {!isManualDateValid &&
                        <div className="notification is-danger is-light">
                            From date must be lower than To date
                        </div>
                    }
                </>
            }
            <Button
                type="success"
                caption="Show stats"
                onClick={onApplyFiltersClick}
                disabled={isFilterButtonDisabled}
            />
        </div>
    );
};

export default StatsFilters;

/**
 * Check first date less than second date
 * @param leftDate First date to compare
 * @param rightDate Second date to compare
 * @returns false if first date is greater than second date; otherwise - true
 */
const isDateValid = (leftDate?: Date, rightDate?: Date): boolean => {
    if (isNullish(leftDate) || isNullish(rightDate)) {
        return true;
    }

    return leftDate!.getTime() < rightDate!.getTime();
};

/**
 * Check accessibility for "Apply filters" button
 * @param filter Stats module current filter
 * @returns true if "Apply filters" button should be disabled; otherwise - true
 */
const isButtonDisabled = (filter: StatsFilter): boolean => {
    if (filter.type === DateRange.None) {
        return true;
    }

    if (filter.type === DateRange.Manual) {
        if (isNullish(filter.leftDate) || isNullish(filter.rightDate)) {
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
const getDateRange = (filterRange?: SelectableItem): string => {
    if (isNullish(filterRange)) {
        return "";
    }

    const { value } = filterRange!;

    const enumValue = dateRangeKeyToValueMap.get(value)!.displayValue as DateRange;

    if (enumValue == DateRange.Manual) {
        return "";
    }

    const [leftDate, rightDate] = getDates(enumValue);

    return `(${leftDate.format("DD.MM.yyyy")} - ${rightDate.format("DD.MM.yyyy")})`;
};
