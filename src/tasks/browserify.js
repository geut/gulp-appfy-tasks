import gulp from 'gulp';
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
export default function browserifyTask( userConfig ) {
    const config = userConfig || this.config;
    let onBundleError;
    if ( config.notify.onError ) {
        onBundleError = notify.onError( 'Browserify Error: <%= error.message %>' );
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
    function browserifyBundle( bundler ) {
        if ( !(config.debug) ) {
            bundler.plugin(collapse);
        }

        let stream = bundler.bundle()
            .on( 'error', onBundleError )
            .pipe( source( 'index.js' ) );

        if ( config.debug ) {
            // source map external
            stream = stream.pipe(buffer())
                .pipe(sourcemaps.init({
                    loadMaps: true
                }))
                .pipe(sourcemaps.write('./', {
                    sourceRoot: '/'
                }));
        } else {
            stream = stream.pipe( streamify( uglify() ) );
        }

        stream = stream.pipe( gulp.dest( config.destPath ) );

        if ( config.notify.onUpdated ) {
            return stream.pipe( notify( 'Browserify Bundle - Updated' ) );
        }

        return stream;
    }

    return () => {
        let bundler = browserify( {
            entries: path.join(config.sourcePath, config.entryJs),
            debug: config.debug || false
        } );
        bundler.plugin(require('css-modulesify'), {
            rootDir: config.basePath,
            output: path.join(config.destPath, config.entryCss)
        });

        if ( config.watchify ) {
            bundler = watchify( bundler );

            bundler.on( 'update', () => {
                browserifyBundle( bundler )
                    .pipe( browserSync.reload( {
                        stream: true
                    } ) );
            });
        }

        return browserifyBundle( bundler );
    };
}
