require('./env/gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var gulp = require('gulp');
var gulpRename = require('gulp-rename');
var gulpStylus = require('gulp-stylus');
var pathModule = require('path');
var vinylTransform  = require('vinyl-transform');
var vinylSourceStream  = require('vinyl-source-stream');


var CLIENT_DIR = './client';
var CLIENT_STYLUS_DIR = pathModule.join(CLIENT_DIR, 'stylus');
var PUBLIC_DIR = './public';
var PUBLIC_DIST_DIR = pathModule.join(PUBLIC_DIR, 'dist');


var JS_REQUIREMENTS = [
  'backbone',
  'bluebird',
  'lodash',
  'react',
  'underscore.string'
];

var WATCHED_ES6_SOURCES = [
  pathModule.join(CLIENT_DIR, '/**/*.es6')
];

var WATCHED_STYLUS_SOURCES = [
  pathModule.join(CLIENT_STYLUS_DIR, '/**/*.styl')
];


var onIgnoreError = function onIgnoreError(err) {
  console.error(err.stack || err);
  this.emit('end');
};

var createJsBundler = function createJsBuilder() {
  return browserify(pathModule.join(CLIENT_DIR, 'index.es6'), {
      //debug: true,
      extensions: ['.es6']
    })
    .transform(babelify.configure({
      sourceMap: false
    }))
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
      .on('error', onIgnoreError)
      .pipe(vinylSourceStream('bundle.js'))
      .pipe(gulp.dest(PUBLIC_DIST_DIR))
    ;
  });
});

gulp.task('build-css', function() {
  return gulp.src(pathModule.join(CLIENT_DIR, 'stylus/index.styl'))
    .pipe(gulpStylus())
    .pipe(gulpRename('style.css'))
    .pipe(gulp.dest(PUBLIC_DIST_DIR))
  ;
});

gulp.task('watch-css', function() {
  gulp.watch(WATCHED_STYLUS_SOURCES, function() {
    gulp.src(pathModule.join(CLIENT_STYLUS_DIR, 'index.styl'))
      .pipe(gulpStylus())
      .on('data', function() {
        console.log(new Date().toString() + ': Compiled client stylus sources');
      })
      .on('error', onIgnoreError)
      .pipe(gulpRename('client-style.css'))
      .pipe(gulp.dest(PUBLIC_DIST_DIR))
    ;
  });
});


gulp.task('watch', ['watch-js', 'watch-css']);
