import browserify from 'browserify';
import watchify from 'watchify';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import path from 'path';
import notify from 'gulp-notify';
import util from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import extend from 'extend';

/**
 * Gulp task to run browserify over config.entryJS
 * @return {function}        Function task
 */
export default function browserifyTask() {
    const gulp = this.gulp;
    const config = this.config;
    let onBundleError;
    if (config.notify.onError) {
        onBundleError = notify.onError(
            'Browserify Error: <%= error.message %>'
        );
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
        let stream = bundler.bundle()
            .on('error', onBundleError)
            .pipe(source('index.js'))
            .pipe(buffer());

        if (config.browserify.sourcemap) {
            // source map external
            stream = stream.pipe(sourcemaps.init({
                loadMaps: true
            }));
        }

        if (config.browserify.uglify) {
            stream = stream.pipe(uglify(config.browserify.uglify));
        }

        if (config.browserify.sourcemap) {
            // source map external
            stream = stream.pipe(sourcemaps.write('./', {
                sourceRoot: '/'
            }));
        }

        stream = stream.pipe(gulp.dest(config.destPath));

        if (config.watch) {
            stream.pipe(browserSync.stream({ once: true }));
        }

        if (config.notify.onUpdated) {
            return stream.pipe(notify('Browserify Bundle - Updated'));
        }

        return stream;
    }

    return () => {
        const cacheOptions = {};
        if (config.watch) {
            cacheOptions.cache = {};
            cacheOptions.packageCache = {};
        }

        let bundler = browserify(extend(true, {}, config.browserify.options, {
            entries: path.join(config.sourcePath, config.entryJS),
            debug: config.browserify.sourcemap
        }, cacheOptions));

        if (config.browserify.extend) {
            bundler = config.browserify.extend(config, bundler);
        }

        if (config.watch) {
            bundler = bundler.plugin(watchify, config.browserify.watchify);

            bundler.on('update', () => {
                browserifyBundle(bundler);
            });
        }

        return browserifyBundle(bundler);
    };
}
