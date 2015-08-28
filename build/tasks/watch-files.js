'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = watchFilesTask;

var _gulpWatch = require('gulp-watch');

var _gulpWatch2 = _interopRequireDefault(_gulpWatch);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

/**
 * Gulp task to watch files
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */

function watchFilesTask(userConfig) {
    var config = userConfig || this.config;
    var runSequence = require('run-sequence').use(this.gulp);

    return function () {
        (0, _gulpWatch2['default'])(_path2['default'].join(config.basePath, config.serverPath, 'index.html'), function () {
            runSequence('build', _browserSync2['default'].reload);
        });

        (0, _gulpWatch2['default'])(_path2['default'].join(config.sourcePath, '**/*.{css,scss,less}'), function () {
            runSequence('postcss', _browserSync2['default'].reload);
        });
    };
}

module.exports = exports['default'];
//# sourceMappingURL=watch-files.js.map