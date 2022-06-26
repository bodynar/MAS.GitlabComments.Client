import { ElementIcon } from "../types";

export type SimpleAnchorProps = {
    /** Link destination */
    href?: string;

    /** Class names */
    className: string;

    /** Click handler */
    onClick?: () => void;

    /** Link caption  */
    caption?: string;

    /** Title of anchor */
    title?: string;

    /** Where to open the linked document */
    target?: '_blank' | '_top';
};

export type AnchorWithIconProps = SimpleAnchorProps & {
    /** Configuration of icon */
    icon: ElementIcon;
};
