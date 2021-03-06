const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');


/**
 * Run `webpack` with NODE_ENV=development to do a dev build.
 *
 * Defaults to production.
 */
const DEVELOPMENT = process.env.NODE_ENV === 'development';


/**
 * Output bundles to /build directory.
 */
const OUTPUT_DIR = path.join(__dirname, 'build');


/**
 * Resolve all modules from this directory.
 */
const RESOLVE_DIR = __dirname;


/**
 * JS loader configuration.
 *
 * Compile with Babel and ignore node_modules.
 */
const JS_LOADER = {
  test: /\.jsx?$/,
  use: 'babel-loader',
  exclude: /node_modules/,
};


/**
 * CSS Modules Loader configuration.
 */

// The pattern for classnames generated by CSS modules:
const CSS_MODULES_CLASS_PATTERN = '[name]__[local]___[hash:base64:5]';

// Options for css-loader to set up CSS Modules with a specific class pattern
// and add postcss-loader:
const CSS_MODULES_OPTIONS = {
  modules: {
    localIdentName: CSS_MODULES_CLASS_PATTERN,
  },
  importLoaders: 1,
};

// postcss configurations for css modules.
const CSS_MODULES_POSTCSS = {
  loader: 'postcss-loader',
  options: {
    config: {
      ctx: {
        import: true,
        autoprefixer: true,
      },
    },
  },
};

// Loaders for CSS Modules.
const CSS_MODULES_LOADERS = {
  CLASSNAMES_ONLY: [
    {
      loader: 'css-loader',
      options: {
        ...CSS_MODULES_OPTIONS,
        onlyLocals: true,
      },
    },
    CSS_MODULES_POSTCSS,
  ],
  STYLETAGS: [
    'style-loader',
    {
      loader: 'css-loader',
      options: CSS_MODULES_OPTIONS,
    },
    CSS_MODULES_POSTCSS,
  ],
  FILE: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
      options: CSS_MODULES_OPTIONS,
    },
    CSS_MODULES_POSTCSS,
  ],
};


/**
 * Global CSS loader configuration.
 *
 * (i.e. anything that isn't CSS Modules).
 */

// Loaders for global CSS.
const CSS_LOADERS = {
  STYLETAGS: [
    'style-loader',
    'css-loader',
  ],
  FILE: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          ctx: {
            autoprefixer: true,
          },
        },
      },
    }
  ],
};



/**
 * CLIENT CONFIGURATION.
 *
 * Generates the client bundles served to the browser.
 */
const client = {

  mode: DEVELOPMENT ? 'development' : 'production',

  devtool: DEVELOPMENT ? 'cheap-module-source-map' : 'source-map',

  entry: {
    main: [
      './src/client'
    ],
    vendor: [
      'events',
      'lodash',
      'prop-types',
      'react',
      'react-addons-update',
      'react-dom',
      'react-router',
      'redial',
      'superagent',
    ],
  },

  output: {
    path: `${OUTPUT_DIR}/client`,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/static/',
  },

  resolve: {
    modules: [
      RESOLVE_DIR,
      'node_modules',
    ],
    alias: {
      common: path.resolve(__dirname, 'src/styles/common.css'),
    },
  },

  module: {
    rules: [

      JS_LOADER,

      // CSS Modules.
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
          /\.global\.css$/,
        ],
        use: DEVELOPMENT ? CSS_MODULES_LOADERS.STYLETAGS :
            CSS_MODULES_LOADERS.FILE,
      },

      // CSS in node_modules.
      {
        test: /\.css$/,
        include: /node_modules/,
        use: DEVELOPMENT ? CSS_LOADERS.STYLETAGS :
            CSS_LOADERS.FILE,
      },

      // Global CSS aka .global.css files.
      {
        test: /\.global\.css$/,
        use: DEVELOPMENT ? CSS_LOADERS.STYLETAGS :
            CSS_LOADERS.FILE,
      },
    ],
  },

  plugins: [],
};

if (!DEVELOPMENT) {
  client.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  );
}


/**
 * SERVER CONFIGURATION.
 *
 * Generates the server bundle. Includes the express web server and server
 * rendering.
 */
const server = {

  mode: DEVELOPMENT ? 'development' : 'production',

  devtool: DEVELOPMENT ? 'cheap-module-source-map' : 'source-map',

  entry: './src/server.js',

  target: 'node',

  // Only bundle the source code. All other imports are treated as externals.
  // https://webpack.github.io/docs/configuration.html#externals
  externals: [
    /^[a-z\-0-9]+$/,
    // Ignore the 'common' alias below for shared CSS.
    {
      common: false,
    }
  ],

  resolve: {
    modules: [
      RESOLVE_DIR,
      'node_modules',
    ],
    alias: {
      common: path.resolve(__dirname, 'src/styles/common.css'),
    },
  },

  output: {
    path: `${OUTPUT_DIR}/server`,
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },

  // Node variables:
  //     http://jlongster.com/Backend-Apps-with-Webpack--Part-II#Node-Variables
  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    rules: [

      JS_LOADER,

      // CSS Modules.
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
          /\.global\.css$/,
        ],
        use: CSS_MODULES_LOADERS.CLASSNAMES_ONLY,
      },

      // CSS in node_modules.
      {
        test: /\.css$/,
        include: /node_modules/,
        use: 'null-loader',
      },

      // Global CSS aka .global.css files.
      {
        test: /\.global\.css$/,
        use: 'null-loader',
      },
    ]
  },

  plugins: [
    // Import source-map-support at top of bundle for proper node source maps:
    //     http://jlongster.com/Backend-Apps-with-Webpack--Part-I#Sourcemaps,-CSS,-and
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
};


// NOTE(dbow): When using Hot Module Replacement, the client bundle is served
// by the webpack dev server so we only return the server bundle.

module.exports = process.env.HMR ? server : [client, server];

