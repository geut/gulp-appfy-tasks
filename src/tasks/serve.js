/**
 * Gulp task to execute a server test with the app builded in mode 'env'
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
export default function serveTask( userConfig ) {
    const config = userConfig || this.config;
    const runSequence = require('run-sequence').use(this.gulp);

    return ( cb ) => {
        runSequence( 'browser-sync', 'watch-files', cb );
    };
}
