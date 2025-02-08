import { FC, useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";

import { emptyFn, isNullOrUndefined } from "@bodynarf/utils";
import { ElementColor, SelectableItem } from "@bodynarf/react.components";
import Button from "@bodynarf/react.components/components/button/component";
import CheckBox from "@bodynarf/react.components/components/primitives/checkbox/component";
import Dropdown from "@bodynarf/react.components/components/dropdown";
import Icon from "@bodynarf/react.components/components/icon";
import Text from "@bodynarf/react.components/components/primitives/text";
import Multiline from "@bodynarf/react.components/components/primitives/multiline";

import { Comment } from "@app/models/comments";
import { CompositeAppState } from "@app/redux";
import { mergeAsync } from "@app/redux/comments";

import "./style.scss";

/** Storage for target comment values */
const targetValueMap = new Map<keyof Comment, string>();

/** Props of `MergeCommentsComponent` */
type MergeCommentsComponentProps = {
    /** Available comments */
    comments: Array<Comment>;

    /**
     * Merge two comments
     * @param sourceId Identifier of source comment
     * @param targetId Identifier of target comment
     * @param valuesToUpdate Map with updated values
     */
    merge: (sourceId: string, targetId: string, valuesToUpdate: Map<keyof Comment, string>) => Promise<void>;
};

/** Merge two comments component */
const MergeCommentsComponent: FC<MergeCommentsComponentProps> = ({
    comments, merge,
}) => {
    const commentDropDownItems = useMemo(() =>
        comments.map(({ id, number, message, commentWithLinkToRule, appearanceCount }) => ({
            id,
            value: id,
            displayValue: `[${number}] ${appearanceCount} - ${message}`,
            title: commentWithLinkToRule ?? message,
        } as SelectableItem)),
        [comments]
    );

    const [selectedSourceComment, setSourceComment] = useState<SelectableItem | undefined>(undefined);
    const [selectedTargetComment, setTargetComment] = useState<SelectableItem | undefined>(undefined);
    const [updateTargetValues, setUpdateTargetValues] = useState<boolean | undefined>(false);

    const sourceComment = useMemo(() => {
        if (selectedSourceComment === undefined) {
            return undefined;
        }

        return comments.find(({ id }) => id === selectedSourceComment.id);
    }, [comments, selectedSourceComment]);

    const targetComment = useMemo(() => {
        if (selectedTargetComment === undefined) {
            return undefined;
        }

        return comments.find(({ id }) => id === selectedTargetComment.id);
    }, [comments, selectedTargetComment]);

    const onMergeClick = useCallback(async () => {
        if (selectedTargetComment === undefined
            || selectedSourceComment === undefined
            || targetComment === undefined
        ) {
            return;
        }

        const map = new Map<keyof Comment, string>(
            Array.from(targetValueMap.entries())
                .filter(([key, value]) => targetComment[key] !== value)
        );

        await merge(
            selectedSourceComment!.id,
            selectedTargetComment!.id,
            map
        );

        targetValueMap.clear();
        setSourceComment(undefined);
        setTargetComment(undefined);
    }, [merge, selectedSourceComment, selectedTargetComment, targetComment]);

    const onTargetCommentSelect = useCallback(
        (value?: SelectableItem) => {
            setTargetComment(value);

            if (isNullOrUndefined(value)) {
                targetValueMap.clear();
                return;
            }

            const comment = comments.find(({ id }) => id === value!.id);

            targetValueMap.set("message", comment!.message);
            targetValueMap.set("commentWithLinkToRule", comment!.commentWithLinkToRule);
            targetValueMap.set("description", comment!.description ?? "");
        }, [comments]
    );

    const onTargetMessageUpdate = useCallback(
        (value?: string) => targetValueMap.set("message", value ?? ""),
        []
    );

    const onTargetLinkToRuleUpdate = useCallback(
        (value?: string) => targetValueMap.set("commentWithLinkToRule", value ?? ""),
        []
    );

    const onTargetDescriptionUpdate = useCallback(
        (value?: string) => targetValueMap.set("description", value ?? ""),
        []
    );

    const sourceComments = isNullOrUndefined(selectedTargetComment)
        ? commentDropDownItems
        : commentDropDownItems.filter(({ id }) => id !== selectedTargetComment!.id);

    const targetComments = isNullOrUndefined(selectedSourceComment)
        ? commentDropDownItems
        : commentDropDownItems.filter(({ id }) => id !== selectedSourceComment!.id);

    return (
        <div className="">
            <div className="mb-6 box">
                <p>
                    <Icon name="question-circle" className="mr-2" />
                    <strong>Source comment</strong> comment will be deleted.<br />
                    <strong>Target comment</strong> will be updated: <code>TargetComment.AppearanceCount += SourceComment.AppearanceCount</code>.<br />
                    <span className="is-italic">Other fields can be updated manually via checking &quot;Update target comment values&quot; checkbox</span><br />
                    <span className="is-italic">Comments displayed in format &quot;[&#123;number&#125;] &#123;appearance count&#125; - &#123;message&#125;&quot;</span>
                </p>
            </div>
            <div className="block">
                <Dropdown
                    deselectable
                    hideOnOuterClick
                    items={sourceComments}
                    value={selectedSourceComment}
                    onSelect={setSourceComment}
                    placeholder="Select source comment"
                    label={{ caption: "Source comment", horizontal: true }}
                />
                <Dropdown
                    deselectable
                    hideOnOuterClick
                    items={targetComments}
                    value={selectedTargetComment}
                    onSelect={onTargetCommentSelect}
                    placeholder="Select target comment"
                    label={{ caption: "Target comment", horizontal: true }}
                />
            </div>
            <div className="block">
                <CheckBox
                    isFormLabel
                    hasBackgroundColor
                    fixBackgroundColor
                    style={ElementColor.Link}
                    defaultValue={updateTargetValues}
                    onValueChange={setUpdateTargetValues}
                    label={{ caption: "Update target comment values", horizontal: true }}
                    disabled={isNullOrUndefined(sourceComment) || isNullOrUndefined(targetComment)}
                />
            </div>
            {updateTargetValues
                && !isNullOrUndefined(sourceComment)
                && !isNullOrUndefined(targetComment)
                &&
                <div
                    className="block"
                    key={sourceComment?.id?.concat(targetComment?.id ?? "")}
                >
                    <TargetValueUpdater
                        caption="message"
                        sourceValue={sourceComment!.message}
                        onValueChange={onTargetMessageUpdate}
                        defaultValue={targetValueMap.get("message")!}
                    />
                    <TargetValueUpdater
                        caption="link to rule"
                        onValueChange={onTargetLinkToRuleUpdate}
                        sourceValue={sourceComment!.commentWithLinkToRule}
                        defaultValue={targetValueMap.get("commentWithLinkToRule")!}
                    />
                    <TargetValueUpdater
                        multiline
                        caption="description"
                        onValueChange={onTargetDescriptionUpdate}
                        sourceValue={sourceComment!.description ?? ""}
                        defaultValue={targetValueMap.get("description")!}
                    />
                </div>
            }
            <div className="block">
                <Button
                    type="primary"
                    caption="Merge"
                    onClick={onMergeClick}
                    disabled={isNullOrUndefined(sourceComment) || isNullOrUndefined(targetComment)}
                />
            </div>
        </div>
    );
};

export default connect(
    ({ comments }: CompositeAppState) => ({ comments: comments.comments, }),
    { merge: mergeAsync }
)(MergeCommentsComponent);

/** Props of `TargetTextValueUpdater` */
type TargetValueUpdaterProps = {
    /** Target comment field value */
    defaultValue: string;

    /** Source comment field value */
    sourceValue: string;

    /** Field caption */
    caption: string;

    /** Is text field multiline */
    multiline?: boolean;

    /**
     * Handle target comment field value change
     * @param value New value
     */
    onValueChange: (value?: string) => void;
};

/** Field update for target comment */
const TargetValueUpdater: FC<TargetValueUpdaterProps> = (props) => {
    if (props.multiline ?? false) {
        return <TargetMultilineValueUpdater {...props} />;
    }

    return <TargetTextValueUpdater {...props} />;
};

/** Text field update for target comment */
const TargetTextValueUpdater: FC<TargetValueUpdaterProps> = ({
    defaultValue, caption, sourceValue,
    onValueChange,
}) => {
    return (
        <div className="block mt-6">
            <Text
                disabled
                onValueChange={emptyFn}
                defaultValue={sourceValue}
                label={{ caption: `Source ${caption}`, horizontal: true }}
            />
            <Text
                defaultValue={defaultValue}
                onValueChange={onValueChange}
                label={{ caption: `Target ${caption}`, horizontal: true }}
            />
        </div>
    );
};

/** Multiline text field update for target comment */
const TargetMultilineValueUpdater: FC<TargetValueUpdaterProps> = ({
    defaultValue, caption, sourceValue,
    onValueChange,
}) => {
    return (
        <div className="block mt-6">
            <Multiline
                disabled
                onValueChange={emptyFn}
                defaultValue={sourceValue}
                label={{ caption: `Source ${caption}`, horizontal: true }}
            />
            <Multiline
                defaultValue={defaultValue}
                onValueChange={onValueChange}
                label={{ caption: `Target ${caption}`, horizontal: true }}
            />
        </div>
    );
};
