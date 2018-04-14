/**
 * all the serve up methods are here
 */
const { gulp } = require('gulp-server-io/export');
const server = require('gulp-server-io');
const config = require('node-config');

// wrapper for construct other task
const createServer = (paths , opt) => {
  return gulp.src(paths)
    .pipe(server(opt));
};

// main serve dev task
exports.serveAmpTask = (opt={}) => {
  return createServer([
    config.get('paths.dev')
  ], Object.assign{
    port: 8088
  }, opt));
};
