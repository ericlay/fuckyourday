$(document).ready(function() {
	/* Main Carousel---------------- */
	$('#myCarousel').carousel({
	  interval: 3000
	});
	
	/* Topmost Carousel---------------- */
	$('#myCarouselTop').carousel({
	  interval: 3000
	});
	
	/* Price Plan---------------- */
	$('.plan').click(function(event) {
		$('.plan').removeClass("selected");
        $(this).toggleClass("selected");
        });
	/* =========================================== */
	
	// Apply Bootstrap Scrollspy to show active navigation link based on page scrolling
	$('.navbar').scrollspy();
    
    // Scroll page with easing effect
    $('.navbar ul li a').bind('click', function(e) {
        e.preventDefault();
        target = this.hash;
        $.scrollTo(target, 1500, {
        	easing: 'easeOutCubic'
        });

        $(".btn-navbar").click();
   	});


	// Show/Hide Sticky "Go top" button
	$(window).scroll(function(){
		if($(this).scrollTop()>200){
			$(".go-top").fadeIn(200);
		}
		else{
			$(".go-top").fadeOut(200);	
		}
	});
	
	// Scroll Page to Top when clicked on "go top" button
	$(".brand, .go-top").click(function(event){
		event.preventDefault();

		$.scrollTo('#bodySection', 1500, {
        	easing: 'easeOutCubic'
        });
	});
	
	// Light Box
	
	$("area[rel^='prettyPhoto']").prettyPhoto();
	$(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: true});
	$(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});

	
	
})