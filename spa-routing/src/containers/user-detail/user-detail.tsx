import {component$, useContext} from '@builder.io/qwik';
import {getParams, getSearchParams} from '../../routing/routing';
import {ROUTING} from '../../routing/routing-state';

export const UserDetail = component$(() => {
    const routingState = useContext(ROUTING);
    // get all the routing params
    const params = getParams(routingState);
    // get foo from the searchParams
    const foo = getSearchParams(routingState).get('foo');
    return (
        <div>
            <h1>User detail</h1>
            Params: <pre>{JSON.stringify(params)}</pre>
            foo: <pre>{foo}</pre>
        </div>
    );
});
