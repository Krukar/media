///<reference path="d/jquery.d.ts" />
'use strict';
$(document).ready(function () {
    var media = $('#media');
    $.getJSON('data/media.json', function (data) {
        data.books.forEach(function (book) {
            var date = new Date(book.date);
            var dayNumber = getDayNumber(date);
            console.log(dayNumber);
            $('li.day:eq(' + dayNumber + ')', media).addClass('book');
        });
        data.games.forEach(function (game) {
            var date = new Date(game.date);
            var dayNumber = getDayNumber(date);
            $('li.day:eq(' + dayNumber + ')', media).addClass('game');
        });
        data.movies.forEach(function (movie) {
            var date = new Date(movie.date);
            var dayNumber = getDayNumber(date);
            $('li.day:eq(' + dayNumber + ')', media).addClass('movie');
        });
        var items = $('.day.book, .day.game, .day.movie');
        items.hover(function () {
            items.not(this).addClass('fade');
        }, function () {
            items.not(this).removeClass('fade');
        });
    });
});
function getDayNumber(date) {
    var day = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
    return day;
}
console.log('main.ts');
