'use strict';
/**
 * Main gulpfile
 */
const gulp = require('gulp');
const { join } = require('path');
const config = require('config');
const clean = require('gulp-clean');

const { compileAmp, ampValidator } = require('./tasks/amp');
const { sassTask } = require('./tasks/sass');
const { serveAmpTask } = require('./tasks/server');

const PATHS = config.get('paths');
const ASSETS = [ join(PATHS.app, PATHS.assets, '**', '*')];
const APP = join(PATHS.app, 'index.html');
const CSS = join(PATHS.app, PATHS.style, 'main.scss');

gulp.task('dev:clean', () => gulp.src(PATHS.dev, {read: false, allowEmpty: true}).pipe(clean()) );

gulp.task('dev:copy:assets', () => {
  return gulp.src(ASSETS)
    .pipe(gulp.dest(join(PATHS.dev, PATHS.assets)));
});

gulp.task('dev:build:amp', compileAmp(APP));
gulp.task('dev:validate:amp', ampValidator(join(PATHS.dev, 'index.html')));

gulp.task('dev:build:sass', sassTask());

gulp.task('dev:build', gulp.series('dev:build:sass', 'dev:build:amp'));

gulp.task('dev:watch', done => {
  done();
  gulp.watch(APP, gulp.series('dev:build', 'dev:validate:amp'));
  gulp.watch(CSS, gulp.series('dev:build'));
  gulp.watch(ASSETS, gulp.series('dev:copy:assets'));
});

gulp.task('dev', gulp.series(
  'dev:clean',
  'dev:copy:assets',
  'dev:build',
  'dev:watch',
  serveAmpTask
));

// @TODO build
