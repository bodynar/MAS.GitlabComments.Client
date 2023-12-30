import { useEffect } from "react";
import { connect } from "react-redux";

import { emptyFn, isUndefined } from "@bodynarf/utils";
import Number from "@bodynarf/react.components/components/primitives/number";
import Button from "@bodynarf/react.components/components/button/component";

import { CompositeAppState } from "@app/redux";
import { canUpdateTableAsync, getIncompleteAsync, updateIncompleteAsync, updateTableAsync } from "@app/redux/comments";

/** Comments manage panel component props type */
interface CommentsManagePanelProps {
    /** Can user update comments table definition */
    canUpdateTable: boolean;

    /** Current amount of incomplete comments */
    incompleteCount?: number;

    /** Get current incomplete comments count */
    getIncomplete: () => void;

    /** Check can user update comments table definition */
    checkCanUpdateTable: () => void;

    /** Update all incomplete comments */
    updateIncomplete: () => void;

    /** Update comments table definition. Single time operation */
    updateTable: () => void;
}

/** Comments manage panel component */
const CommentsManagePanel = ({
    incompleteCount, canUpdateTable,
    getIncomplete, updateIncomplete, updateTable, checkCanUpdateTable,
}: CommentsManagePanelProps): JSX.Element => {

    useEffect(() => {
        if (isUndefined(incompleteCount)) {
            getIncomplete();
            checkCanUpdateTable();
        }
    }, [checkCanUpdateTable, getIncomplete, incompleteCount]);

    return (
        <section>
            <section className="message is-warning">
                <div className="message-body">
                    <strong>Beware!</strong>
                    <br />
                    Comments tab panel will be removed in <strong>v1.5</strong>
                </div>
            </section>
            <div className="columns">
                <div className="column">
                    <label>
                        Incomplete comments
                    </label>
                    <p className="is-italic">
                        Amount of comments which does not have assigned number
                    </p>
                </div>
                <div className="column is-1">
                    <Number
                        readonly
                        onValueChange={emptyFn}
                        defaultValue={incompleteCount}
                    />
                </div>
                <div className="column">
                    <Button
                        type="info"
                        caption="Update comments"
                        onClick={updateIncomplete}
                        disabled={incompleteCount === undefined || incompleteCount === 0}
                    />
                </div>
            </div>

            <div className="columns mt-3">
                <div className="column is-3">
                    <Button
                        type="primary"
                        onClick={updateTable}
                        disabled={!canUpdateTable}
                        caption="Update definition of comments table"
                    />
                </div>
                {!canUpdateTable
                    &&
                    <div className="column">
                        <p className="is-italic">
                            Seems like you&apos;ve already updated table definition
                            <br/>
                            .. or it could be an error on service, if you sure that you haven&apos;t used that button before
                        </p>
                    </div>
                }
            </div>
        </section>
    );
};

/** Comment manage list */
export default connect(
    ({ comments }: CompositeAppState) =>
    ({
        incompleteCount: comments.incompleteCommentsCount,
        canUpdateTable: comments.canUpdateTable
    }),
    {
        getIncomplete: getIncompleteAsync,
        updateIncomplete: updateIncompleteAsync,
        updateTable: updateTableAsync,
        checkCanUpdateTable: canUpdateTableAsync,
    }
)(CommentsManagePanel);
