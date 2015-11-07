import del from 'del';
import path from 'path';
/**
 * Clean task
 * @param  {function} cb Callback
 * @return {function}      Function task
 */
export default function cleanTask(userConfig) {
    const config = userConfig || this.config;
    return () => {
        return del([path.join(config.destPath, '*')]);
    };
}
