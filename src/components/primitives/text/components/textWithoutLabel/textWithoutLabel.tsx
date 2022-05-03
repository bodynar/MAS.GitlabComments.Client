import { ChangeEvent, useCallback } from 'react';

import { getClassName } from '@app/utils/component';

import { TextProps } from '../..';

/** Textual input without describing label */
const TextWithoutLabel = (props: TextProps): JSX.Element => {
    const className = getClassName([
        props.className,
        `is-${(props.size || 'normal')}`,
        props.rounded === true ? 'is-rounded' : '',
        "input",
    ]);

    const containerClassName = getClassName([
        "control",
        props.loading === true ? 'is-loading' : '',
        (props.style || 'default') === 'default' ? '' : `is-${props.style}`
    ]);

    const onValueChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => props.onValueChange(event.target.value),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.onValueChange]
    );

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
            />
        </div>
    );
};

export default TextWithoutLabel;
