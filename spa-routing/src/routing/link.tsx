import {component$, Slot, useContext} from '@builder.io/qwik';
import {navigateTo} from './routing';
import {ROUTING} from './routing-state';

export const Link = component$((opts: { path: string }) => {
    const routingState = useContext(ROUTING);
    const {path} = opts;
    return (
        <a
            // This will prevent the default behavior of the "click" event.
            preventdefault:click
            href={path} onClick$={(e) => {
            navigateTo(path, routingState)
        }}><Slot/></a>
    );
});
