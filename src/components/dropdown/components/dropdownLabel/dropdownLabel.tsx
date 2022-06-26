import { MouseEvent } from 'react';

import { isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils/common";

import Icon from '@app/sharedComponents/icon';

import { SelectableItem } from "../../types";

interface DropdownLabelProps {
    /** Caption when no items selected */
    caption: string;

    /** Can user deselect */
    deselectable: boolean;

    /** Selected item */
    selectedItem?: SelectableItem;

    /** Click handler*/
    onClick: (event: MouseEvent<HTMLLabelElement>) => void;
}

/** Label component */
const DropdownLabel = ({ caption, selectedItem, onClick, deselectable }: DropdownLabelProps): JSX.Element => {
    const itemSelected = !isNullOrUndefined(selectedItem);

    const text = itemSelected
        ? selectedItem?.displayValue
        : caption;

    const deselectVisible = deselectable && itemSelected;

    const className = [
        "dropdown-trigger",
        "app-dropdown__label",
        itemSelected ? "" : "app-dropdown__label--default",
        "button"
    ].filter(x => !isNullOrEmpty(x))
        .join(" ");

    return (
        <label
            className={className}
            onClick={onClick}
        >
            {deselectVisible &&
                <Icon className="plus-lg" />
            }
            <span
                className={deselectVisible ? "mx-2" : "mr-2"}
                title={itemSelected ? text : undefined}
            >
                {text}
            </span>
            <Icon className="arrow-up" />
        </label>
    );
};

export default DropdownLabel;
