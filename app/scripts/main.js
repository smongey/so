/* jshint devel:true */
"use strict";

var l = function (honk) { console.log(honk); };

var so = {
	$w : $(window),
	$d : $(document),
	$b : $('body'),
	page : ''
};


so.$d.keypress(function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 103) {
    	$('.grid').toggleClass('active');
    	console.log('triggered');
    }
});

so.updateMenu = function(){
	var page = so.$w[0].location.pathname;
	// get current page url 
	// if nav has same value add class of active
	$('nav li a').each(function(){
		var navItem = $(this).text().toLowerCase();
		if(page.indexOf(navItem) > -1) {
			$('nav li a').removeClass('active');
			$(this).addClass('active');
		} 
		if(page === "/" || page === "/index.html") {
			$('nav li a').removeClass('active');
		}
	});

}

so.fadeInItems = function(){
	if (so.$w[0].location.pathname === "/" || so.$w[0].location.pathname === "/index.html" || so.$w[0].location.pathname === "/so/") {
		setTimeout(function(){
			$('.intro').children().removeClass('out');
		}, 500);
	}
}

so.$d.ready(function(){
	
	so.updateMenu();

	so.productSwitch();

});

so.pageLoad = function(){

	so.updateMenu();
}

so.cartIcon = function(){

	if (so.page.indexOf('shop') > - 1) {
		$('header a.cart').addClass('active');
	} else {
		$('header a.cart').removeClass('active');
	}
}

so.ajaxCall = function(page, contents) {


	$('html').animate({'scrollTop': 0}, 500, 'easeInOutQuint');
	$('#wrap').addClass('out');

	if (page.indexOf('about') > -1 || page.indexOf('contact') > -1) {
		$('body').addClass('invert');
	} else {
		$('body').removeClass('invert');
	}

	so.cartIcon();
	
	history.pushState({}, null, page);

	setTimeout(function(){
		$('#wrap > *').remove();
		$('#wrap').load(contents, function(){
			so.productSwitch();
			setTimeout(function(){
				$('#wrap').removeClass('out');	
				
			}, 300);
		});
	}, 500);
	so.updateMenu();
}

// On Page Load
so.$w.load(function(){

	so.page = so.$w[0].location.pathname;

	l(so.page);

	so.fadeInItems();
	// so.cartIcon();
	
});


// Interactions
//		clicks
so.$d.on('click', 'a.top', function(){

	$('html, body').animate({ scrollTop: 0 }, 700, 'easeInOutQuint');

//		ajax nav
}).on('click', 'header a, .product:not(.page) a, footer a', function(e){

	e.preventDefault();
	so.page = $(this)[0].pathname;
	var contents = so.page + ' #wrap > *';

	so.ajaxCall(so.page, contents);


}).on('click', '.intro a.view', function(e){

	e.preventDefault();
	$('html, body').animate({ scrollTop: so.introH }, 800, 'easeInOutQuint');

}).on('click', '.thumbs a', function(e){
	
	e.preventDefault();
	l(e);

}).on('click', '.dropdown li a', function(e){
	e.preventDefault();
	l('clicked');
	// $('.dropdown li a').removeClass('active');
	// $('.dropdown div').addClass('hide');
	$(this).toggleClass('active')
	$(this).next().toggleClass('hide');
});

//		popstate
so.$w.on('popstate', function(e) {

	so.page = window.location.href;
	var contents = so.page + ' #wrap > *';

	if (e.originalEvent.state !== null) {
		//l(e.originalEvent.state);
		// so.ajaxCall(so.page, contents);
		l(so.page);

		$('html').animate({'scrollTop': 0}, 500, 'easeInOutQuint');
		$('#wrap').addClass('out');

		if (so.page.indexOf('about') > -1 || so.page.indexOf('contact') > -1) {
			$('body').addClass('invert');
		} else {
			$('body').removeClass('invert');
		}

		so.cartIcon();
		
		setTimeout(function(){
			$('#wrap > *').remove();
			$('#wrap').load(contents, function(){
				setTimeout(function(){
					$('#wrap').removeClass('out');	
					
				}, 300);
			});
		}, 500);
		so.updateMenu();

	}
});


so.introH = $('section.intro').height();
so.intro = true;
so.position = so.$w.scrollTop();

// 		Scroll
so.$d.on('scroll touchmove', function(e){
	var currentScrollPos = so.$w[0].pageYOffset;


	// remove intro after full scroll
	if (currentScrollPos >= so.introH && so.intro === true) {
		$('section.intro').remove();
		$('html, body').animate({ scrollTop:0 }, 0);
		$('.homething').addClass('out');
		so.intro = false;
	}

	// fade in elements after a bit
	if (currentScrollPos >= so.introH / 2 && $('#wrap').hasClass('out')) { 
		$('#wrap').removeClass('out');
	}


	// bring in menu
	var scroll = so.$w.scrollTop();
	if (so.intro === false) {
		// change to mini nav
	    if (so.$d.scrollTop() > 60) {
	    	$('header').addClass('locked');
	    } else {
	    	$('header').removeClass('locked');
	    }
    }

});



so.productSwitch = function() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('.info').before($('.gallery'));
	}
}


