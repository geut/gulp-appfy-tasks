/**
 * Gulp tasks to work with browserify, reworkcss and others great tools
 */
var gulp = require('gulp');
var appfy = require('../index.js');
appfy.init(__dirname);
appfy.defineTasks();
