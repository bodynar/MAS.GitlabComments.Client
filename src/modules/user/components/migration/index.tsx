import { FC, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

import { isNullish, Optional } from "@bodynarf/utils";
import { ElementColor } from "@bodynarf/react.components";
import Button from "@bodynarf/react.components/components/button";
import FileUpload from "@bodynarf/react.components/components/file";
import Icon from "@bodynarf/react.components/components/icon";

import { CompositeAppState } from "@app/redux";
import { CommentModuleInitState, initCommentsModuleAsync } from "@app/redux/comments";
import { importAppDataAsync } from "@app/redux/app";

/** Props type of `MigrationModule` */
type MigrationModuleProps = {
    /** Is application has any comments */
    hasAnyData: boolean;

    /** Current module state */
    state: CommentModuleInitState;

    /** Get all data for initializing module */
    initCommentsModule: () => Promise<void>;

    /** Import data from file */
    importData: (file: File) => Promise<boolean>;
};

/** Module for system migration (export\import data) */
const MigrationModule: FC<MigrationModuleProps> = ({
    hasAnyData,
    state, initCommentsModule,
    importData,
}) => {
    const [file, setFile] = useState<Optional<File>>(undefined);

    const onFileSelected = useCallback(
        (value?: File) => setFile(value),
        []
    );

    const onImportBtnClick = useCallback(
        async () => {
            const success = await importData(file!);
            if (success) {
                initCommentsModule();
            }
        }, [file, importData, initCommentsModule]);

    useEffect(() => {
        if (state === "init") {
            initCommentsModule();
        }
    }, [initCommentsModule, state]);

    return (
        <section>
            <h4 className="subtitle mb-2 is-4">Import</h4>
            <p className="is-italic">
                You can populate application current instance with data from other instance of application
                <br />
                To use import function file must be get from export from another instance
            </p>

            <div className="mt-2 is-flex has-gap-1">
                {!isNullish(file) &&
                    <Button
                        type="success"
                        caption="Import data"
                        onClick={onImportBtnClick}
                    />
                }
                <FileUpload
                    placeholder="Select file for import"
                    onValueChange={onFileSelected}
                    style={ElementColor.Link}
                />
            </div>
            {hasAnyData &&
                <>
                    <hr className="is-thick is-gray" />
                    <div className="mt-4">
                        <h4 className="subtitle mb-2 is-4">Export</h4>
                        <p className="is-italic">
                            To share application data between instances you need to export your data
                            <br />
                            And upload json file to another instance of application
                        </p>
                        <a
                            className="bbr-button button mt-2 is-light is-outlined"
                            download
                            href="/api/app/exportData"
                        >
                            <Icon
                                name="download"
                                className="mr-2"
                            />
                            Export app data
                        </a>
                    </div>
                </>
            }
        </section>
    );
};

/** Comment manage list */
export default connect(
    ({ comments }: CompositeAppState) =>
    ({
        hasAnyData: comments.comments.length > 0,
        state: comments.state,
    }),
    {
        importData: importAppDataAsync,
        initCommentsModule: initCommentsModuleAsync,
    }
)(MigrationModule);
