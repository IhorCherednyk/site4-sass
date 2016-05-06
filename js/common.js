$(function() {
	// MNU
	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".main-mnu").slideToggle();
		return false;
	});

	// Carousel

	$(".slider").owlCarousel({
		loop:true,
		items:1,
		nav:true,
		navText:false,
		navSpeed:1000,
		dotsSpeed:1000
	});
	$(".a-slide").owlCarousel({
		loop:true,
		items:1,
		nav:true,
		navText:false,
		navSpeed:1000,
		dotsSpeed:1000
	});
	$('.blog-slider').owlCarousel({
		margin:2,
		loop:true,
		autoWidth:true,
		items:5,
		nav:true,
		navText:false
	})
	//Carousel castomize
	var owl = $('.owl-carousel');
	function matrixToArray(matrix) {
		return matrix.substr(9, matrix.length - 10).split(', ');
	}
	owl.on('initialized.owl.carousel', function(event){
		var el = $(".blog .owl-item.active");
		el.each(function(index, el) {
			if(index == 0){
				$(el).css("opacity","1");
				var a = $(this.children).get(0).id;
				var c = $(".news-slider-wrapper").find( $(".news-slider-item") )
				c.each(function(index,c){
					$(this).removeClass("active")
					if(c.dataset.name == a){
						var x = $(this)
						x.addClass("active")
					}
				});
				return false;
			}
		});
		matrix = matrixToArray($(".blog .owl-stage").css('transform'));
		var a = +matrix[3];
		console.log(a);
		if(a==0){
			$(".blog .owl-prev").addClass("prev-bg");
		}
	});

	owl.on('translated.owl.carousel', function(event) {
		var el = $(".blog .owl-item.active");
		var wholeEl = $(".blog .owl-item");
		wholeEl.css("opacity","0.33");
		el.each(function(index, el) {
			if(index == 0){
				$(el).css("opacity","1");
				var a = $(this.children).get(0).id;
				var c = $(".news-slider-wrapper").find( $(".news-slider-item") )
				c.each(function(index,c){
					$(this).removeClass("active")
					if(c.dataset.name == a){
						var x = $(this)
						x.addClass("active");
					}

				});
			}
		});

	});

	$(".about").waypoint(function() {
		$(".about-img").each(function(index) {
			var ths = $(this);
			setTimeout(function() {
				ths.addClass("on");
			}, 200*index);
		});
	}, {
		offset : "30%"
	});
	$(".map").waypoint(function() {
		$(".adres, .map-form").each(function(index) {
			var ths = $(this);
			setTimeout(function() {
				ths.addClass("on");
			}, 200*index);
		});
	}, {
		offset : "20%"
	});

	$(".gotop").on("click",function(){
		$('html, body').animate({scrollTop: 0},500);
		return false;
	})

	//Servise item click
	$(document).on('click', '.s-servise .servise-img a', function(e){
		e.preventDefault();
		$(".servise-item").removeClass("active");
		$(this).closest(".servise-item").addClass("active");
		var dest = $(this).attr('href');
		$('.s-servise-active.tabs-content').fadeOut(600);
		$(dest).fadeIn(600);  
	});


	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	//POPUP MAGNIFIC
	
	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
		
	});



	
	//SvG Converter
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	$('img.img-svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
		// Get the SVG tag, ignore the rest
		var $svg = $(data).find('svg');

		// Add replaced image's ID to the new SVG
		if(typeof imgID !== 'undefined') {
			$svg = $svg.attr('id', imgID);
		}
		// Add replaced image's classes to the new SVG
		if(typeof imgClass !== 'undefined') {
			$svg = $svg.attr('class', imgClass+' replaced-svg');
		}

		// Remove any invalid XML tags as per http://validator.w3.org
		$svg = $svg.removeAttr('xmlns:a');

		// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
		if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
			$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
		}

		// Replace image with new SVG
		$img.replaceWith($svg);

	}, 'xml');

	});

});
