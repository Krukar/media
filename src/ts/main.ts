///<reference path="jquery.d.ts" />

'use strict';

$(document).ready(() => {

	let total: number = getWeeks();
	let list: any = $('#media');
	let weeks: string = '';
	let index: number;
	let layerOne: any;
	let layerTwo: any;

	for(let i = 0; i < total; i++){
		let week: string = '<li class="week"><ul><li id="' + (i * 7 + 1) + '" class="day monday"></li><li id="' + (i * 7 + 2) + '" class="day tuesday"></li><li id="' + (i * 7 + 3) + '" class="day wednesday"></li><li id="' + (i * 7 + 4) + '" class="day thursday"></li><li id="' + (i * 7 + 5) + '" class="day friday"></li><li id="' + (i * 7 + 6) + '" class="day saturday"></li><li id="' + (i * 7 + 7) + '" class="day sunday"></li></ul></li>';
		weeks += week;
	}

	list.html(weeks);

	$.getJSON('data/media.json', function(data: any) {

		data.books.forEach(function(book: any) {
			let date: Date = new Date(book.date); 
			let dayNumber: number = getDayNumber(date);
			$('li.day:eq(' + dayNumber + ')', list).addClass('book');
		});

		data.games.forEach(function(game: any) {
			let date: Date = new Date(game.date); 
			let dayNumber: number = getDayNumber(date);
			$('li.day:eq(' + dayNumber + ')', list).addClass('game');
		});

		data.movies.forEach(function(movie: any) {
			let date: Date = new Date(movie.date); 
			let dayNumber: number = getDayNumber(date);
			$('li.day:eq(' + dayNumber + ')', list).addClass('movie');
		});

		$('.day.book, .day.game, .day.movie').hover(function(){
			index = parseInt($(this).attr('id')) - 1;

			layerOne = [
			index - 1, // up
			index + 1, // down
			index - 7, // left
			index + 7, // right
			index - 8, // top left
			index + 6, // top right
			index - 6, // bottom left
			index + 8, // bottom right
			];
			
			$.each(layerOne, function(i, v) {
				$('.day').eq(v).addClass('layerOne')
			});

			layerTwo = [
			index - 2, // up
			index - 2 - 7, // top left
			index + 2 + 3, // top right
			index - 2 - 7 - 7, // top left left
			index + 2 + 3 + 7, // top right right
			index + 2, // down
			index + 2 - 7, // bottom left
			index + 2 + 7, // bottom right
			index + 2 - 7 - 7, // bottom left left
			index + 2 + 7 + 7, // bottom right right
			index - 7 - 7, // left
			index - 7 - 8, // left top
			index - 7 - 6, // left bottom
			index + 7 + 7, // right
			index + 7 + 6, // right top
			index + 7 + 8 // right bottom
			];

			$.each(layerTwo, function(i, v) {
				$('.day').eq(v).addClass('layerTwo')
			});

		},function(){

			$('.day').removeClass('layerOne layerTwo');

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