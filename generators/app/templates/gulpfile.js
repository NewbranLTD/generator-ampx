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

const base = join(__dirname, PATHS.app);
const ASSETS = [ join(base, PATHS.assets, '**', '*')];
const APP = join(base, 'index.html');
const CSS = join(base, PATHS.style, 'main.scss');

gulp.task('dev:clean', () => gulp.src(PATHS.dev, {read: false, allowEmpty: true}).pipe(clean()));
gulp.task('dev:copy:assets', () => {
  return gulp.src(ASSETS)
    .pipe(gulp.dest(join(PATHS.dev, PATHS.assets)));
});
// copy the favicon.ico to the root
gulp.task('dev:copy:favicon', () => {
  return gulp.src(join(base, PATHS.assets, 'icons','favicon.ico'))
    .pipe(gulp.dest(join(PATHS.dev)));
});
// combine copy task 
gulp.task('dev:copy', gulp.parallel('dev:copy:assets','dev:copy:favicon'));
// compile AMP task
gulp.task('dev:build:amp', compileAmp(APP));
gulp.task('dev:build', gulp.series('dev:build:sass', 'dev:build:amp'));
gulp.task('dev:validate:amp', ampValidator(join(PATHS.dev, 'index.html')));
gulp.task('dev:build:sass', sassTask());
// watch during development 
gulp.task('dev:watch', done => {
  done();
  gulp.watch(APP, gulp.series('dev:build', 'dev:validate:amp'));
  gulp.watch(CSS, gulp.series('dev:build'));
  gulp.watch(ASSETS, gulp.series('dev:copy:assets'));
});

gulp.task('dev', gulp.series(
  'dev:clean',
  'dev:copy',
  'dev:build',
  'dev:watch',
  serveAmpTask
));

// build task
gulp.task('build:clean', () => gulp.src(PATHS.dest, {read: false, allowEmpty: true}).pipe(clean()));
gulp.task('build:copy:assets', () => {
  return gulp.src(ASSETS)
    .pipe(gulp.dest(join(PATHS.dest, PATHS.assets)));
});
gulp.task('build:copy:sourcemap', () => {
  return gulp.src(join(__dirname, PATHS.dev, PATHS.style, 'main.css.map'))
    .pipe(gulp.dest(join(PATHS.dest)));
});
gulp.task('build:copy:favicon', () => {
  return gulp.src(join(base, PATHS.assets, 'icons','favicon.ico'))
    .pipe(gulp.dest(join(PATHS.dest)));
});
gulp.task('build:build:amp', compileAmp(APP, true));
// combine task
gulp.task('build:copy', gulp.parallel('build:copy:assets', 'build:copy:favicon', 'build:copy:sourcemap'));
gulp.task('build:build', gulp.series('dev:build:sass', 'build:build:amp'));

gulp.task('build', gulp.series(
  'build:clean',
  'build:build',
  'build:copy'
));
