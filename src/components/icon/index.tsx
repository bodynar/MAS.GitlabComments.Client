import './icon.scss';

import { IconSize } from '../types';

/** Icon component props */
type IconProps = {
    /**
     * Class name for icon.
     * Used to display icon from bootstrap-icons
    */
    className: string;

    /** Icon size */
    size?: IconSize;
}

const sizeToClassMap: Map<IconSize, string> = new Map([
    ['small', ' app-icon--smal'],
    ['medium', ''],
    ['large', ' app-icon--large']
]);

/**
 * Icon component. Based on bootstrap icons
 */
export default function Icon(props: IconProps): JSX.Element {
    const size: IconSize = props.size || 'medium';

    const className = `app-icon bi bi-${props.className}${sizeToClassMap.get(size)}`;

    return (
        <i className={className}></i>
    );
}
