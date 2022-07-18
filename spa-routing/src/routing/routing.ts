// this one will be called by the <App/> component and initialize
// the state once for the entire lifecycle of the application
import {ROUTING, RoutingState} from './routing-state';
import {useContextProvider, useStore} from '@builder.io/qwik';
import {RoutingConfig, RoutingConfigItem} from './routing-types';
import {routingConfig} from '../routing-config';
import {isServer} from '@builder.io/qwik/build';

export function initializeRouter(url: string): RoutingState {
    // create a store and state
    const routingState = useStore<RoutingState>(
        getRoutingStateByPath(url)
    );

    useContextProvider(ROUTING, routingState);
    return routingState;
}

// safely get the window object
export function getWindow(): Window | undefined {
    if (!isServer) {
        return document?.defaultView?.window
    }
    return undefined;
}

export function navigateTo(path: string, routingState: RoutingState): void {
    if (!isServer) {
        // we don't actually navigate, we just push a new state to
        // the history object
        getWindow()?.history?.pushState({page: path}, path, path);
        setRoutingState(routingState, path);
    }
}

export function listenToRouteChanges(routingState: RoutingState): void {
    if (!isServer) {
        // when the navigation buttons are being used
        // we want to set the routing state
        getWindow()?.addEventListener('popstate', (e) => {
            const path = e.state.page;
            setRoutingState(routingState, path);
        })
    }
}

export function setRoutingState(routingState: RoutingState, path: string): void {
    const oldUrl = new URL(routingState.url);
    const newUrl = new URL(oldUrl.origin + path);
    const {segments, url} = getRoutingStateByPath(newUrl.toString())
    routingState.segments = segments;
    routingState.url = url;
}


// this will retrieve the routingstate by the path (the current url)
export function getRoutingStateByPath(path: string): RoutingState {
    const url = new URL(path);
    const segments = url.pathname?.split('/');
    segments.splice(0, 1);
    return {
        url: path,
        segments: segments
    }
}

export function getMatchingConfig(segments: string[], config: RoutingConfig): RoutingConfigItem {
    for (let i = 0; i < routingConfig.length; i++) {
        if (segmentsMatch(segments, config[i])) {
            return config[i];
        }
    }
    return null;
}

export function segmentsMatch(pathSegments: string[], configItem: RoutingConfigItem): boolean {
    const configItemSegments = configItem.path.split('/');
    if (configItemSegments.length !== pathSegments.length) {
        return false;
    }
    const matches = pathSegments.filter((segment, index) => {
        return segment === configItemSegments[index] || configItemSegments[index].indexOf(':') === 0
    });
    return matches.length === pathSegments.length;
}
export function getParams(routingState: RoutingState): { [key: string]: string } {
    const matchingConfig = getMatchingConfig(routingState.segments, routingConfig);
    const params = matchingConfig.path.split('/')
        .map((segment: string, index: number) => {
            if (segment.indexOf(':') === 0) {
                return {
                    index,
                    paramName: segment.replace(':', '')
                }
            } else {
                return undefined
            }
        })
        .filter(v => !!v);
    const returnObj: { [key: string]: string } = {};
    params.forEach(param => {
        returnObj[param.paramName] = routingState.segments[param.index]
    })
    return returnObj;
}

export function getSearchParams(routingState: RoutingState): URLSearchParams {
    return new URL(routingState.url).searchParams;
}
