import './anchor.scss';
import './anchor.dark.scss';

import { isNullOrEmpty, isNullOrUndefined } from '@bodynarf/utils/common';

import { ElementIcon } from '../types';

import { SimpleAnchor } from './components/simpleAnchor/simpleAnchor';
import { AnchorWithIcon } from './components/anchorWithIcon/anchorWithIcon';

export type AnchorProps = {
    /** Link destination */
    href?: string;

    /** Link caption  */
    caption?: string;

    /** Click handler */
    onClick?: () => void;

    /** Configuration od inner icon */
    icon?: ElementIcon;

    /** Title of anchor */
    title?: string;

    /** Where to open the linked document */
    target?: '_blank' | '_top';

    /** Additional class names */
    className?: string;

    /** Should css hovering effects be disabled */
    disableHovering?: boolean;
};

/** Anchor component */
export default function Anchor(props: AnchorProps): JSX.Element {
    if (isNullOrUndefined(props.caption) && isNullOrUndefined(props.icon)) {
        throw new Error("No anchor content provided");
    }

    const className: string = 'app-anchor'
        + (!isNullOrEmpty(props.className) ? ` ${props.className}` : '')
        + (props.disableHovering === true ? ' app-anchor--unhoverable' : '');

    if (isNullOrUndefined(props.icon)) {
        return (
            <SimpleAnchor
                {...props}
                className={className}
                onClick={props.onClick}
            />
        );
    }

    return (
        <AnchorWithIcon
            {...props}
            className={className}
            onClick={props.onClick}
            icon={props.icon as ElementIcon}
        />
    );
}
