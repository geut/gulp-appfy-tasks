'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = cleanTask;

var _gulpRimraf = require('gulp-rimraf');

var _gulpRimraf2 = _interopRequireDefault(_gulpRimraf);

/**
 * Task clean
 * @param  {function} cb Callback
 * @return {function}      Function task
 */

function cleanTask(userConfig) {
    var gulp = this.gulp;
    var config = userConfig || this.config;
    return function () {
        return gulp.src(config.destPath, { read: false }).pipe((0, _gulpRimraf2['default'])({ force: true }));
    };
}

module.exports = exports['default'];
//# sourceMappingURL=clean.js.map