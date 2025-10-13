(function ($) {
	
	"use strict";

	// Header Type = Fixed
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });


	$('.owl-banner').owlCarousel({
		items:1,
		loop:true,
		dots: true,
		nav: false,
		autoplay: true,
		margin:0,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:1
			  },
			  1000:{
				  items:1
			  },
			  1600:{
				  items:1
			  }
		  }
	})

    $('.owl-services').owlCarousel({
        items:4,
        loop:true,
        dots: true,
        nav: false,
        autoplay: true,
        margin:5,
          responsive:{
              0:{
                  items:1
              },
              600:{
                  items:2
              },
              1000:{
                  items:3
              },
              1600:{
                  items:4
              }
          }
    })

    $('.owl-portfolio').owlCarousel({
        items:4,
        loop:true,
        dots: true,
        nav: true,
        autoplay: true,
        margin:30,
          responsive:{
              0:{
                  items:1
              },
              700:{
                  items:2
              },
              1000:{
                  items:3
              },
              1600:{
                  items:4
              }
          }
    })

    

	// Menu Dropdown Toggle
  if($('.menu-trigger').length){
    $(".menu-trigger").on('click', function() { 
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }


  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var width = $(window).width();
        if(width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);  
        }       
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
      $(document).on("scroll", onScroll);
      
  $('.scroll-to-section a[href^="#"]').on('click', function (e) {
  e.preventDefault();
  $(document).off("scroll");

  $('.scroll-to-section a').removeClass('active');
  $(this).addClass('active');

  var hash = this.hash;
  var $target = $(hash);

  if ($target.length) { // ✅ only if element exists
    $('html, body').stop().animate({
      scrollTop: ($target.offset().top) + 1
    }, 500, 'swing', function () {
      window.location.hash = hash;
      $(document).on("scroll", onScroll);
    });
  } else {
    console.warn("No element found for hash:", hash);
  }
  });
});



function onScroll(event){
  var scrollPos = $(document).scrollTop();
  $('.nav a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));

      if (refElement.length) { // ✅ check element exists
        if (refElement.position().top <= scrollPos &&
            refElement.position().top + refElement.height() > scrollPos) {
            $('.nav ul li a').removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
      }
  });
}



	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });

	

	// Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function() {
      if(width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }

document.addEventListener("DOMContentLoaded", function() {
  const bgEls = document.querySelectorAll('.main-banner .bg');
  if (!bgEls.length) return;

  let current = 0;
  bgEls[current].classList.add('active');

  const slideDuration = 5000; // 5 seconds
  setInterval(() => {
    const next = (current + 1) % bgEls.length;

    // fade in next before fading out current
    bgEls[next].classList.add('active');

    // after a short delay, fade out current
    setTimeout(() => {
      bgEls[current].classList.remove('active');
      current = next;
    }, 1000); // 1s crossfade overlap
  }, slideDuration);
});


$(document).ready(function() {

  // Initialize Owl Carousel
  const $owl = $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    animateOut: "fadeOut"
  });

  // Typing effect
  function typeText(el, text, speed = 50) {
    el.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  function runTyping(slide) {
    slide.querySelectorAll(".typed").forEach(el => {
      typeText(el, el.dataset.text);
    });
  }

  // Run typing on the first slide after Owl initializes
  $owl.on("initialized.owl.carousel", function() {
    const firstSlide = document.querySelector(".owl-item.active .header-text");
    if (firstSlide) runTyping(firstSlide);
  });

  // Run typing on every slide change
  $owl.on("changed.owl.carousel", function(event) {
    const index = event.item.index;
    const currentSlide = event.target.querySelectorAll(".owl-item")[index].querySelector(".header-text");
    if (currentSlide) runTyping(currentSlide);
  });

});


// Detect when elements enter viewport
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      
    }else{
      entry.target.classList.remove('visible'); //fade out when leaving
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


// Select all counters
const counters = document.querySelectorAll('.count-digit');

counters.forEach(counter => {
  const numberNode = counter.childNodes[0]; // the numeric text node
  const target = +counter.getAttribute('data-target'); // get target from data-target

  const updateCount = () => {
    const current = +numberNode.textContent;
    const increment = Math.ceil(target / 100); // adjust speed

    if (current < target) {
      numberNode.textContent = current + increment;
      setTimeout(updateCount, 20); // smaller = faster
    } else {
      numberNode.textContent = target; // ensure final value
    }
  };

  // Trigger counting only when in viewport
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(counter);
});


//modal processing for submission
document.addEventListener("DOMContentLoaded", function() {
  const forms = document.querySelectorAll("form[action='https://api.web3forms.com/submit']");
  const popup = document.getElementById("popupModal");
  const closePopup = document.getElementById("closePopup");

  forms.forEach(form => {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.textContent;

      // Disable button and show loading text
      submitBtn.disabled = true;
      submitBtn.textContent = "Processing...";
      submitBtn.style.opacity = "0.7";
      submitBtn.style.cursor = "not-allowed";

      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          popup.style.display = "flex";
          form.reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        alert("Network error. Please try again.");
      }

      // Restore button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
    });
  });

  closePopup.onclick = () => popup.style.display = "none";
  window.onclick = (e) => {
    if (e.target === popup) popup.style.display = "none";
  };
});





})(window.jQuery);