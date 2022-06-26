import { useCallback, useMemo, useState } from 'react';

import moment from 'moment';

import { isNullOrUndefined } from '@bodynarf/utils/common';

import { SelectableItem } from '@app/sharedComponents/dropdown/types';
import Dropdown from '@app/sharedComponents/dropdown';
import Date from '@app/sharedComponents/date';
import Button from '@app/sharedComponents/button';

import { DateRange, StatsFilter } from '@app/redux/stats/types';

type StatsFiltersProps = {
    /** Current stats module filter */
    filter: StatsFilter;

    /** Save selected filter in app */
    setStatsFilter: (filter: StatsFilter) => void;

    /** Apply filters button click handler */
    onApplyFiltersClick: () => void;
};

const today = moment();

/** Stats module filter component */
const StatsFilters = ({ filter, setStatsFilter, onApplyFiltersClick }: StatsFiltersProps): JSX.Element => {
    const preSelected = filter.type === DateRange.None
        ? undefined
        : dateRangeOptionsMap.get(filter.type)
        ;

    const [filterRange, setRange] = useState<SelectableItem | undefined>(preSelected);
    const [isManualDateValid, setManualDateValid] = useState<boolean>(isDateValid(filter.leftDate, filter.rightDate));
    const [isFilterButtonDisabled, setFilterButtonDisabled] = useState<boolean>(isButtonDisabled(filter));

    const onRangeSelect = useCallback((selectedItem?: SelectableItem) => {
        setRange(selectedItem);

        setManualDateValid(true);

        const type = isNullOrUndefined(selectedItem)
            ? DateRange.None
            : DateRange[selectedItem!.displayValue as keyof typeof DateRange];

        setFilterButtonDisabled(isNullOrUndefined(selectedItem) || type === DateRange.Manual);
        setStatsFilter({ type });

    }, [setStatsFilter]);

    const onDateChange = useCallback(
        (key: keyof StatsFilter, value?: Date, leftDate?: Date, rightDate?: Date) => {
            setStatsFilter({
                ...filter,
                [key]: value
            });

            if (isNullOrUndefined(value)) {
                setFilterButtonDisabled(true);
                setManualDateValid(true);
                return;
            }

            if (isNullOrUndefined(rightDate)) {
                return;
            }

            const isValid = isDateValid(leftDate, rightDate);

            setManualDateValid(isValid);
            setFilterButtonDisabled(!isValid);
        }, [filter, setStatsFilter]);

    const onLeftDateChange = useCallback((value?: Date) => onDateChange('leftDate', value, value, filter.rightDate), [filter.rightDate, onDateChange]);
    const onRightDateChange = useCallback((value?: Date) => onDateChange('rightDate', value, filter.leftDate, value), [filter.leftDate, onDateChange]);

    const dateRange = useMemo(() => getDateRange(filterRange), [filterRange]);

    return (
        <div className="block">
            <div className="block is-flex is-align-content-center">
                <Dropdown
                    caption="Date range type"
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
            {filterRange?.value === DateRange.Manual &&
                <>
                    <div className="columns">
                        <div className="column">
                            <Date
                                onValueChange={onLeftDateChange}
                                defaultValue={filter?.leftDate}
                                label={{ caption: "From", horizontal: true }}
                            />
                        </div>
                        <div className="column">
                            <Date
                                onValueChange={onRightDateChange}
                                defaultValue={filter?.rightDate}
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

/** Map of date range options key - selectable item */
const dateRangeOptionsMap = new Map(
    Object.entries(DateRange)
        .splice(1)
        .map(([key, value], i) => [
            value,
            { id: i.toString(), displayValue: key, value: value } as SelectableItem
        ])
);

/** Array of date range options as dropdown items */
const dateRangeOptions = [...dateRangeOptionsMap.values()];

/**
 * Check first date less than second date
 * @param leftDate First date to compare
 * @param rightDate Second date to compare
 * @returns false if first date is greated than second date; otherwise - true
 */
const isDateValid = (leftDate?: Date, rightDate?: Date): boolean => {
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
const isButtonDisabled = (filter: StatsFilter): boolean => {
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
const getDateRange = (filterRange?: SelectableItem): string => {
    if (isNullOrUndefined(filterRange)) {
        return '';
    }

    const { value } = filterRange!;

    if (value == DateRange.Manual) {
        return '';
    }

    let period: moment.unitOfTime.DurationConstructor = 'month';

    switch (value) {
        case DateRange.Month:
            period = 'month';
            break;

        case DateRange.Week:
            period = 'week';
            break;

        case DateRange.Year:
            period = 'year';
            break;
    }

    const left = today.clone().add(-1, period);
    return `(${left.format("DD.MM.yyyy")} - ${today.format("DD.MM.yyyy")})`;
};
