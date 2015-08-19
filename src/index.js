/**
 * Set of gulp tasks.
 * author: geut
 */

/**
 * devDependencies
 */
import gulp from 'gulp';
import defaultConfig from '../default-config.json';
import path from 'path';
import util from 'util';
import runSequence from 'run-sequence';

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
    tasks: {
        clean: cleanTask,
        browserify: browserifyTask,
        postcss: postcssTask,
        browserSync: browserSyncTask,
        watchFiles: watchFilesTask,
        build: buildTask,
        serve: serveTask
    },
    init(basePath, userConfig) {
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
        return this;
    },
    defineTasks() {
        /**
         * Gulp task definitions
         */
        gulp.task( 'clean', this.tasks.clean(this.config) );
        gulp.task( 'browserify', this.tasks.browserify(this.config) );
        gulp.task( 'postcss', this.tasks.postcss(this.config) );
        gulp.task( 'browser-sync', this.tasks.browserSync(this.config) );
        gulp.task( 'watch-files', this.tasks.watchFiles(this.config) );

        gulp.task( 'build', this.tasks.build(this.config) );
        gulp.task( 'serve', this.tasks.serve(this.config) );

        gulp.task( 'default', function defaultTask( cb ) {
            runSequence( 'clean', 'build', 'serve', cb );
        } );
    }
};

export default appfy;
