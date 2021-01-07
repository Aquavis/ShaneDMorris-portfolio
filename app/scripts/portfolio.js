document.body.onload = function(){
	$('.portfolio').slick({
		prevArrow: document.getElementById('previous'),
		nextArrow: document.getElementById('next'),
		infinite:true,
		slidesToShow:1,
		slidesToScroll:1,
		adaptiveHeight: true,
		draggable: false,
		swipe:false
	});
	$('.portfolio').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	});
}