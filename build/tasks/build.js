'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

/**
 * Gulp task to build the app for production
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */

exports['default'] = function (config) {
    return function (cb) {
        if (config.isProduction) {
            (0, _runSequence2['default'])('clean', 'browserify', 'postcss', cb);
        }
        config.debug = true;
        config.watchify = true;
        (0, _runSequence2['default'])('browserify', 'postcss', cb);
    };
};

module.exports = exports['default'];