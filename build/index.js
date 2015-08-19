/**
 * Set of gulp tasks.
 * author: geut
 */

/**
 * devDependencies
 */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _defaultConfigJson = require('../default-config.json');

var _defaultConfigJson2 = _interopRequireDefault(_defaultConfigJson);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

/**
 * tasks import
 */

var _tasksCleanJs = require('./tasks/clean.js');

var _tasksCleanJs2 = _interopRequireDefault(_tasksCleanJs);

var _tasksBrowserifyJs = require('./tasks/browserify.js');

var _tasksBrowserifyJs2 = _interopRequireDefault(_tasksBrowserifyJs);

var _tasksPostcssJs = require('./tasks/postcss.js');

var _tasksPostcssJs2 = _interopRequireDefault(_tasksPostcssJs);

var _tasksBrowserSyncJs = require('./tasks/browser-sync.js');

var _tasksBrowserSyncJs2 = _interopRequireDefault(_tasksBrowserSyncJs);

var _tasksWatchFilesJs = require('./tasks/watch-files.js');

var _tasksWatchFilesJs2 = _interopRequireDefault(_tasksWatchFilesJs);

var _tasksBuildJs = require('./tasks/build.js');

var _tasksBuildJs2 = _interopRequireDefault(_tasksBuildJs);

var _tasksServeJs = require('./tasks/serve.js');

var _tasksServeJs2 = _interopRequireDefault(_tasksServeJs);

var appfy = {
    tasks: {
        clean: _tasksCleanJs2['default'],
        browserify: _tasksBrowserifyJs2['default'],
        postcss: _tasksPostcssJs2['default'],
        browserSync: _tasksBrowserSyncJs2['default'],
        watchFiles: _tasksWatchFilesJs2['default'],
        build: _tasksBuildJs2['default'],
        serve: _tasksServeJs2['default']
    },
    init: function init(basePath, userConfig) {
        this.userConfig = userConfig;
        this.defaultConfig = _defaultConfigJson2['default'];
        this.config = _defaultConfigJson2['default'];
        if (userConfig) {
            this.config = _util2['default']._extend(_defaultConfigJson2['default'], userConfig);
        }
        /**
         * Autosettings
         */
        this.config.basePath = basePath;
        this.config.sourcePath = _path2['default'].join(this.config.basePath, this.config.sourcePath);
        this.config.destPath = _path2['default'].join(this.config.basePath, this.config.destPath);

        if (process.env && process.env.NODE_ENV === 'production') {
            this.config.isProduction = true;
        } else {
            this.config.isProduction = false;
        }
        return this;
    },
    defineTasks: function defineTasks() {
        /**
         * Gulp task definitions
         */
        _gulp2['default'].task('clean', this.tasks.clean(this.config));
        _gulp2['default'].task('browserify', this.tasks.browserify(this.config));
        _gulp2['default'].task('postcss', this.tasks.postcss(this.config));
        _gulp2['default'].task('browser-sync', this.tasks.browserSync(this.config));
        _gulp2['default'].task('watch-files', this.tasks.watchFiles(this.config));

        _gulp2['default'].task('build', this.tasks.build(this.config));
        _gulp2['default'].task('serve', this.tasks.serve(this.config));

        _gulp2['default'].task('default', function defaultTask(cb) {
            (0, _runSequence2['default'])('clean', 'build', 'serve', cb);
        });
    }
};

exports['default'] = appfy;
module.exports = exports['default'];