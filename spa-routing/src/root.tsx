import { App } from './containers/app/app';

import './global.css';

export default (opts: { url:  string }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <App url={opts.url}/>
      </body>
    </html>
  );
};
