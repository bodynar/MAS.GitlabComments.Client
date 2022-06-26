import { ChangeEvent, useCallback } from 'react';

import { generateGuid } from '@bodynarf/utils/guid';
import { getClassName } from '@bodynarf/utils/component';

import { MultilineProps } from '../..';

/** Multiline textual input component without describing label*/
const MultilineWithoutLabel = (props: MultilineProps): JSX.Element => {
    const onValueChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => props.onValueChange(event.target.value),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.onValueChange]
    );

    const id = props.name || generateGuid();

    const size = `is-${(props.size || 'normal')}`;

    const className = getClassName([
        props.className,
        size,
        props.rounded === true ? 'is-rounded' : '',
        "textarea",
        props.fixed === true ? 'has-fixed-size': '',
    ]);

    const inputContainerClassName = getClassName([
        "control",
        props.loading === true ? 'is-loading' : '',
        (props.style || 'default') === 'default' ? '' : `is-${props.style}`
    ]);

    return (
        <div className="field">
            <div className={inputContainerClassName}>
                <textarea
                    className={className}
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                    onChange={onValueChange}
                    id={id}
                    name={id}
                    rows={props.rows}
                />
            </div>
        </div>
    );
};

export default MultilineWithoutLabel;
