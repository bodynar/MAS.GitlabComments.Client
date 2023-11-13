import { useCallback } from "react";

import { getClassName, isNullOrUndefined } from "@bodynarf/utils";
import Icon from "@bodynarf/react.components/components/icon";

import { SortColumn } from "@app/models/app";

import { TableHeading } from "../../types";

/** Table heading cell component props */
interface TableHeaderProps<TItem> extends TableHeading<TItem> {
    /** Current sort column */
    sortColumn?: SortColumn<TItem>;

    /** Cell click handler */
    onClick?: (column: TableHeading<TItem>) => void;
}

/** Table heading cell */
function TableHeader<TItem>(props: TableHeaderProps<TItem>): JSX.Element {
    const { className, caption, name, sortable, sortColumn, onClick } = props;

    const isColumnSortable = sortable ?? false;

    const onHeaderClick = useCallback(
        () => {
            if (isColumnSortable && !isNullOrUndefined(onClick)) {
                onClick!(props);
            }
        },
        [onClick, props, isColumnSortable]
    );

    const containerClassName = getClassName([
        className,
        isColumnSortable ? "is-clickable" : "",
    ]);

    return (
        <th
            className={containerClassName}
            onClick={onHeaderClick}
        >
            <div>
                <span>{caption}</span>
                {isColumnSortable && sortColumn?.columnName === name! &&
                    <Icon
                        className="has-margin-left-025r"
                        name={`sort-alpha-down${sortColumn!.ascending ? "" : "-alt"}`}
                    />
                }
            </div>
        </th>
    );
}

export default TableHeader;
