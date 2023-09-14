
$(document).ready(function () {

    var displayWidth = $(window).width();
    display(displayWidth);

    $(window).resize(function(event) {

        displayWidth = $(window).width();
        display(displayWidth);
        $("body").removeClass('menueOpen');
        $('.menu-toggle-wrapper').removeClass('active');

    })

    $('.menu-open').on('click', function() {

        /*
        if($("body").hasClass('menueOpen')){
            closeMobileMenu();
            return false;
        } else {
            openMobileMenu();
            return false;
        }
         */

        openMobileMenu();
        return false;

    });


    $('.menu-close .menu-toggle').on('click', function() {
        closeMobileMenu();
        return false;
    });

    function display(displayWidth) {

        var breakpointNavigation = 1500, nav = $('.navigation'), wlNav = $("#wl-nav");

        if(displayWidth <= breakpointNavigation){

            //$('html').click(function(e) {
            $('html').on("click touchstart",function(e) {
                if (!nav.is(e.target) && nav.has(e.target).length === 0){
                    if($("body").hasClass('menueOpen')) {
                        closeMobileMenu();
                    }
                }
            });

            if($("body").hasClass('menueOpen')){
                wlNav.addClass('displayShow');
                wlNav.removeClass('displayHide');
                nav.addClass('statusOff');
                nav.removeClass('statusOn');
            } else {
                nav.addClass('displayHide');
                nav.removeClass('displayShow');
            }

        } else {
            wlNav.addClass('displayShow');
            wlNav.removeClass('displayHide');
            nav.removeClass('statusOff');
        }

    }

    function closeMobileMenu() {

        var nav = $('.navigation'), wlNav = $("#wl-nav"), body = $("body"), toggle = $('.menu-toggle-wrapper');

        if(body.hasClass('menueOpen')){
            toggle.removeClass('active');
            body.removeClass('menueOpen');
            wlNav.addClass('displayHide');
            wlNav.removeClass('displayShow');
            nav.addClass('statusOff');
            nav.removeClass('statusOn');
        }

    }

    function openMobileMenu() {

        var nav = $('.navigation'), wlNav = $("#wl-nav"), body = $("body"), toggle = $('.menu-toggle-wrapper');

        toggle.addClass('active');
        body.addClass('menueOpen');
        wlNav.addClass('displayShow');
        wlNav.removeClass('displayHide');
        nav.removeClass('statusOff');
        nav.addClass('statusOn');

    }


});