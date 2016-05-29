///<reference path="jquery.d.ts" />

'use strict';

$(document).ready(() => {

	let list = $('#days');
	let total: number = getDays();
	let days: string = '';

	for (let i = 0; i < total; i++) {
		let cssClass: string = 'day';
		let day: string = '<li class="' + cssClass + '"></li>';
		days += day;
	}

	list.html(days);	

	$.getJSON('data/media.json', function(data: any) {
		data.books.forEach(function(book : any) {
			let date : Date = new Date(book.date); 
			let dayNumber: number = getDayNumber(date);
			$('li:eq(' + dayNumber + ')', list).addClass('book');
		});

		data.games.forEach(function(game: any) {
			let date: Date = new Date(game.date);
			let dayNumber: number = getDayNumber(date);
			$('li:eq(' + dayNumber + ')', list).addClass('game');
		});

		data.movies.forEach(function(movie: any) {
			let date: Date = new Date(movie.date);
			let dayNumber: number = getDayNumber(date);
			$('li:eq(' + dayNumber + ')', list).addClass('movie');
		});
	});

});

function getDays(){
	let total: number = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - new Date((new Date().getFullYear() + 1), 0, 1).getTime()) / (24 * 60 * 60 * 1000)));
	return total;
}

function getDayNumber(date : Date){
	let day: number = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
	return day;
}

console.log('main.ts');   