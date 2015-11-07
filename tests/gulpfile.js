var appfy = require('../index.js');
var path = require('path');

const rootDir = __dirname;

if (process.argv.indexOf('modules') !== -1) {
    appfy.init(rootDir, {
        sourcePath: 'src-css-modulesify',
        browserify: {
            extend: function (config, bundler) {
                return bundler
                    .transform(require('babelify'))
                    .plugin(require('css-modulesify'), {
                        rootDir: rootDir,
                        output: path.join(config.destPath, config.entryCss),
                        postcssAfter: [
                            require('postcss-copy')({
                                src: ['src', 'node_modules'],
                                dest: config.destPath,
                                keepRelativePath: false,
                                template: config.assetsTemplate,
                                inputPath: function (decl) {
                                    var filePath = decl.source.input.file;
                                    if (filePath.indexOf(rootDir) === -1) {
                                        filePath = filePath.slice(1, filePath.length);
                                    }
                                    return path.dirname(filePath);
                                }
                            })
                        ]
                    });
            }
        },
        postcss: false
    });
} else {
    appfy.init(rootDir, {
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
}

appfy.defineTasks();
