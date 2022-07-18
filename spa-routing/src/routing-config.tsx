import {RoutingConfig} from './routing/routing-types';
import {UserDetail} from './containers/user-detail/user-detail';
import {Users} from './containers/users/users';
import {Home} from './containers/home/home';

export const routingConfig:RoutingConfig = [
    {
        path: '',
        component: <Home/>
    },
    {
        path: 'users',
        component: <Users/>
    },
    {
        path: 'users/:id',
        component: <UserDetail/>
    }
]
