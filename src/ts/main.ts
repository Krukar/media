///<reference path="d/jquery.d.ts" />

'use strict';

$(document).ready(() => {

	let media: any = $('#media');

	$.getJSON('data/media.json', function(data: any) {

		data.books.forEach(function(book: any) {
			let date: Date = new Date(book.date); 
			let dayNumber: number = getDayNumber(date);
			console.log(dayNumber)
			$('li.day:eq(' + dayNumber + ')', media).addClass('book');
		});

		data.games.forEach(function(game: any) {
			let date: Date = new Date(game.date); 
			let dayNumber: number = getDayNumber(date);
			$('li.day:eq(' + dayNumber + ')', media).addClass('game');
		});

		data.movies.forEach(function(movie: any) {
			let date: Date = new Date(movie.date); 
			let dayNumber: number = getDayNumber(date);
			$('li.day:eq(' + dayNumber + ')', media).addClass('movie');
		});

		let items: any = $('.day.book, .day.game, .day.movie');

		items.hover(function(){
			items.not(this).addClass('fade');
			
		},function(){
			items.not(this).removeClass('fade');
		});

	});

});

function getDayNumber(date : Date){
	let day: number = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
	return day;
}

console.log('main.ts');   