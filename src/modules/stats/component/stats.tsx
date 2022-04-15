import React from 'react';

import { connect } from 'react-redux';

import './stats.scss';
import './stats.dark.scss';

import { CompositeAppState } from '@app/redux/rootReducer';

type StatsProps = {
    value?: boolean;
};

/** Statistics module main component */
function Stats(props: StatsProps): JSX.Element {
    return (
        <section className="app-stats">
            <h2>Stats {props.value}</h2>
        </section>
    );
}

/** Statistics module main component */
export default connect(
    ({ }: CompositeAppState) => ({}),
    {
    }
)(Stats);
