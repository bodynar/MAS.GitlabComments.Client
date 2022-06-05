import { isNullOrUndefined } from '@bodynarf/utils/common';

import { BaseInputElementProps } from '../types';

import TextWithLabel from './components/textWithLabel';
import TextWithoutLabel from './components/textWithoutLabel';

/** Text input conponent props type */
export type TextProps = BaseInputElementProps<string>;

/** Textual input component */
const Text = (props: TextProps): JSX.Element => {
    if (isNullOrUndefined(props.label)) {
        return (<TextWithoutLabel {...props}/>);
    }
    else {
        return (<TextWithLabel {...props}/>);
    }
};

export default Text;
