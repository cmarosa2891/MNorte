$(document).ready(function(){
	var altura = $('.menu').offset().top;
	
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura ){
			$('.menu').addClass('menu-fixed');
            $('.portada').addClass('portadagrey');
            $('.nav-title').addClass('nav-title-fixed');
		} else {
			$('.menu').removeClass('menu-fixed');
            $('.portada').removeClass('portadagrey');
            $('.nav-title').removeClass('nav-title-fixed');
		}
	});

});