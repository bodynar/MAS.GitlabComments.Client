import { StatsRecord } from '@app/models/response/statsRecord';

type StatsRecordProps = StatsRecord & {

};

const StatsRecordComponent = ({ commentId, commentText, count }: StatsRecordProps): JSX.Element => {
    return (
        <tr>
            <td>{count}</td>
            <td>{commentText}</td>
        </tr>
    );
};

export default StatsRecordComponent;
