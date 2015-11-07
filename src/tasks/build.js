/**
 * Gulp task to build the app for production
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
export default function buildTask(userConfig) {
    const config = userConfig || this.config;
    const runSequence = require('run-sequence').use(this.gulp);
    const tasks = [];
    if (this.config.browserify) {
        tasks.push('browserify');
    }
    if (this.config.postcss) {
        tasks.push('postcss');
    }
    return (cb) => {
        tasks.push(cb);
        runSequence.apply(undefined, tasks);
    };
}
