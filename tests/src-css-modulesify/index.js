import $ from 'jquery';
const batman = require('batman');

batman();

const testArrow = () => {
    console.log('working');
}
testArrow();

$('body').append($('<div class="superman"><h2>test I\'m superman!!!</h2></div>'));
