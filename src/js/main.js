///<reference path="jquery.d.ts" />
///<reference path="snapsvg.d.ts" />
'use strict';
$(document).ready(() => {
    var media = Snap('#svgMedia');
    var days = getDays();
    for (var i = 0; i < days; i++) {
        var day = media.rect((i * 25), 0, 25, 25);
    }
    ;
    // $.getJSON('data/media.json', function(data) {
    // 	console.log(data)
    // });
});
function getDays() {
    var day = 24 * 60 * 60 * 1000;
    var startDate = new Date(2013, 0, 1);
    var endDate = new Date((new Date().getFullYear() + 1), 0, 1);
    var total = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / (day)));
    return total;
}
console.log('main.ts');
