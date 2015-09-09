import watch from 'gulp-watch';
import browserSync from 'browser-sync';
import path from 'path';

/**
 * Gulp task to watch files
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
export default function watchFilesTask(userConfig) {
    const config = userConfig || this.config;
    const runSequence = require('run-sequence').use(this.gulp);

    return () => {
        watch(path.join(config.basePath, config.serverPath, 'index.html'), () => {
            runSequence('build', browserSync.reload);
        });

        watch(path.join(config.sourcePath, '**/*.{css,scss,less}'), () => {
            runSequence('postcss');
        });
    };
}
