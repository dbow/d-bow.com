'use strict';

var gulp = require('gulp');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var size = require('gulp-size');
var ngHtml2js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var useref = require('gulp-useref');
var inject = require('gulp-inject');
var filter = require('gulp-filter');
var ngAnnotate = require('gulp-ng-annotate');
var uglifySaveLicense = require('uglify-save-license');
var csso = require('gulp-csso');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var rename = require('gulp-rename');
var debug = require('gulp-debug');

gulp.task('default', ['clean'], function () {
    gulp.start('post');
});

gulp.task('clean', function (cb) {
  del([
    // Delete .tmp folder.
    '.tmp/*',
    // and all dist folders.
    'js/dist/*',
    'css/dist/*',
    'index_dist.html'
  ], cb);
});

gulp.task('styles', function () {
  return gulp.src(['css/**/*.css', '!css/dist/*'])
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/css'))
    .pipe(size());
});

gulp.task('scripts', function () {
  return gulp.src(['js/**/*.js', '!js/dist/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(size());
});

gulp.task('views', function () {
  return gulp.src('js/views/*.html')
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2js({
      moduleName: 'dbow',
      prefix: 'views/'
    }))
    .pipe(gulp.dest('.tmp/views'))
    .pipe(size());
});

var jsFilter = filter('**/*.js');
var cssFilter = filter('**/*.css');

gulp.task('build', ['styles', 'scripts', 'views'], function () {
  var assets = useref.assets();

  return gulp.src('index.html')
    .pipe(inject(gulp.src('.tmp/views/*.js'), { // Inject views to index.html.
      read: false,
      starttag: '<!-- inject:views -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe(assets) // Pipe assets in index.html.
    .pipe(rev()) // Append revision (cache-busting) hash.
    .pipe(jsFilter) // Pipe only JS files.
    .pipe(ngAnnotate()) // Annotate/inject dependencies.
    .pipe(uglify({preserveComments: uglifySaveLicense})) // Uglify but preserve license.
    .pipe(jsFilter.restore()) // Switch back to all assets.
    .pipe(cssFilter) // Pipe only CSS files.
    .pipe(csso()) // Minify CSS.
    .pipe(cssFilter.restore()) // Switch back to all assets.
    .pipe(assets.restore()) // Switch back to index.html.
    .pipe(useref()) // Inject assets.
    .pipe(revReplace()) // Rewrite any changes to files from the rev above.
    .pipe(gulp.dest('.tmp/dist')) // Output to dist in .tmp
    .pipe(size());
});

gulp.task('post', ['build'], function() {
  var index = filter('index.html');
  var assets = filter(['**/*.js', '**/*.css']);

  return gulp.src('.tmp/dist/**')
    .pipe(index)
    .pipe(rename('index_dist.html'))
    .pipe(gulp.dest('./'))
    .pipe(index.restore())
    .pipe(assets)
    .pipe(gulp.dest('./'));
});

