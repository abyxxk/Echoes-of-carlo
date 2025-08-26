/* ===================================================================
 * Hesed 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : ''   // mailchimp url
                };
    const $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    const doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = $('.header-menu-toggle');
        const nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });

    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };

    
   /* Smooth Scrolling
    * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {
        
        const pxShow      = 500;
        const $goTopButton = $(".ss-go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();

    })();

})(jQuery);


fetch('Tought.json')   // adjust path if needed (e.g., 'data/Tought.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector(".main-activee"); // target main-active
    container.innerHTML = ""; // clear existing content

    data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("activee"); // each entry will be activee
      div.innerHTML = `
        <div class="nm">
          <img src="images/T-image/${item.image}" alt="${item.name}" class="yehh">
          <span>${item.name}</span>
        </div>    
        <div class="toought">${item.to}</div> 
      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error("Error loading JSON:", error));

fetch('active.json')   
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector(".main-active"); // target main-active
    container.innerHTML = ""; // clear existing content

    data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("active"); // each entry will be activee
      div.innerHTML = `
                <div class="day">Day-${item.Day}</div>
                <span class="head"><span>Prayers<span/> : ${item.act}</span>
                <div class="phot">
                    <img src="images/Black and White Modern Minimalist Church Event Praise and Worship Instagram Post.png" alt="" class="photo">
                    <img src="images/Black and White Modern Minimalist Church Event Praise and Worship Instagram Post.png" alt="" class="photo">
                </div>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error("Error loading JSON:", error));