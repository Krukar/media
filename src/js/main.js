///<reference path="jquery.d.ts" />
'use strict';
$(document).ready(() => {
    let list = $('#days');
    let total = getDays();
    let days = '';
    for (let i = 0; i < total; i++) {
        let cssClass = 'day';
        let day = '<li class="' + cssClass + '"></li>';
        days += day;
    }
    list.html(days);
    $.getJSON('data/media.json', function (data) {
        data.books.forEach(function (book) {
            let date = new Date(book.date);
            let dayNumber = getDayNumber(date);
            $('li:eq(' + dayNumber + ')', list).addClass('book');
        });
        data.games.forEach(function (game) {
            let date = new Date(game.date);
            let dayNumber = getDayNumber(date);
            $('li:eq(' + dayNumber + ')', list).addClass('game');
        });
        data.movies.forEach(function (movie) {
            let date = new Date(movie.date);
            let dayNumber = getDayNumber(date);
            $('li:eq(' + dayNumber + ')', list).addClass('movie');
        });
    });
});
function getDays() {
    let total = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - new Date((new Date().getFullYear() + 1), 0, 1).getTime()) / (24 * 60 * 60 * 1000)));
    return total;
}
function getDayNumber(date) {
    let day = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
    return day;
}
console.log('main.ts');
