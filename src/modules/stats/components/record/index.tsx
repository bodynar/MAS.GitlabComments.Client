import { StatsRecord } from '@app/models/response/statsRecord';

type StatsRecordProps = StatsRecord & {

};

const StatsRecordComponent = ({ commentId, commentText, count }: StatsRecordProps): JSX.Element => {
    return (
        <span key={commentId}>
            [{count}] {commentText}
        </span>
    );
};

export default StatsRecordComponent;
