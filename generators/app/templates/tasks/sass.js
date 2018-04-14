const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const config = require('node-config');
const { join } = require('path');

const paths = config.get('paths');

exports.sassTask = build => {
  const dest = build ? paths.dest : paths.dev;
  return gulp.src( join(paths.style, 'main.scss') )
    .pipe(sourcemaps.init())
    .pipe( sass({
      includePaths: join(process.cwd(), 'node_modules')
    }).on('error', sass.logError) )
    .pipe(postcss([
      autoprefixer,
      cssnano
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest));
}
