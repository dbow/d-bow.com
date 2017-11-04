module.exports = ({ file, options, env }) => ({
  plugins: {
    // NOTE(dbow): postcssImport is used to add the shared classes in
    // src/styles/modules to src/styles/common.css to avoid the following
    // issue when using CSS Modules' composition feature:
    //   https://github.com/css-modules/css-modules/issues/12
    // See also:
    //   https://github.com/postcss/postcss-loader#integration-with-postcss-import
    // It *must* be first in the array.
    'postcss-import': options.import ? true : false,
    'autoprefixer': options.autoprefixer ? {
      browsers: ['last 2 versions'],
    } : false,
  }
});

