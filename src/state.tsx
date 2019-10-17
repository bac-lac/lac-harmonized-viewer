import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
    message: string,
    page: number,
    //increment?: () => void
}

export default createProviderConsumer<State>({
    message: null,
    page: 0
},
    (subscribe, child) => (
        <context-consumer subscribe={subscribe} renderer={child} />
    )
);