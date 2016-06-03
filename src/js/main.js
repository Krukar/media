///<reference path="jquery.d.ts" />
'use strict';
$(document).ready(function () {
    var total = getWeeks();
    var list = $('#media');
    var weeks = '';
    var index;
    var layerOne;
    var layerTwo;
    for (var i = 0; i < total; i++) {
        var week = '<li class="week"><ul><li id="' + (i * 7 + 1) + '" class="day monday"></li><li id="' + (i * 7 + 2) + '" class="day tuesday"></li><li id="' + (i * 7 + 3) + '" class="day wednesday"></li><li id="' + (i * 7 + 4) + '" class="day thursday"></li><li id="' + (i * 7 + 5) + '" class="day friday"></li><li id="' + (i * 7 + 6) + '" class="day saturday"></li><li id="' + (i * 7 + 7) + '" class="day sunday"></li></ul></li>';
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
            index = parseInt($(this).attr('id')) - 1;
            layerOne = [
                index - 1,
                index + 1,
                index - 7,
                index + 7,
                index - 8,
                index + 6,
                index - 6,
                index + 8,
            ];
            $.each(layerOne, function (i, v) {
                $('.day').eq(v).addClass('layerOne');
            });
            layerTwo = [
                index - 2,
                index - 2 - 7,
                index + 2 + 3,
                index - 2 - 7 - 7,
                index + 2 + 3 + 7,
                index + 2,
                index + 2 - 7,
                index + 2 + 7,
                index + 2 - 7 - 7,
                index + 2 + 7 + 7,
                index - 7 - 7,
                index - 7 - 8,
                index - 7 - 6,
                index + 7 + 7,
                index + 7 + 6,
                index + 7 + 8 // right bottom
            ];
            $.each(layerTwo, function (i, v) {
                $('.day').eq(v).addClass('layerTwo');
            });
        }, function () {
            $('.day').removeClass('layerOne layerTwo');
        });
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
