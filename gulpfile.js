require('./env/gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var gulp = require('gulp');
var pathModule = require('path');
var vinylTransform  = require('vinyl-transform');
var vinylSourceStream  = require('vinyl-source-stream');


var CLIENT_DIR = './client'
var PUBLIC_DIR = './public';
var PUBLIC_DIST_DIR = pathModule.join(PUBLIC_DIR, 'dist');


var JS_REQUIREMENTS = [
  'backbone',
  'lodash',
  'react'
];

var WATCHED_ES6_SOURCES = [
  pathModule.join(CLIENT_DIR, '/**/*.es6')
];


var onError = function onError(err) {
  console.error(err.stack || err);
  this.emit('end');
};

var createJsBundler = function createJsBuilder() {
  return browserify(pathModule.join(CLIENT_DIR, 'index.es6'), {
      debug: true,
      extensions: ['.es6']
    })
    .transform(babelify)
    .external(JS_REQUIREMENTS)
    .bundle()
  ;
};


gulp.task('build-js-requirements', function() {
  return browserify({
      debug: true
    })
    .require(JS_REQUIREMENTS)
    .bundle()
    .pipe(vinylSourceStream('requirements.js'))
    .pipe(gulp.dest(PUBLIC_DIST_DIR))
  ;
});

gulp.task('build-js-app', function() {
  return createJsBundler()
    .pipe(vinylSourceStream('bundle.js'))
    .pipe(gulp.dest(PUBLIC_DIST_DIR))
  ;
});

gulp.task('watch-js', function() {
  gulp.watch(WATCHED_ES6_SOURCES, function() {
    createJsBundler()
      .on('error', onError)
      .pipe(vinylSourceStream('bundle.js'))
      .pipe(gulp.dest(PUBLIC_DIST_DIR))
    ;
  });
});
