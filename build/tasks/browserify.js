'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = browserifyTask;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _watchify = require('watchify');

var _watchify2 = _interopRequireDefault(_watchify);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpStreamify = require('gulp-streamify');

var _gulpStreamify2 = _interopRequireDefault(_gulpStreamify);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpNotify = require('gulp-notify');

var _gulpNotify2 = _interopRequireDefault(_gulpNotify);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _bundleCollapserPlugin = require('bundle-collapser/plugin');

var _bundleCollapserPlugin2 = _interopRequireDefault(_bundleCollapserPlugin);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _vinylBuffer = require('vinyl-buffer');

var _vinylBuffer2 = _interopRequireDefault(_vinylBuffer);

/**
 * Gulp task to run browserify over config.entryJs
 * @param  {object} config Global configuration
 * @return {function}        Function task
 */

function browserifyTask(userConfig) {
    var config = userConfig || this.config;
    var onBundleError = undefined;
    if (config.notify.onError) {
        onBundleError = _gulpNotify2['default'].onError('Browserify Error: <%= error.message %>');
    } else {
        onBundleError = function (err) {
            _gulpUtil2['default'].log(_gulpUtil2['default'].colors.red('Error'), err.message);
        };
    }

    /**
     * Function to run the Browserify Bundler over pipes
     * @param  {object} bundler Bundler object
     * @return {object} stream  Gulp stream
     */
    function browserifyBundle(bundler) {
        if (config.isProduction) {
            bundler.plugin(_bundleCollapserPlugin2['default']);
        }

        var stream = bundler.bundle().on('error', onBundleError).pipe((0, _vinylSourceStream2['default'])('index.js'));

        if (!config.isProduction) {
            // source map external
            stream = stream.pipe((0, _vinylBuffer2['default'])()).pipe(_gulpSourcemaps2['default'].init({
                loadMaps: true
            })).pipe(_gulpSourcemaps2['default'].write('./', {
                sourceRoot: '/'
            }));
        } else {
            stream = stream.pipe((0, _gulpStreamify2['default'])((0, _gulpUglify2['default'])()));
        }

        stream = stream.pipe(_gulp2['default'].dest(config.destPath));

        if (config.notify.onUpdated) {
            return stream.pipe((0, _gulpNotify2['default'])('Browserify Bundle - Updated'));
        }

        return stream;
    }

    return function () {
        var bundler = (0, _browserify2['default'])({
            entries: _path2['default'].join(config.sourcePath, config.entryJs),
            debug: !config.isProduction
        });
        bundler.plugin(require('css-modulesify'), {
            rootDir: config.basePath,
            output: _path2['default'].join(config.destPath, config.entryCss)
        });

        if (config.watchify) {
            bundler = (0, _watchify2['default'])(bundler);

            bundler.on('update', function () {
                browserifyBundle(bundler).pipe(_browserSync2['default'].reload({
                    stream: true
                }));
            });
        }

        return browserifyBundle(bundler);
    };
}

module.exports = exports['default'];
//# sourceMappingURL=browserify.js.map