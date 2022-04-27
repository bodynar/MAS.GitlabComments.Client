import { MouseEvent, useCallback, useId, useState } from 'react';

import './dropdown.scss';
import './dropdown.dark.scss';

import { isNullOrEmpty, isNullOrUndefined } from '@app/utils/common';

import { useComponentOutsideClick } from '@app/hooks/useComponentOutsideClick';

import { SelectableItem } from './types';
import { BaseElementProps } from '../type';

import DropdownItem from './components/dropdownItem/dropdownItem';
import DropdownLabel from './components/dropdownLabel/dropdownLabel';

interface DropdownProps extends BaseElementProps {
    /** Items which can be selected */
    items: Array<SelectableItem>;

    /**
     * Selected value.
     * Must be stored outside
    */
    value?: SelectableItem;

    /**
     * Action to update selected value,
     *  which stored outside
     */
    onSelect: (item?: SelectableItem) => void;

    /** 
     * Caption.
     * Appears only no element selected
     */
    caption: string;

    /** Hide dropdown list when its opened and user click outside */
    hideOnOuterClick: boolean;

    /** Can user deselect */
    deselectable?: boolean;
}

/** Dropdown component */
const Dropdown = ({ value, items, onSelect, caption, deselectable, className, hideOnOuterClick }: DropdownProps): JSX.Element => {
    const id = useId();

    const [isListVisible, setListVisible] = useState<boolean>(false);

    const onItemClick = useCallback(
        (event: React.MouseEvent<HTMLLIElement>) => {
            const target = event.target as HTMLLIElement;

            if (isNullOrUndefined(target)) {
                return;
            }

            const dataValue = target.dataset['dropdownItemValue'];

            if (isNullOrEmpty(dataValue)) {
                return;
            }

            const item = items.find(x => x.value === dataValue);

            if (isNullOrUndefined(item)) {
                return;
            }

            if (value === item) {
                return;
            }

            onSelect(item);
            setListVisible(false);
        }, [setListVisible, value, items, onSelect]);

    const onLabelClick = useCallback(
        (event: MouseEvent<HTMLLabelElement>): void => {
            const target = event.target as HTMLElement;

            if (isNullOrUndefined(target)) {
                return;
            }

            if (target.classList.contains("bi-plus-lg")) {
                onSelect(undefined);
            } else {
                setListVisible(state => !state);
            }
        }, [onSelect, setListVisible]);

    useComponentOutsideClick(
        `[data-dropdown-id="${id}"]`, isListVisible,
        () => setListVisible(false),
        hideOnOuterClick,
    );

    const classNames: string = [
        "app-dropdown",
        isListVisible ? "is-active" : "",
        className,
        "dropdown"
    ]
        .filter(x => !isNullOrEmpty(x))
        .join(" ");

    return (
        <div
            key={id}
            className={classNames}
            data-dropdown-id={id}
        >
            <DropdownLabel
                caption={caption}
                deselectable={deselectable === true}
                selectedItem={value}
                onClick={onLabelClick}
            />
            <div className="dropdown-menu">
                {items.length > 0
                    ? <ul className="dropdown-content">
                        {items.map(item =>
                            <DropdownItem
                                key={item.id}
                                item={item}
                                selected={value?.value === item.value}
                                onClick={onItemClick}
                            />
                        )}
                    </ul>
                    : <span className="dropdown-content dropdown-item">No items found</span>
                }
            </div>
        </div>
    );
};

export default Dropdown;

