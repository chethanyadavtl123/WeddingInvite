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
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
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


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
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


	// Loading page
	var loaderPage = function() {
		// keep loader visible for at least 2 seconds before hiding
		setTimeout(function () {
			$(".fh5co-loader").fadeOut("slow");
		}, 1200);
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var parseCountdownDate = function (dateString) {
		var m = dateString.match(/^([0-9]{1,2})[-\/](?:([0-9]{1,2})[-\/])?([0-9]{4})\s+([0-9]{1,2})(?::([0-9]{2}))?\s*(AM|PM)?$/i);
		if (!m) { return new Date(); }
		var part1 = parseInt(m[1], 10), part2 = parseInt(m[2] || m[1], 10), year = parseInt(m[3], 10);
		var hour = parseInt(m[4], 10), minute = m[5] ? parseInt(m[5], 10) : 0, ampm = m[6] ? m[6].toUpperCase() : null;
		var day = part1, month = part2;
		if (ampm) {
			if (ampm === 'AM' && hour === 12) { hour = 0; }
			if (ampm === 'PM' && hour < 12) { hour += 12; }
		}
		return new Date(year, month - 1, day, hour, minute, 0);
	};

	var initReceptionCountdown = function (receptionDate) {
		var countdownElement = document.getElementById('receptionCountdown');
		var saveButton = document.getElementById('save-date');

		var hideCountdown = function () {
			if (countdownElement) { countdownElement.style.display = 'none'; }
			if (saveButton) { saveButton.style.display = 'none'; }
		};

		if (Date.now() >= receptionDate.getTime()) {
			hideCountdown();
			return;
		}

		simplyCountdown('#receptionCountdown', {
			year: receptionDate.getFullYear(),
			month: receptionDate.getMonth() + 1,
			day: receptionDate.getDate(),
			hours: receptionDate.getHours(),
			minutes: receptionDate.getMinutes(),
			enableUtc: false,
			inline: false,
			onEnd: function () {
				hideCountdown();
			}
		});
	};

	var scheduleThankYouMessage = function (thankYouDate) {
		var message = document.getElementById('post-countdown-message');

		var updateMessage = function () {
			if (!message) { return false; }
			if (Date.now() >= thankYouDate.getTime()) {
				message.style.display = 'block';
				return false;
			}
			message.style.display = 'none';
			return true;
		};

		updateMessage();
		var intervalId = setInterval(function () {
			if (!updateMessage()) {
				clearInterval(intervalId);
			}
		}, 1000);
	};

	$(function(){
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
		var receptionDate = parseCountdownDate('04-07-2026 06:30PM');
		var muhurthamDate = parseCountdownDate('05-07-2026 06:50AM');
		initReceptionCountdown(receptionDate);
		scheduleThankYouMessage(muhurthamDate);

		// Add Save-the-date handler: download .ics and open Google Calendar
		(function attachSaveDateHandler() {
			var saveBtn = document.getElementById('save-date');
			if (!saveBtn) { return; }
			saveBtn.addEventListener('click', function (e) {
				e.preventDefault();
				var title = 'Wedding: VinuthaShree T L & Dinesh G';
				var description = 'You are invited to our wedding on 4th and 5th July 2026 at Mayura Convention Hall.';
				var location = 'Mayura Convention Hall, Doddaballapura, Bengaluru, Karnataka 561203';
				var start = receptionDate;
				var end = new Date(receptionDate.getTime() + 3*60*60*1000);
				function formatDateForICS(d) {
					function pad(n){ return (n<10?'0':'')+n; }
					return d.getUTCFullYear()+''+pad(d.getUTCMonth()+1)+''+pad(d.getUTCDate())+'T'+pad(d.getUTCHours())+''+pad(d.getUTCMinutes())+''+pad(d.getUTCSeconds())+'Z';
				}
				var icsLines = [
					'BEGIN:VCALENDAR',
					'VERSION:2.0',
					'PRODID:-//Wedding Invite//EN',
					'BEGIN:VEVENT',
					'UID:'+Date.now()+'@wedding-invite',
					'DTSTAMP:'+formatDateForICS(new Date()),
					'SUMMARY:'+title,
					'DESCRIPTION:'+description,
					'LOCATION:'+location,
					'DTSTART:'+formatDateForICS(start),
					'DTEND:'+formatDateForICS(end),
					'END:VEVENT',
					'END:VCALENDAR'
				];
				var blob = new Blob([icsLines.join('\r\n')], {type:'text/calendar;charset=utf-8'});
				var url = URL.createObjectURL(blob);
				var a = document.createElement('a');
				a.href = url;
				a.download = 'save-the-date.ics';
				document.body.appendChild(a);
				a.click();
				setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
				var gCalUrl = 'https://www.google.com/calendar/render?action=TEMPLATE'
					+ '&text=' + encodeURIComponent(title)
					+ '&details=' + encodeURIComponent(description)
					+ '&location=' + encodeURIComponent(location)
					+ '&dates=' + formatDateForICS(start).replace(/Z$/,'') + '/' + formatDateForICS(end).replace(/Z$/,'');
				window.open(gCalUrl, '_blank');
			});
		})();

	});

// Ensure the page view starts at the top on navigation/reload/back-navigation
try {
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
} catch (e) {}
function _scrollToTop() { window.scrollTo(0, 0); }
document.addEventListener('DOMContentLoaded', _scrollToTop);
window.addEventListener('load', function () { setTimeout(_scrollToTop, 0); });
window.addEventListener('pageshow', function (e) { if (e.persisted) { setTimeout(_scrollToTop, 0); } });
window.addEventListener('popstate', _scrollToTop);


}());