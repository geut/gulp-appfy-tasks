import browserify from 'browserify';
import watchify from 'watchify';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import streamify from 'gulp-streamify';
import source from 'vinyl-source-stream';
import path from 'path';
import notify from 'gulp-notify';
import util from 'gulp-util';
import collapse from 'bundle-collapser/plugin';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';

/**
 * Gulp task to run browserify over config.entryJs
 * @param  {object} config Global configuration
 * @return {function}        Function task
 */
export default function browserifyTask(userConfig) {
    const gulp = this.gulp;
    const config = userConfig || this.config;
    let onBundleError;
    if (config.notify.onError) {
        onBundleError = notify.onError('Browserify Error: <%= error.message %>');
    } else {
        onBundleError = (err) => {
            util.log(util.colors.red('Error'), err.message);
        };
    }

    /**
     * Function to run the Browserify Bundler over pipes
     * @param  {object} bundler Bundler object
     * @return {object} stream  Gulp stream
     */
    function browserifyBundle(bundler) {
        if (config.isProduction) {
            bundler.plugin(collapse);
        }

        let stream = bundler.bundle()
            .on('error', onBundleError)
            .pipe(source('index.js'));

        if (config.isProduction) {
            stream = stream.pipe(streamify(uglify()));
        } else {
            // source map external
            stream = stream.pipe(buffer())
                .pipe(sourcemaps.init({
                    loadMaps: true
                }))
                .pipe(sourcemaps.write('./', {
                    sourceRoot: '/'
                }));
        }

        stream = stream.pipe(gulp.dest(config.destPath));

        if (config.watch) {
            stream.pipe(browserSync.stream({once: true}));
        }

        if (config.notify.onUpdated) {
            return stream.pipe(notify('Browserify Bundle - Updated'));
        }

        return stream;
    }

    return () => {
        let bundler = browserify({
            entries: path.join(config.sourcePath, config.entryJs),
            debug: !(config.isProduction)
        });

        config.browserify.transforms.forEach((elem) => {
            bundler = bundler.transform(elem);
        });

        config.browserify.plugins.forEach((elem) => {
            bundler = bundler.plugin(elem.module, elem.opts);
        });

        if (config.watch) {
            bundler = watchify(bundler);

            bundler.on('update', () => {
                browserifyBundle(bundler);
            });
        }

        return browserifyBundle(bundler);
    };
}
