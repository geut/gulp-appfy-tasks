'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = browserSyncTask;

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

/**
 * Gulp task to create a server test
 * @param  {object} config Global configuration
 * @return {function}        Function task
 */

function browserSyncTask(userConfig) {
    var config = userConfig || this.config;
    return function () {
        (0, _browserSync2['default'])({
            port: config.browsersync.port,
            notify: config.browsersync.notify,
            server: {
                baseDir: './' + config.serverPath
            }
        });
    };
}

module.exports = exports['default'];
//# sourceMappingURL=browser-sync.js.map