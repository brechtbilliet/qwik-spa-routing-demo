import {component$, Slot, useContext} from '@builder.io/qwik';
import {navigateTo} from './routing';
import {ROUTING} from './routing-state';

export const Link = component$((opts: { path: string }) => {
    const routingState = useContext(ROUTING);
    const {path} = opts;
    const isActive = `/${routingState.segments.join('/')}` === path;
    return (
        <a
            // This will prevent the default behavior of the "click" event.
            preventdefault:click
            // set the correct class when the link is active
            className={isActive ? 'link--active' : ''}
            href={path} onClick$={(e) => {
            navigateTo(path, routingState)
        }}><Slot/></a>
    );
});
