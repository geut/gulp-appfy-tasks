# gulp-appfy-tasks
> Set of gulp tasks to create frontend components oriented apps.

## Objective
This project has a set of gulp task to create your frontend apps based in our personal components oriented programming solution.

## Tools used in the gulp tasks
- gulp
- browserify
- postcss
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
/**
 * Gulp tasks to work with browserify, reworkcss and others great tools
 */
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
    "assetsTemplate": "assets/[hash].[ext]", // relative to the distPath
    "serverPath": "",
    "entryCss": "index.css",
    "entryJs": "index.js",
    "entryHtml": "index.html",
    "browsersync": {
        "port": 3000,
        "notify": false
    },
    "notify": {
        "onError": false,
        "onUpdated": false
    },
    "browserify": {
        "extend": null,
        "options": {}
    },
    "postcss": {
        "plugins": null,
        "options": {}
    }
}
```
- userGulp (optional): If is necessary you can set a distinct gulp instance.
