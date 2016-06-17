///<reference path="d/jquery.d.ts" />
'use strict';

$(function() {

	let media: any = $('#media');

	$.getJSON('data/media.json', function(data) {
		let days: any = $('li', media).not('.disabled');			

		data.books.forEach(function(book: any) {
			let date: Date = new Date(book.date); 
			let dayNumber: number = getDayNumber(date);
			$(days[dayNumber]).addClass('book').attr('data-tip', book.title);
		});

		data.games.forEach(function(game: any) {
			let date: Date = new Date(game.date); 
			let dayNumber: number = getDayNumber(date);
			let attr: any = $(days[dayNumber]).attr('data-tip');
			if (attr) {
				$(days[dayNumber]).addClass('game').attr('data-tip', attr + ', ' + game.title);
			}
			else {
				$(days[dayNumber]).addClass('game').attr('data-tip', game.title);
			}
		});

		data.movies.forEach(function(movie: any) {
			let date: Date = new Date(movie.date); 
			let dayNumber: number = getDayNumber(date);
			let attr: any = $(days[dayNumber]).attr('data-tip');
			if(attr){
				$(days[dayNumber]).addClass('movie').attr('data-tip', attr + ', ' + movie.title);
			}
			else{
				$(days[dayNumber]).addClass('movie').attr('data-tip', movie.title);
			}
		});

		let items: any = $('.book, .game, .movie');

		items.hover(function(){
			media.addClass('fade');
		}, function(){
			media.removeClass('fade');
		});

	})
	.fail(function(){
		media.html('Something went wrong :(')
	});
	
}); 

function getDayNumber(date : Date){
	let day: number = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
	return day;
}

console.log('main.ts');   