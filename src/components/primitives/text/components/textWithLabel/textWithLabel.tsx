import { ChangeEvent, useCallback } from 'react';

import { getClassName } from '@app/utils/component';

import { TextProps } from '../..';

/** Textual input with describing label */
const TextWithLabel = (props: TextProps): JSX.Element => {
    const size = `is-${(props.size || 'normal')}`;

    const className = getClassName([
        props.className,
        size,
        props.rounded === true ? 'is-rounded' : '',
        "input",
    ]);

    const inputContainerClassName = getClassName([
        "control",
        props.loading === true ? 'is-loading' : '',
        (props.style || 'default') === 'default' ? '' : `is-${props.style}`
    ]);

    const onValueChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => props.onValueChange(event.target.value),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.onValueChange]
    );

    const label = props.label!;

    if (label.horizontal === true) {
        return (
            <div className="field is-horizontal">
                <div className={`field-label ${size}`}>
                    <label className="label">
                        {label.caption}
                    </label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className={inputContainerClassName}>
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
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="field">
            <label className={`label ${size}`}>
                {label.caption}
            </label>
            <div className={inputContainerClassName}>
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
        </div>
    );
};

export default TextWithLabel;
