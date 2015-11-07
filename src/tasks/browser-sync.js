import browserSync from 'browser-sync';

/**
 * Gulp task to create a server test
 * @param  {object} config Global configuration
 * @return {function}        Function task
 */
export default function browserSyncTask(userConfig) {
    const config = userConfig || this.config;
    return () => {
        browserSync.init(config.browsersync);
    };
}
