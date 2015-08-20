/**
 * Gulp task to build the app for production
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
export default function buildTask( userConfig ) {
    const config = userConfig || this.config;
    const runSequence = require('run-sequence').use(this.gulp);

    return ( cb ) => {
        if (config.isProduction) {
            runSequence( 'clean', 'browserify', 'postcss', cb );
        } else {
            config.debug = true;
            config.watchify = true;
            runSequence( 'browserify', 'postcss', cb );
        }
    };
}
