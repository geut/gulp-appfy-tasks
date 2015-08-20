/**
 * Set of gulp tasks.
 * author: geut
 */

/**
 * devDependencies
 */
import defaultGulp from 'gulp';
import defaultConfig from '../default-config.json';
import path from 'path';
import util from 'util';

/**
 * tasks import
 */
import cleanTask from './tasks/clean.js';
import browserifyTask from './tasks/browserify.js';
import postcssTask from './tasks/postcss.js';
import browserSyncTask from './tasks/browser-sync.js';
import watchFilesTask from './tasks/watch-files.js';
import buildTask from './tasks/build.js';
import serveTask from './tasks/serve.js';

const appfy = {
    tasks: {},
    init(basePath, userConfig, userGulp) {
        this.gulp = userGulp || defaultGulp;
        this.userConfig = userConfig;
        this.defaultConfig = defaultConfig;
        this.config = defaultConfig;
        if ( userConfig ) {
            this.config = util._extend(defaultConfig, userConfig);
        }
        /**
         * Autosettings
         */
        this.config.basePath = basePath;
        this.config.sourcePath = path.join( this.config.basePath, this.config.sourcePath );
        this.config.destPath = path.join( this.config.basePath, this.config.destPath );

        if (process.env && (process.env.NODE_ENV === 'production')) {
            this.config.isProduction = true;
        } else {
            this.config.isProduction = false;
        }

        /**
         * Autotasks
         */
        this.tasks.clean = cleanTask.bind(this);
        this.tasks.browserify = browserifyTask.bind(this);
        this.tasks.postcss = postcssTask.bind(this);
        this.tasks.browserSync = browserSyncTask.bind(this);
        this.tasks.watchFiles = watchFilesTask.bind(this);
        this.tasks.build = buildTask.bind(this);
        this.tasks.serve = serveTask.bind(this);
        return this;
    },
    defineTasks() {
        const runSequence = require('run-sequence').use(this.gulp);

        /**
         * Gulp task definitions
         */
        this.gulp.task( 'clean', this.tasks.clean() );
        this.gulp.task( 'browserify', this.tasks.browserify() );
        this.gulp.task( 'postcss', this.tasks.postcss() );
        this.gulp.task( 'browser-sync', this.tasks.browserSync() );
        this.gulp.task( 'watch-files', this.tasks.watchFiles() );

        this.gulp.task( 'build', this.tasks.build() );
        this.gulp.task( 'serve', this.tasks.serve() );

        this.gulp.task( 'default', function defaultTask( cb ) {
            runSequence( 'clean', 'build', 'serve', cb );
        } );
    }
};

export default appfy;
