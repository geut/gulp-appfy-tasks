'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

/**
 * Task clean
 * @param  {function} cb Callback
 * @return {function}      Function task
 */

exports['default'] = function (config) {
    return function (cb) {
        (0, _del2['default'])(config.destPath, cb);
    };
};

module.exports = exports['default'];