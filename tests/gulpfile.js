/* eslint-disable */

var appfy = require('../index.js');
var path = require('path');

const rootDir = __dirname;

appfy.init(rootDir, {
    customWatch: 'custom-file.txt',
    browserify: {
        extend: function (config, bundler) {
            return bundler.transform('babelify', {presets: ["es2015"]});
        }
    },
    postcss: {
        plugins: function (config, plugins) {
            plugins['precss'] = require('precss')();
            return plugins;
        },
        options: {
            parser: require('postcss-scss')
        }
    }
});

appfy.defineTasks();
