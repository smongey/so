/* jshint devel:true */
"use strict";

var l = function (honk) { console.log(honk); };

var so = {
	$w : $(window),
	$d : $(document),
	$b : $('body')
};


so.$d.keypress(function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 103) {
    	$('.grid').toggleClass('active');
    	console.log('triggered');
    }
});
