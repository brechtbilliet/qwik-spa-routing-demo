import {component$, useClientEffect$, useContext} from '@builder.io/qwik';
import {ROUTING} from './routing-state';
import {getMatchingConfig, listenToRouteChanges} from './routing';
import {routingConfig} from '../routing-config';

export const RouterOutlet = component$(
    () => {
        const routing = useContext(ROUTING);
        useClientEffect$(() => {
            listenToRouteChanges(routing);
        });
        return getMatchingConfig(routing.segments, routingConfig)?.component
    }
);
