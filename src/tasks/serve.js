/**
 * Gulp task to execute a server test with the app builded in mode 'env'
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
export default function serveTask() {
    const runSequence = require('run-sequence').use(this.gulp);
    this.config.watch = true;
    return (cb) => {
        runSequence('clean', 'build', 'browser-sync', 'watch-files', cb);
    };
}
