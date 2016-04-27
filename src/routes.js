import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import App from 'src/components/app.jsx';
import Info from 'src/components/info/info.jsx';
import Work from 'src/components/work/work.jsx';
import Writing from 'src/components/writing/writing.jsx';
import Instapoetry from 'src/components/instapoetry/instapoetry.jsx';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)


export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/info" />
    <Route path="info" component={Info} />
    <Route path="work" component={Work} />
    <Route path="writing" component={Writing} />
    <Route path="instapoetry" component={Instapoetry} />
  </Route>
);

