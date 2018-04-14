const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const config = require('config');
const { join } = require('path');

const paths = config.get('paths');

exports.sassTask = build => {
  return () => {
    const dest = build ? paths.dest : paths.dev;
    return gulp.src( join(paths.app, paths.style, 'main.scss') )
      .pipe(sourcemaps.init())
      .pipe( sass({
        includePaths: join(process.cwd(), 'node_modules')
      }).on('error', sass.logError) )
      .pipe(postcss([
        autoprefixer,
        cssnano
      ]))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(join(dest, paths.style)));
  };
};
