import watch from 'gulp-watch';
import browserSync from 'browser-sync';
import path from 'path';

/**
 * Gulp task to watch files
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
export default function watchFilesTask( userConfig ) {
    const config = userConfig || this.config;
    const runSequence = require('run-sequence').use(this.gulp);
    const stylesSourceWatch = [
        path.join(config.sourcePath, 'node_modules/**/*.css'),
        path.join(config.sourcePath, 'styles/**/*.css'),
        path.join(config.sourcePath, config.entryCss)
    ];

    return () => {
        watch( path.join(config.basePath, config.serverPath, 'index.html'), () => {
            runSequence( 'dev', browserSync.reload );
        } );

        watch( stylesSourceWatch, () => {
            runSequence( 'postcss', browserSync.reload );
        } );
    };
}
