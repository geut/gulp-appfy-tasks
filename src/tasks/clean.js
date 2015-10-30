import del from 'del';

/**
 * Clean task
 * @param  {function} cb Callback
 * @return {function}      Function task
 */
export default function cleanTask(userConfig) {
    const config = userConfig || this.config;
    return () => {
        return del([config.destPath]);
    };
}
