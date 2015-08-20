'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = postcssTask;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpNotify = require('gulp-notify');

var _gulpNotify2 = _interopRequireDefault(_gulpNotify);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

// PostCSS and plugins

var _gulpPostcss = require('gulp-postcss');

var _gulpPostcss2 = _interopRequireDefault(_gulpPostcss);

var _postcssImport = require('postcss-import');

var _postcssImport2 = _interopRequireDefault(_postcssImport);

var _postcssUrl = require('postcss-url');

var _postcssUrl2 = _interopRequireDefault(_postcssUrl);

var _cssnano = require('cssnano');

var _cssnano2 = _interopRequireDefault(_cssnano);

/**
 * Gulp task to process the css files usign PostCSS and cssnext
 * @param  {object} config Global configuration
 * @return {function}       Function task
 */

function postcssTask(userConfig) {
    var config = userConfig || this.config;
    var plumberOptions = {};
    if (config.notify.onError) {
        plumberOptions.errorHandler = _gulpNotify2['default'].onError('PostCSS Error: <%= error.message %>');
    }

    return function () {
        /**
         * TODO: check the sourcemap problems
         */
        var processors = [(0, _postcssImport2['default'])(), (0, _postcssUrl2['default'])({
            url: config.debug ? 'rebase' : 'copy'
        }), (0, _cssnano2['default'])()];

        var stream = _gulp2['default'].src(_path2['default'].join(config.sourcePath, config.entryCss)).pipe((0, _gulpPlumber2['default'])(plumberOptions)).pipe((0, _gulpPostcss2['default'])(processors, {
            map: config.debug || false,
            to: _path2['default'].join(config.destPath, config.entryCss)
        }));

        if (config.debug) {
            stream = stream.pipe(_gulpSourcemaps2['default'].init({
                loadMaps: true
            })).pipe(_gulpSourcemaps2['default'].write('./', {
                sourceRoot: '/' + _path2['default'].basename(config.sourcePath)
            }));
        }

        stream = stream.pipe(_gulp2['default'].dest(config.destPath));

        if (config.notify.onUpdated) {
            return stream.pipe((0, _gulpNotify2['default'])('PostCSS Bundle - Updated'));
        }

        return stream;
    };
}

module.exports = exports['default'];
//# sourceMappingURL=postcss.js.map