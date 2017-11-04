'use strict';


const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const HMR_URL = 'http://localhost:8080';

let clientConfig = config[0];

// Add Hot Module Replacement entries and plugins to client config, and update
// the publicPath to use the HMR_URL.
clientConfig.entry.main.unshift(`webpack-dev-server/client?${HMR_URL}`,
                                'webpack/hot/dev-server');
clientConfig.plugins = clientConfig.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]);
clientConfig.output.publicPath = HMR_URL + clientConfig.output.publicPath;

var compiler = webpack(clientConfig);
var server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: clientConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
});
server.listen(8080);

