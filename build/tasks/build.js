/**
 * Gulp task to build the app for production
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = buildTask;

function buildTask(userConfig) {
    var config = userConfig || this.config;
    var runSequence = require('run-sequence').use(this.gulp);

    return function (cb) {
        if (config.isProduction) {
            runSequence('clean', 'browserify', 'postcss', cb);
        } else {
            config.debug = true;
            config.watchify = true;
            runSequence('browserify', 'postcss', cb);
        }
    };
}

module.exports = exports['default'];
//# sourceMappingURL=build.js.map