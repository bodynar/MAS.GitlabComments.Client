import { FC } from "react";
import { connect } from "react-redux";

import { ExtendedRetractionToken } from "@app/models/comments";

import { CompositeAppState } from "@app/redux/types";
import { batchRetractAsync, retractAsync } from "@app/redux/comments";

import "./style.scss";
import "./style.dark.scss";

import RetractionPanel from "../components/panel";

/** Props type of `RetractionModule` */
type RetractionModuleProps = {
    /** Active tokens */
    tokens: Array<ExtendedRetractionToken>;

    /**
     * Retract operation by token
     * @param tokenId Token identifier
     */
    retract: (tokenId: string) => Promise<void>;

    /**
     * Retract all operations by all active tokens
     */
    batchRetract: () => Promise<void>;
};

const RetractionModule: FC<RetractionModuleProps> = ({
    tokens,
    retract, batchRetract,
}) => {
    if (tokens.length === 0) {
        return (<></>);
    }

    return (
        <RetractionPanel
            tokens={tokens}
            retract={retract}
            batchRetract={batchRetract}
        />
    );
};

export default connect(
    ({ comments }: CompositeAppState) => ({
        tokens: comments.retractionTokens,
    }),
    {
        retract: retractAsync,
        batchRetract: batchRetractAsync
    }
)(RetractionModule);
