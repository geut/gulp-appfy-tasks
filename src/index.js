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
import extend from 'extend';

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
        this.config = defaultConfig;
        extend(true, this.config, userConfig);

        /**
         * Autosettings
         */
        this.config.basePath = basePath;
        this.config.sourcePath = path.join(
            this.config.basePath,
            this.config.sourcePath
        );
        this.config.destPath = path.join(
            this.config.basePath,
            this.config.destPath
        );

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
        /**
         * Gulp task definitions
         */
        this.gulp.task( 'clean', this.tasks.clean() );
        if (this.config.browserify) {
            this.gulp.task( 'browserify', this.tasks.browserify() );
        }
        if (this.config.postcss) {
            this.gulp.task( 'postcss', this.tasks.postcss() );
        }
        this.gulp.task( 'browser-sync', this.tasks.browserSync() );
        this.gulp.task( 'watch-files', this.tasks.watchFiles() );

        this.gulp.task( 'build', this.tasks.build() );
        this.gulp.task( 'serve', this.tasks.serve() );

        this.gulp.task( 'default', ['serve']);
    }
};

export default appfy;
