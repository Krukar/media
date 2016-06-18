///<reference path="d/jquery.d.ts" />
'use strict';
$(function () {
    var media = $('#media');
    var fadeIn = function () { return media.addClass('fade'); };
    var fadeOut = function () { return media.removeClass('fade'); };
    $.getJSON('data/media.json', function (data) {
        var days = $('li', media).not('.disabled');
        data.books.forEach(function (book) {
            var date = new Date(book.date);
            var dayNumber = getDayNumber(date);
            $(days[dayNumber]).addClass('book').attr('data-tip', book.title);
        });
        data.games.forEach(function (game) {
            var date = new Date(game.date);
            var dayNumber = getDayNumber(date);
            var attr = $(days[dayNumber]).attr('data-tip');
            if (attr) {
                $(days[dayNumber]).addClass('game').attr('data-tip', attr + ', ' + game.title);
            }
            else {
                $(days[dayNumber]).addClass('game').attr('data-tip', game.title);
            }
        });
        data.movies.forEach(function (movie) {
            var date = new Date(movie.date);
            var dayNumber = getDayNumber(date);
            var attr = $(days[dayNumber]).attr('data-tip');
            if (attr) {
                $(days[dayNumber]).addClass('movie').attr('data-tip', attr + ', ' + movie.title);
            }
            else {
                $(days[dayNumber]).addClass('movie').attr('data-tip', movie.title);
            }
        });
        var items = $('.book, .game, .movie');
        items.hover(function () {
            fadeIn();
            media.addClass($(this).attr('class'));
        }, function () {
            fadeOut();
            media.removeClass($(this).attr('class'));
        });
        var nav = $('#nav');
        $('li', nav).hover(function () {
            fadeIn();
            media.addClass($(this).attr('class'));
        }, function () {
            fadeOut();
            media.removeClass($(this).attr('class'));
        });
        $('.jan, .feb, .mar, .apr, .may, .jun, .jul, .aug, .sep, .oct, .nov, .dec', media).hover(function () {
            fadeIn();
            media.addClass($(this).attr('class').split(' ')[0]);
        }, function () {
            fadeOut();
            media.removeClass($(this).attr('class').split(' ')[0]);
        });
    }).fail(function () {
        media.html('Something went wrong :(');
    });
});
function getDayNumber(date) {
    var day = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
    return day;
}
console.log('main.ts');
