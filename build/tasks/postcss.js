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
        // /**
        //  * TODO: i'm trying replace this task with the css-modulesify, maybe is going to be deprecated!
        //  */
        // const processors = [
        //     postcssImport(),
        //     postcssUrl({
        //         url: config.debug ? 'rebase' : 'copy'
        //     }),
        //     nano()
        // ];
        //
        // let stream = gulp.src(path.join(config.sourcePath, config.entryCss))
        //     .pipe(plumber(plumberOptions))
        //     .pipe( postcss(processors, {
        //         map: config.debug || false,
        //         to: path.join(config.destPath, config.entryCss)
        //     }) );
        //
        // if ( config.debug ) {
        //     stream = stream
        //         .pipe(sourcemaps.init({
        //             loadMaps: true
        //         }))
        //         .pipe(sourcemaps.write('./', {
        //             sourceRoot: '/' + path.basename(config.sourcePath)
        //         }));
        // }
        //
        // stream = stream.pipe(gulp.dest(config.destPath));
        //
        // if (config.notify.onUpdated) {
        //     return stream.pipe(notify('PostCSS Bundle - Updated'));
        // }
        //
        // return stream;
    };
}

module.exports = exports['default'];
//# sourceMappingURL=postcss.js.map