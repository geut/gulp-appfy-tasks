import path from 'path';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import gutil from 'gulp-util';
import extend from 'extend';

// PostCSS and plugins
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssCopy from 'postcss-copy';

/**
 * Gulp task to process the css files usign PostCSS and cssnext
 * @return {function}       Function task
 */
export default function postcssTask() {
    const gulp = this.gulp;
    const config = this.config;
    const plumberOptions = {};
    if (config.notify.onError) {
        plumberOptions.errorHandler = notify.onError(
            'PostCSS Error: <%= error.message %>'
        );
    } else {
        plumberOptions.errorHandler = function errorHandler(err) {
            gutil.log(gutil.colors.bgBlack(err));
            this.emit('end');
        };
    }

    function loader(plugins = {}) {
        const list = [];

        Object.keys(plugins).forEach((key) => {
            const p = plugins[key];
            if (p.postcssVersion) {
                list.push(p);
            } else {
                list.push(p.plugin(p.options));
            }
        });

        return list;
    }

    // PostCSS plugins configuration
    let plugins = {
        'postcss-import': {
            plugin: postcssImport,
            options: {}
        },
        'postcss-copy': {
            plugin: postcssCopy,
            options: {
                src: [
                    config.sourcePath,
                    path.join(config.basePath, 'node_modules')
                ],
                dest: config.destPath,
                template: config.assetsTemplate,
                relativePath(dirname, fileMeta, result, opts) {
                    return opts.dest;
                }
            }
        }
    };

    if (config.postcss.plugins) {
        plugins = loader(config.postcss.plugins(config, plugins));
    } else {
        plugins = loader(plugins);
    }

    const postcssOptions = extend(true, {}, config.postcss.options, {
        to: path.join(config.destPath, config.entryCss)
    });

    return () => {
        let stream = gulp.src(path.join(config.sourcePath, config.entryCss))
            .pipe(plumber(plumberOptions))
            .pipe(postcss(plugins, postcssOptions));

        if (config.postcss.sourcemap) {
            stream = stream
                .pipe(sourcemaps.init({
                    loadMaps: true
                }))
                .pipe(sourcemaps.write('./', {
                    sourceRoot: '/' + path.basename(config.sourcePath)
                }));
        }

        stream = stream.pipe(gulp.dest(config.destPath));

        if (config.watch) {
            stream = stream.pipe(
                browserSync.stream({ match: '**/*.{css,scss,less}' })
            );
        }

        if (config.notify.onUpdated) {
            return stream.pipe(notify('PostCSS Bundle - Updated'));
        }

        return stream;
    };
}
