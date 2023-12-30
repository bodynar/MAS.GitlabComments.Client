import { useCallback, useMemo, useState } from "react";

import { isNullOrUndefined } from "@bodynarf/utils";

import { SelectableItem } from "@bodynarf/react.components";
import Dropdown from "@bodynarf/react.components/components/dropdown";
import Date from "@bodynarf/react.components/components/primitives/date";
import Button from "@bodynarf/react.components/components/button";

import { DateRange, StatsFilter } from "@app/models/stats";

import { dateRangeOptions, dateRangeOptionsMap, getDateRange, isButtonDisabled, isDateValid } from "@app/core/stats";

interface StatsFiltersProps {
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
}

/** Stats module filter component */
const StatsFilters = ({ filter, loaded, setStatsFilter, onApplyFiltersClick, setIsLoaded }: StatsFiltersProps): JSX.Element => {
    const preSelected = filter.type === DateRange.None
        ? undefined
        : dateRangeOptionsMap.get(filter.type)
        ;

    const [filterRange, setRange] = useState<SelectableItem | undefined>(preSelected);
    const [isManualDateValid, setManualDateValid] = useState<boolean>(isDateValid(filter.leftDate, filter.rightDate));
    const [isFilterButtonDisabled, setFilterButtonDisabled] = useState<boolean>(isButtonDisabled(filter));

    const onRangeSelect = useCallback((selectedItem?: SelectableItem) => {
        setRange(selectedItem);

        if (loaded === true) {
            setIsLoaded(undefined);
        }

        setManualDateValid(true);

        const type = isNullOrUndefined(selectedItem)
            ? DateRange.None
            : DateRange[selectedItem!.displayValue as keyof typeof DateRange];

        setFilterButtonDisabled(isNullOrUndefined(selectedItem) || type === DateRange.Manual);
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
            {filterRange?.value === DateRange.Manual &&
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
