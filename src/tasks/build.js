import runSequence from 'run-sequence';

/**
 * Gulp task to build the app for production
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
export default ( config ) => {
    return ( cb ) => {
        if (config.isProduction) {
            runSequence( 'clean', 'browserify', 'postcss', cb );
        }
        config.debug = true;
        config.watchify = true;
        runSequence( 'browserify', 'postcss', cb );
    };
};
