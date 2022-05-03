import './text.scss';
import './text.dark.scss';

import { isNullOrUndefined } from '@app/utils/common';

import { BaseInputElementProps } from '../types';

import TextWithLabel from './components/textWithLabel/textWithLabel';
import TextWithoutLabel from './components/textWithoutLabel/textWithoutLabel';

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
