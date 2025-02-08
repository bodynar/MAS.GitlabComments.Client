import { FC, useCallback, useEffect } from "react";
import { connect } from "react-redux";

import moment from "moment";

import { isNullish } from "@bodynarf/utils";
import { ElementSize } from "@bodynarf/react.components";
import Button from "@bodynarf/react.components/components/button/component";
import Table from "@bodynarf/react.components/components/table/component";

import { SysVariable } from "@app/models/app";

import { loadSysVariablesAsync, performVariableActionAsync } from "@app/redux/app";
import { CompositeAppState } from "@app/redux/types";

import "./style.scss";

/** Table header row captions */
const tableHeadings = [
    "Position", "Caption",
    "System code", "Data type",
    "Current value", "Last updated on",
    "Action",
].map(caption => ({ caption, sortable: false }));

/** System variables list component props */
type VariablesListProps = {
    /** System variables */
    variables: Array<SysVariable>;

    /** Load system variables */
    loadSysVariables: () => void;

    /**
     * Perform an action with system variable
     * @param variableCode System variable code
     */
    performAction: (variableCode: string) => void;
};

/** System variables list */
const VariablesList: FC<VariablesListProps> = ({
    variables,
    loadSysVariables, performAction,
}) => {
    useEffect(() => {
        if (variables.length === 0) {
            loadSysVariables();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onReloadClick = useCallback(() => loadSysVariables(), [loadSysVariables]);
    const onActionClick = useCallback((variableCode: string) => performAction(variableCode), [performAction]);

    return (
        <section>
            <Button
                type="ghost"
                caption="Reload"
                onClick={onReloadClick}
                size={ElementSize.Small}
                icon={{ name: "arrow-clockwise" }}
            />
            {variables.length > 0 &&
                <Table
                    zebra
                    fullWidth
                    headerBorderless
                    className="mt-2"
                    headings={tableHeadings}
                >
                    {variables.map((x, i) =>
                        <VariableRow
                            key={x.code}
                            item={x}
                            performAction={onActionClick}
                            position={i + 1}
                        />
                    )}
                </Table>
            }
        </section>
    );
};

/** System variables list */
export default connect(
    ({ app }: CompositeAppState) => ({
        variables: app.variables
    }),
    {
        loadSysVariables: loadSysVariablesAsync,
        performAction: performVariableActionAsync,
    }
)(VariablesList);

/** Props of `VariableRow` */
type VariableRowProps = {
    /** System variable */
    item: SysVariable;

    /** Position in variables queue */
    position: number;

    /**
     * Perform an action with system variable
     * @param variableCode System variable code
     */
    performAction: (variableCode: string) => void;
};

const VariableRow: FC<VariableRowProps> = ({
    item, performAction, position,
}) => {
    const onActionClick = useCallback(() => performAction(item.code), [item.code, performAction]);

    return (
        <tr
            key={item.code}
            className={isNullish(item.actionCaption) ? undefined : "has-action"}
        >
            <td>#{position.toLocaleString("en-US", { minimumIntegerDigits: 2 })}</td>
            <td>{item.caption}</td>
            <td className="is-italic">{item.code}</td>
            <td>{item.type}</td>
            <td>{item.value?.toString()}</td>
            <td>{moment(item.modifiedOn).format("DD MMM YYYY | HH:mm")}</td>
            <td>{!isNullish(item.actionCaption)
                &&
                <Button
                    light
                    type="primary"
                    onClick={onActionClick}
                    caption={item.actionCaption}
                />
            }</td>
        </tr>
    );
};
