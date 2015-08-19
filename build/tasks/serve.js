'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

/**
 * Gulp task to execute a server test with the app builded in mode 'env'
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */

exports['default'] = function (config) {
    return function (cb) {
        config.watchify = true;
        (0, _runSequence2['default'])('browser-sync', 'watch-files', cb);
    };
};

module.exports = exports['default'];