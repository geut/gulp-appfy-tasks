import browserSync from 'browser-sync';

/**
 * Gulp task to create a server test
 * @return {function}        Function task
 */
export default function browserSyncTask() {
    const config = this.config;
    return () => {
        browserSync.init(config.browsersync);
    };
}
