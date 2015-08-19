import browserSync from 'browser-sync';

/**
 * Gulp task to create a server test
 * @param  {object} config Global configuration
 * @return {function}        Function task
 */
export default ( config ) => {
    return () => {
        browserSync( {
            port: config.browsersync.port,
            notify: config.browsersync.notify,
            server: {
                baseDir: './' + config.serverPath
            }
        } );
    };
};
