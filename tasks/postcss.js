import gulp from 'gulp';
import path from 'path';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

// PostCSS and plugins
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import nano from 'cssnano';

/**
 * Gulp task to process the css files usign PostCSS and cssnext
 * @param  {object} config Global configuration
 * @return {function}       Function task
 */
export default (config) => {
    const plumberOptions = {};
    if (config.notify.onError) {
        plumberOptions.errorHandler = notify.onError('PostCSS Error: <%= error.message %>');
    }

    return () => {
        /**
         * TODO: check the sourcemap problems
         */
        const processors = [
            postcssImport(),
            postcssUrl({
                url: config.debug ? 'rebase' : 'copy'
            }),
            nano()
        ];

        let stream = gulp.src(path.join(config.sourcePath, config.entryCss))
            .pipe(plumber(plumberOptions))
            .pipe( postcss(processors, {
                map: config.debug || false,
                to: path.join(config.destPath, config.entryCss)
            }) );

        if ( config.debug ) {
            stream = stream
                .pipe(sourcemaps.init({
                    loadMaps: true
                }))
                .pipe(sourcemaps.write('./', {
                    sourceRoot: '/' + path.basename(config.sourcePath)
                }));
        }

        stream = stream.pipe(gulp.dest(config.destPath));

        if (config.notify.onUpdated) {
            return stream.pipe(notify('PostCSS Bundle - Updated'));
        }

        return stream;
    };
};
