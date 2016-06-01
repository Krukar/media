///<reference path="jquery.d.ts" />
'use strict';
$(document).ready(() => {
    let total = getWeeks();
    let list = $('#media');
    let weeks = '';
    for (let i = 0; i < total; i++) {
        let week = '<li class="week"><ul><li class="day monday"></li><li class="day tuesday"></li><li class="day wednesday"></li><li class="day thursday"></li><li class="day friday"></li><li class="day saturday"></li><li class="day sunday"></li></ul></li>';
        weeks += week;
    }
    list.html(weeks);
    $.getJSON('data/media.json', function (data) {
        data.books.forEach(function (book) {
            let date = new Date(book.date);
            let dayNumber = getDayNumber(date);
            $('li.day:eq(' + dayNumber + ')', list).addClass('book');
        });
        data.games.forEach(function (game) {
            let date = new Date(game.date);
            let dayNumber = getDayNumber(date);
            $('li.day:eq(' + dayNumber + ')', list).addClass('game');
        });
        data.movies.forEach(function (movie) {
            let date = new Date(movie.date);
            let dayNumber = getDayNumber(date);
            $('li.day:eq(' + dayNumber + ')', list).addClass('movie');
        });
    });
});
function getWeeks() {
    let total = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - new Date((new Date().getFullYear() + 1), 0, 1).getTime()) / (24 * 7 * 60 * 60 * 1000)));
    return total;
}
function getDayNumber(date) {
    let day = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
    return day;
}
console.log('main.ts');
