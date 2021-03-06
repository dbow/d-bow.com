import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import App from 'src/components/app.jsx';
import Info from 'src/components/info/info.jsx';
import Work from 'src/components/work/work.jsx';
import Music from 'src/components/music/music.jsx';
import WritingContainer from 'src/components/writing/container.jsx';
import InstapoetryContainer from 'src/components/instapoetry/container.jsx';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)


export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/info" />
    <Route path="info" component={Info} />
    <Route path="work" component={Work} />
    <Route path="music" component={Music} />
    <Route path="writing" component={WritingContainer} />
    <Route path="instapoetry" component={InstapoetryContainer} />
  </Route>
);

