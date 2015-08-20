/**
 * Gulp task to execute a server test with the app builded in mode 'env'
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = serveTask;

function serveTask(userConfig) {
    var config = userConfig || this.config;
    var runSequence = require('run-sequence').use(this.gulp);

    return function (cb) {
        config.watchify = true;
        runSequence('browser-sync', 'watch-files', cb);
    };
}

module.exports = exports['default'];
//# sourceMappingURL=serve.js.map