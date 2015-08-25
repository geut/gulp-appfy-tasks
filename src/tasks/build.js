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
            runSequence( 'browserify', 'postcss', cb );
        }
    };
}
