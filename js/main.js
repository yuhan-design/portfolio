;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		if (!$('.js-fh5co-nav-toggle').length) {
			var $toggle = $('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" aria-label="開啟選單"><i></i></a>');
			$('.fh5co-nav .container').first().append($toggle);
		} else {
			$('.js-fh5co-nav-toggle').appendTo($('.fh5co-nav .container').first());
		}
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	//  Category
	
    function setActiveFilterChip($btn) {
      $('.pf-filter-bar .pf-chip')
        .removeClass('is-active')
        .attr({ 'aria-pressed': 'false', 'aria-selected': 'false' });
      $btn.addClass('is-active').attr({ 'aria-pressed': 'true', 'aria-selected': 'true' });
    }

    function updateFilterCounts() {
      var $posts = $('.posts .post');
      if (!$posts.length || !$('.pf-filter-bar').length) {
        return;
      }

      var $showAll = $('#showall');
      if ($showAll.length) {
        $showAll.find('.pf-chip-count').text($posts.length);
        $showAll.attr('aria-label', 'Show All，' + $posts.length + ' 件作品');
      }

      $('.pf-filter-bar .pf-chip').not('#showall').each(function () {
        var id = this.id;
        var count = $('.posts .post.' + id).length;
        var $chip = $(this);
        $chip.find('.pf-chip-count').text(count);
        var label = $chip.find('.pf-chip-label').text();
        $chip.attr('aria-label', label + '，' + count + ' 件作品');
      });
    }

    updateFilterCounts();

    var $filterChips = $('.pf-filter-bar .pf-chip');
    if ($filterChips.length) {
      $filterChips.filter('#showall').addClass('is-active').attr('aria-pressed', 'true');
    }

    $('.pf-filter-bar .pf-chip').click(function(){
      var get_id = this.id;
      var $btn = $(this);
      setActiveFilterChip($btn);

      if (get_id === 'showall') {
        $('.post').show(500);
        return;
      }

      var get_current = $('.posts .' + get_id);
      $('.post').not(get_current).hide(500);
      get_current.show(500);
    });


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	
	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
	});



}());