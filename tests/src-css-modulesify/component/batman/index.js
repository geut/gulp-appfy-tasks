import $ from 'jquery';
import styles from './index.css';

export default () => {
    $('body').append(
        $(`<div class="${styles.batman}"><h2>I\'m batman!!!</h2></div>`)
    );
};
