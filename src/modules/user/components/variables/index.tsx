import { useCallback, useEffect } from "react";
import { connect } from "react-redux";

import moment from "moment";
import { ElementSize } from "@bodynarf/react.components";
import Button from "@bodynarf/react.components/components/button/component";

import { SysVariable } from "@app/models/app";

import { loadSysVariablesAsync } from "@app/redux/app";
import { CompositeAppState } from "@app/redux/types";

import Table from "@app/components/table";

/** System variables list component props */
interface VariablesListProps {
    /** System variables */
    variables: Array<SysVariable>;

    /** Load system variables */
    loadSysVariables: () => void;
}

/** System variables list */
const VariablesList = ({
    variables,
    loadSysVariables,
}: VariablesListProps): JSX.Element => {

    useEffect(() => {
        if (variables.length === 0) {
            loadSysVariables();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onReloadClick = useCallback(() => loadSysVariables(), [loadSysVariables]);

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
                    zebra={true}
                    fullWidth={true}
                    headings={tableHeadings}
                    headerBorderless={true}
                    className="mt-2"
                >
                    {variables.map((x, i) =>
                        <tr
                            key={x.code}
                        >
                            <td>#{(i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</td>
                            <td>{x.caption}</td>
                            <td className="is-italic">{x.code}</td>
                            <td>{x.type}</td>
                            <td>{x.value?.toString()}</td>
                            <td>{moment(x.modifiedOn).format("DD MMM YYYY | HH:mm")}</td>
                        </tr>
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
        loadSysVariables: loadSysVariablesAsync
    }
)(VariablesList);

const tableHeadings = [
    "Position", "Caption",
    "System code", "Data type",
    "Current value", "Last updated on",
].map(caption => ({ caption }));
