var $ = require('jquery'),
    batman = require('batman');

var styles = require('./index.css');
batman();

$('body').append($('<div class="' + styles.superman + '"><h2>I\'m superman!!!</h2></div>'));
