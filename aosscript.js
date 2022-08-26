AOS.init();
$(document).ready(function() {
var stickyNavTop = $('.nav-header').offset().top;
 
var stickyNav = function(){
var scrollTop = $(window).scrollTop();
      
if (scrollTop > stickyNavTop) { 
    $('.nav-header').addClass('sticky');
} else {
    $('.nav-header').removeClass('sticky'); 
}
};
 
stickyNav();
 
$(window).scroll(function() {
  stickyNav();
});
});