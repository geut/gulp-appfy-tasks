import $ from 'jquery';
import styles from './index.css';
import batman from './component/batman';

batman();

$('body').append(
    $(`<div class="${styles.superman}"><h2>test I\'m superman!!!</h2></div>`)
);
