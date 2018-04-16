const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const config = require('config');
const { join } = require('path');

const paths = config.get('paths');
const base = join(__dirname, '..');

exports.sassTask = build => {
  return () => {
    const dest = build ? paths.dest : paths.dev;
    // @to1source add windoze compatible code
    const dir = join(base, dest, paths.style);
    return gulp.src( join(base, paths.app, paths.style, 'main.scss') )
      .pipe(sourcemaps.init())
      .pipe( sass({
        includePaths: join(process.cwd(), 'node_modules')
      }).on('error', sass.logError) )
      .pipe(postcss([
        autoprefixer,
        cssnano
      ]))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dir));
  };
};
