/**
 * all the serve up methods are here
 */
const { gulp } = require('gulp-server-io/export');
const server = require('gulp-server-io');
const config = require('./configs');


const createServer = (paths , opt) => {
  return gulp.src(paths)
    .pipe(server(opt));
};


exports.serveAmpTask = () => {
  return createServer([
    config.paths.dest
  ], {
    indexes: ['index.amp.html'],
    port: 8088
  });
}
