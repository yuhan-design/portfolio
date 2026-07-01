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

	var rotatingAboutLabel = function() {
		var words = ['design', 'thinking'];
		var $pill = $('.fi-about-rotating-pill');
		var $current = $pill.find('.fi-about-rotating-text--current');
		var $next = $pill.find('.fi-about-rotating-text--next');
		if (!$pill.length || !$current.length || !$next.length) {
			return;
		}
		var index = 0;
		$current.text(words[index]);
		$next.text(words[(index + 1) % words.length]);

		setInterval(function() {
			var nextIndex = (index + 1) % words.length;
			$next.text(words[nextIndex]).removeClass('fi-about-rotating-text--out').addClass('fi-about-rotating-text--next');
			requestAnimationFrame(function() {
				$current.removeClass('fi-about-rotating-text--current').addClass('fi-about-rotating-text--out');
				$next.removeClass('fi-about-rotating-text--next').addClass('fi-about-rotating-text--current');
			});
			setTimeout(function() {
				$current.removeClass('fi-about-rotating-text--out');
				var temp = $current;
				$current = $next;
				$next = temp.addClass('fi-about-rotating-text--next').removeClass('fi-about-rotating-text--current');
				index = nextIndex;
			}, 360);
		}, 2000);
	};

	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		rotatingAboutLabel();
	});

	// Replace footer logo <img> with an inline, white-tinted SVG (does not overwrite original file)
	function replaceFooterLogoWithInlineWhite() {
		var img = document.querySelector('.fi-footer .fi-f-logo-icon-img');
		if (!img) return;
		var src = img.getAttribute('src');
		if (!src) return;
		fetch(src).then(function(res){ return res.text(); }).then(function(text){
			var parser = new DOMParser();
			var doc = parser.parseFromString(text, 'image/svg+xml');
			var svg = doc.querySelector('svg');
			if (!svg) return;
			svg.removeAttribute('width'); svg.removeAttribute('height');
			// Only replace occurrences of the specific dark color #15171E (or equivalent rgb) with white.
			function isTargetColor(val) {
				if (!val) return false;
				var v = val.trim().toLowerCase();
				if (v === 'none') return false;
				// normalize rgb spacing
				v = v.replace(/\s+/g, '');
				return v === '#15171e' || v === 'rgb(21,23,30)' || v === 'rgba(21,23,30,1)';
			}

			svg.querySelectorAll('[fill]').forEach(function(el){
				var f = el.getAttribute('fill');
				if (isTargetColor(f)) el.setAttribute('fill', 'white');
				// also handle inline style e.g. style="fill:#15171E;"
				var style = el.getAttribute('style');
				if (style && /fill\s*:\s*#?15171e/i.test(style)) {
					var newStyle = style.replace(/(fill\s*:\s*)#?15171e/ig, '$1white');
					el.setAttribute('style', newStyle);
				}
			});
			svg.querySelectorAll('[stroke]').forEach(function(el){
				var s = el.getAttribute('stroke');
				if (isTargetColor(s)) el.setAttribute('stroke', 'white');
				var style = el.getAttribute('style');
				if (style && /stroke\s*:\s*#?15171e/i.test(style)) {
					var newStyle = style.replace(/(stroke\s*:\s*)#?15171e/ig, '$1white');
					el.setAttribute('style', newStyle);
				}
			});
			// handle gradient stops
			svg.querySelectorAll('stop').forEach(function(stop){
				var sc = stop.getAttribute('stop-color');
				if (isTargetColor(sc)) stop.setAttribute('stop-color', 'white');
				var style = stop.getAttribute('style');
				if (style && /stop-color\s*:\s*#?15171e/i.test(style)) {
					var newStyle = style.replace(/(stop-color\s*:\s*)#?15171e/ig, '$1white');
					stop.setAttribute('style', newStyle);
				}
			});
			// preserve sizing class so CSS still applies
			svg.classList.add('fi-f-logo-icon-img');
			img.parentNode.replaceChild(svg, img);
		}).catch(function(err){ console.error('Failed to load footer SVG', err); });
	}

	// Run after DOM ready
	document.addEventListener('DOMContentLoaded', replaceFooterLogoWithInlineWhite);

}());