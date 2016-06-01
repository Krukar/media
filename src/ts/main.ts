///<reference path="jquery.d.ts" />

'use strict';

$(document).ready(() => {

	let total: number = getWeeks();
	let list: any = $('#media');
	let weeks: string = '';

	for(let i = 0; i < total; i++){
		let week: string = '<li class="week"><ul><li class="day monday"></li><li class="day tuesday"></li><li class="day wednesday"></li><li class="day thursday"></li><li class="day friday"></li><li class="day saturday"></li><li class="day sunday"></li></ul></li>';
		weeks += week;
	}

	list.html(weeks);

	$.getJSON('data/media.json', function(data: any) {

		data.books.forEach(function(book : any) {
			let date : Date = new Date(book.date); 
			let dayNumber: number = getDayNumber(date);
			$('li.day:eq(' + dayNumber + ')', list).addClass('book');
		});

		data.games.forEach(function(game : any) {
			let date : Date = new Date(game.date); 
			let dayNumber: number = getDayNumber(date);
			$('li.day:eq(' + dayNumber + ')', list).addClass('game');
		});

		data.movies.forEach(function(movie : any) {
			let date : Date = new Date(movie.date); 
			let dayNumber: number = getDayNumber(date);
			$('li.day:eq(' + dayNumber + ')', list).addClass('movie');
		});
	});

});

function getWeeks(){
	let total: number = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - new Date((new Date().getFullYear() + 1), 0, 1).getTime()) / (24 * 7 * 60 * 60 * 1000)));
	return total;
}

function getDayNumber(date : Date){
	let day: number = Math.round(Math.abs((new Date(2013, 0, 1).getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
	return day;
}

console.log('main.ts');   