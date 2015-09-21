/**
 * Gulp tasks to work with browserify, reworkcss and others great tools
 */
var appfy = require('../index.js');
appfy.init(__dirname, {
    browserify: {
        extend: function (config, bundler) {
            return bundler.transform(require('babelify'));
        }
    },
    postcss: {
        plugins: function (config, defaultPlugins) {
            const list = defaultPlugins.load();
            list.push(require('precss')());
            return list;
        },
        options: {
            parser: require('postcss-scss')
        }
    }
});
appfy.defineTasks();
