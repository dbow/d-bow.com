import express from 'express';
import _ from 'lodash';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import favicon from 'serve-favicon';
import serialize from 'serialize-javascript';
import {trigger} from 'redial';

import api from './api';
import routes from './routes';

import IndexStore from './stores/index';

import FluxRoot from './flux/root.jsx';


const DEVELOPMENT = process.env.NODE_ENV === 'development';
const HOT_MODULE_REPLACEMENT = DEVELOPMENT && process.env.HMR;

const app = express();

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

app.set('views', 'src/views');
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/images/favicon.ico'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/videos', express.static(__dirname + '/videos'));
app.use('/audio', express.static(__dirname + '/audio'));

app.use('/api', api);

process.env.API_URL = DEVELOPMENT ? `http://127.0.0.1:${PORT}/api/` :
  `http://${process.env.GAE_VERSION}.${process.env.GAE_SERVICE}.${process.env.GOOGLE_CLOUD_PROJECT}.appspot.com/api/`;

// Serve up /build directory statically when not doing hot module replacement.
if (!HOT_MODULE_REPLACEMENT) {
  app.use('/static', express.static('build/client'));
}

function render(res, store, props) {
  const content = renderToString((
    <FluxRoot store={store}>
      <RouterContext {...props} />
    </FluxRoot>
  ));
  const data = serialize(store.serialize());
  res.render('index', {
    content,
    data,
    development: DEVELOPMENT,
    base: HOT_MODULE_REPLACEMENT ? 'http://localhost:8080' : '',
  });
}

app.get('/*', function(req, res) {
  const location = req.url;
  match({routes, location}, (error, redirect, renderProps) => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);

    } else if (renderProps) {
      const store = new IndexStore();
      const {components, params} = renderProps;
      trigger('fetch', components, {store, params})
        .then(() => {
          render(res, store, renderProps);
        })
        .catch((error) => {
          // This shouldn't happen if actions handle errors properly...
          render(res, store, renderProps);
        });
    } else {
      console.log(location);
      res.status(404).send('Not found');
    }
  });
});

const server = app.listen(app.get('port'), function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

