import del from 'del';
import path from 'path';
/**
 * Clean task
 * @return {function}      Function task
 */
export default function cleanTask() {
    const config = this.config;
    return () => {
        return del([path.join(config.destPath, '*')]);
    };
}
