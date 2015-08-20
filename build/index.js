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
    tasks: {},
    init: function init(basePath, userConfig, userGulp) {
        this.gulp = userGulp || _gulp2['default'];
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

        /**
         * Autotasks
         */
        this.tasks.clean = _tasksCleanJs2['default'].bind(this);
        this.tasks.browserify = _tasksBrowserifyJs2['default'].bind(this);
        this.tasks.postcss = _tasksPostcssJs2['default'].bind(this);
        this.tasks.browserSync = _tasksBrowserSyncJs2['default'].bind(this);
        this.tasks.watchFiles = _tasksWatchFilesJs2['default'].bind(this);
        this.tasks.build = _tasksBuildJs2['default'].bind(this);
        this.tasks.serve = _tasksServeJs2['default'].bind(this);
        return this;
    },
    defineTasks: function defineTasks() {
        var runSequence = require('run-sequence').use(this.gulp);

        /**
         * Gulp task definitions
         */
        this.gulp.task('clean', this.tasks.clean());
        this.gulp.task('browserify', this.tasks.browserify());
        this.gulp.task('postcss', this.tasks.postcss());
        this.gulp.task('browser-sync', this.tasks.browserSync());
        this.gulp.task('watch-files', this.tasks.watchFiles());

        this.gulp.task('build', this.tasks.build());
        this.gulp.task('serve', this.tasks.serve());

        this.gulp.task('default', function defaultTask(cb) {
            runSequence('clean', 'build', 'serve', cb);
        });
    }
};

exports['default'] = appfy;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map