# gulp-appfy-tasks
> Set of gulp tasks to create frontend components oriented apps.

## Objective
This project has a set of gulp task to create your frontend apps based in our personal components oriented programming solution.

## Tools used in the gulp tasks
- gulp
- browserify
- postcss (with postcss-copy and postcss-import)
- browser-sync
- notify

## Gulp task list
- browser-sync: Task to start a browser-sync instance.
- browserify: Task to compile your JavaScript files.
- clean: Task to delete the **dist** folder.
- postcss: Task to compile your CSS files.
- build: Task to compile all your files (JS, CSS, assets..)
- serve: Task to start a server.
- watch-files: Task to watch for CSS and index.html changes. For the JS files we use **watchify** defined in the browserify task.

## <a name="install"></a> Install

With [npm](https://npmjs.com/package/gulp-appfy-tasks) do:

```
npm install gulp-appfy-tasks --save-dev
```

## <a name="usage"></a> Usage

Create a gulpfile.js in your root folder (if you don't have it yet) and write this.

```javascript
var appfy = require('gulp-appfy-tasks');
appfy.init(__dirname);
appfy.defineTasks();
```

If you define the appfy as above remember that you need respect the [default configuration schemes](#userConfig)

## <a name="api"></a> API

### ```init``` Function
This function initialize the appfy object.

#### Params
- basePath (required): Define the root path of your app.
- <a name="userConfig"></a> userConfig (optional): Override the default configuration.
```javascript
{
  "sourcePath": "src",
  "destPath": "dist",
  "assetsTemplate": "assets/[hash].[ext]",
  "entryCss": "index.css",
  "entryJs": "index.js",
  "entryHtml": "index.html",
  "browsersync": {
    "port": 3000,
    "notify": false,
    "server": {
      "baseDir": "./"
    }
  },
  "notify": {
    "onError": false,
    "onUpdated": false
  },
  "browserify": {
    "sourcemap": true,
    "collapse": false,
    "uglify": false,
    "extend": null,
    "options": {}
  },
  "postcss": {
    "sourcemap": true,
    "plugins": null,
    "options": {}
  }
}
```
- userGulp (optional): If is necessary you can set a distinct gulp instance.

### ```defineTasks``` Function
Initialize the default gulp tasks of appfy.

## Some code examples to help you

### How override the default tasks?
Maybe you think that this is a big library but this is not that case. Appfy is only a set of gulp task so you can override the task really easier.

```javascript
var gulp = require('gulp');
var appfy = require('gulp-appfy-tasks');
appfy.init(__dirname);
appfy.defineTasks();

// override the "clean" task
gulp.task('clean', function (cb) {
    console.log('i override the clean task');
    cb();
});
```

### How can i extend or set options for browserify?
You can extend the broserify instance or set options with ```userConfig```

```javascript
var appfy = require('gulp-appfy-tasks');
appfy.init(__dirname, {
    browserify: {
        extend: function (config, bundler) {
            return bundler.transform(require('babelify'));
        },
        options: {} // API official options for browserify
    },
});
appfy.defineTasks();
```

### How can i extend or set options for postcss?
You can extend the postcss instance or set options with ```userConfig```

```javascript
var appfy = require('gulp-appfy-tasks');
appfy.init(__dirname, {
    postcss: {
        plugins: function (config, defaultPlugins) {
            // appfy comes with two excellent postcss plugins: postcss-copy and postcss-import
            var list = defaultPlugins.load();
            list.push(require('precss')());
            return list;
        },
        options: {
            parser: require('postcss-scss') // API official options for postcss
        }
    }
});
appfy.defineTasks();
```
