import del from 'del';

/**
 * Task clean
 * @param  {function} cb Callback
 * @return {function}      Function task
 */
export default ( config ) => {
    return ( cb ) => {
        del( config.destPath, cb );
    };
};
