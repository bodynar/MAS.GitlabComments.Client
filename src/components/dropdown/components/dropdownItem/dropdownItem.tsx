import { SelectableItem } from "../../types";

/** Dropdown item props */
interface DropdownItemProps {
    /** Item to present in dropdown */
    item: SelectableItem;

    /** Is item selected*/
    selected: boolean;

    /** Item click handler */
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}

/** Single item in dropdown component */
const DropdownItem = ({ item, selected, onClick }: DropdownItemProps): JSX.Element => {
    return (
        <li
            key={item.id}
            className={`app-dropdown-item dropdown-item${selected ? " is-active" : ""}`}
            onClick={onClick}
            data-dropdown-item-value={item.value}
            title={item.displayValue}
        >
            {item.displayValue}
        </li>
    );
};

export default DropdownItem;
