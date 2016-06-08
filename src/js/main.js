///<reference path="jquery.d.ts" />
'use strict';
$(document).ready(function () {
    var total = getWeeks();
    var list = $('#media');
    var weeks = '';
    for (var i = 0; i < total; i++) {
        var week = '<li class="day monday"></li><li class="day tuesday"></li><li class="day wednesday"></li><li class="day thursday"></li><li class="day friday"></li><li class="day saturday"></li><li class="day sunday"></li>';
        weeks += week;
    }
    list.html(weeks);
    $.getJSON('data/media.json', function (data) {
        data.books.forEach(function (book) {
            var date = new Date(book.date);
            var dayNumber = getDayNumber(date);
            $('li.day:eq(' + dayNumber + ')', list).addClass('book');
        });
        data.games.forEach(function (game) {
            var date = new Date(game.date);
            var dayNumber = getDayNumber(date);
            $('li.day:eq(' + dayNumber + ')', list).addClass('game');
        });
        data.movies.forEach(function (movie) {
            var date = new Date(movie.date);
            var dayNumber = getDayNumber(date);
            $('li.day:eq(' + dayNumber + ')', list).addClass('movie');
        });
        $('.day.book, .day.game, .day.movie').hover(function () {
            $('.day').addClass('fade');
            $(this).addClass('active');
        }, function () {
            $('.day').removeClass('fade');
            $(this).removeClass('active');
        });
    });
    list.on('click', function () {
        $(this).toggleClass('border');
    });
});
function getWeeks() {
    var total = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - new Date((new Date().getFullYear() + 1), 0, 1).getTime()) / (24 * 7 * 60 * 60 * 1000)));
    return total;
}
function getDayNumber(date) {
    var day = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
    return day;
}
console.log('main.ts');
