/**
 * Gulp task to execute a server test with the app builded in mode 'env'
 * @return {function}      Function task
 */
export default function serveTask() {
    const runSequence = require('run-sequence').use(this.gulp);
    const config = this.config;
    return (cb) => {
        config.watch = true;
        runSequence('clean', 'build', 'browser-sync', 'watch-files', cb);
    };
}
