import watch from 'gulp-watch';
import browserSync from 'browser-sync';
import path from 'path';

/**
 * Gulp task to watch files
 * @return {function}      Function task
 */
export default function watchFilesTask() {
    const config = this.config;
    const runSequence = require('run-sequence').use(this.gulp);

    return () => {
        if (config.entryHTML) {
            watch(
                path.join(
                    config.basePath,
                    config.browsersync.server.baseDir,
                    config.entryHTML
                ),
                () => {
                    runSequence('build', browserSync.reload);
                }
            );
        }

        if (config.postcss) {
            watch(path.join(config.sourcePath, '**/*.{css,scss,less}'), () => {
                runSequence('postcss');
            });
        }

        if (config.customWatch) {
            if (typeof config.customWatch === 'function') {
                config.customWatch(config, watch, browserSync);
            } else {
                watch(config.customWatch, () => {
                    runSequence('build', browserSync.reload);
                });
            }
        }
    };
}
