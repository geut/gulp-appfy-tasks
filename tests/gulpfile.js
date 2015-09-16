/**
 * Gulp tasks to work with browserify, reworkcss and others great tools
 */
var appfy = require('../index.js');
appfy.init(__dirname, {
    browserify: {
        transforms: [
            require('babelify')
        ]
    },
    postcssPlugins: {
        after: [
            require('precss')()
        ]
    }
});
appfy.defineTasks();
