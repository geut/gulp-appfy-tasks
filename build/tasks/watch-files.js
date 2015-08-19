'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _gulpWatch = require('gulp-watch');

var _gulpWatch2 = _interopRequireDefault(_gulpWatch);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

/**
 * Gulp task to watch files
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */

exports['default'] = function (config) {
    var stylesSourceWatch = [_path2['default'].join(config.sourcePath, 'node_modules/**/*.css'), _path2['default'].join(config.sourcePath, 'styles/**/*.css'), _path2['default'].join(config.sourcePath, config.entryCss)];

    return function () {
        (0, _gulpWatch2['default'])(_path2['default'].join(config.basePath, config.serverPath, 'index.html'), function () {
            (0, _runSequence2['default'])('dev', _browserSync2['default'].reload);
        });

        (0, _gulpWatch2['default'])(stylesSourceWatch, function () {
            (0, _runSequence2['default'])('postcss', _browserSync2['default'].reload);
        });
    };
};

module.exports = exports['default'];