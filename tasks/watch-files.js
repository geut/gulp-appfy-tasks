import watch from 'gulp-watch';
import browserSync from 'browser-sync';
import path from 'path';
import runSequence from 'run-sequence';

/**
 * Gulp task to watch files
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
export default ( config ) => {
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
};
