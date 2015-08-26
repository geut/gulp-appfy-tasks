import rimraf from 'gulp-rimraf';

/**
 * Task clean
 * @param  {function} cb Callback
 * @return {function}      Function task
 */
export default function cleanTask( userConfig ) {
    const gulp = this.gulp;
    const config = userConfig || this.config;
    return () => {
        return gulp.src(config.destPath, { read: false })
            .pipe(rimraf({ force: true }));
    };
}
