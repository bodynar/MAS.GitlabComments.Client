import { ChangeEvent, useCallback } from 'react';

import { generateGuid } from '@bodynarf/utils/guid';
import { getClassName } from '@bodynarf/utils/component';

import { TextProps } from '../..';

/** Textual input without describing label */
const TextWithoutLabel = (props: TextProps): JSX.Element => {
    const onValueChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => props.onValueChange(event.target.value),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.onValueChange]
    );

    const className = getClassName([
        props.className,
        `is-${(props.size || 'normal')}`,
        props.rounded === true ? 'is-rounded' : '',
        "input",
    ]);

    const containerClassName = getClassName([
        "app-input",
        "control",
        props.loading === true ? 'is-loading' : '',
        (props.style || 'default') === 'default' ? '' : `is-${props.style}`
    ]);

    const id = props.name || generateGuid();

    return (
        <div className={containerClassName}>
            <input
                className={className}
                type="text"
                placeholder={props.placeholder}
                readOnly={props.readonly}
                disabled={props.disabled}
                defaultValue={props.defaultValue}
                onChange={onValueChange}
                name={id}
                id={id}
            />
        </div>
    );
};

export default TextWithoutLabel;
