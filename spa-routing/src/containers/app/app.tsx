import {component$, useStyles$,} from '@builder.io/qwik';
import {initializeRouter} from '../../routing/routing';
import {Link} from '../../routing/link';
import {RouterOutlet} from '../../routing/router-outlet';
import styles from './app.scss';

export const App = component$((opts: { url: string | undefined }) => {
    useStyles$(styles);
    initializeRouter(opts.url);
    return (
        <section>
            <ul>
                <li>
                    <Link path={'/'}>Home</Link>
                </li>
                <li>
                    <Link path={'/users'}>users</Link>
                </li>
                <li>
                    <Link path={'/users/1?foo=bar'}>Brecht</Link>
                </li>
            </ul>
            <RouterOutlet/>
        </section>
    );
});
