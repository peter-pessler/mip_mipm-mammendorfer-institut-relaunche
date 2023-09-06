$(document).ready(function () {


    $('.unveiled-navigation').unveiledNavigation({
        upClass: 'is-big',
        downClass: 'is-small'
    });

    /**
     **********************************************************************************
     */

    var displayWidth = $(window).width(), breakpointNavigation = 1300;

    if(displayWidth <= breakpointNavigation){
        $('body').addClass('mmOn');
        mobileMenu(breakpointNavigation,displayWidth);
        MobileMenuListCklick(breakpointNavigation,displayWidth);
    }

    $(window).resize(function(event) {
        displayWidth = $(window).width();

        if(displayWidth <= breakpointNavigation){
            $('body').addClass('mmOn');
            $('.mobile-menu').addClass("layoutMobile");
            closeMobileMenu();

            if ($('body').not('.mmOn')){
                mobileMenu(breakpointNavigation,displayWidth);
                MobileMenuListCklick(breakpointNavigation,displayWidth);
            }

        } else {
            $('body').removeClass('mmOn')
            $('.mobile-menu').addClass("layoutDektop");
        }


    })

});

function mobileMenu(breakpointNavigation,displayWidth) {


                $( ".mobile-nav-button" ).mouseover(function() {
                    $('.textMenue').addClass('menueOver');
                }).mouseout(function() {
                    $('.textMenue').removeClass('menueOver');
                });


                if(displayWidth <= breakpointNavigation) {
                    if($("body").hasClass('menueOpen')) {
                        $('.level-1').on('click', function(e) {
                            closeMobileMenu();
                        });
                    }
                }


                if(displayWidth <= breakpointNavigation) {

                    var menu = $('.menueOuter');
                    $('.mobile-menu').addClass("layoutMobile");


                    $('body').click(function() {

                        if ($('body').is(':not(.menueOpen)')) {

                            $('.clickAreaContainer').removeClass('clickArea');

                        };

                    });


                    $(document).mouseup(function (e) {

                        if ($('body').is(':not(.menueOpen)')) {

                            $('.hamburger__container, .textMenue').on('click', function() {
                                closeMobileMenu();
                            });

                        };

                    });

                    $(document).mouseup(function (e) {
                        if (!menu.is(e.target) && menu.has(e.target).length === 0){

                            if($("body").hasClass('menueOpen')) {
                                closeMobileMenu();
                            }

                        } else {


                            $('.hamburger__container, .textMenue').on('click', function() {

                                if ($('body').is(':not(.menueOpen)')) {

                                    if ($('.clickAreaContainer').is(':not(.clickArea)')) {

                                        $('.mobile-nav-button ').addClass("is-active");
                                        $('.mobile-menu').addClass('mobile-menu--open');
                                        $('.clickAreaContainer').addClass('clickArea');
                                        $("body").addClass("menueOpen");

                                    }
                                }

                            });


                            if($(".clickAreaContainer").hasClass('clickArea')) {

                                $('.clickArea').on('click', function() {

                                    $('.mobile-nav-button').removeClass("is-active");
                                    $('.mobile-menu').removeClass('mobile-menu--open');
                                    //$('.clickAreaContainer').removeClass('clickArea');
                                    $("body").removeClass("menueOpen");

                                });

                            }

                        }

                    });

                } else {
                    $('.mobile-menu').addClass("layoutDektop");
                }

}

function closeMobileMenu() {

    if($("body").hasClass('menueOpen')){

        $('.mobile-nav-button ').toggleClass("is-active");
        $('.mobile-menu').toggleClass('mobile-menu--open');
        $('.clickAreaContainer').toggleClass('clickArea');
        $("body").toggleClass("menueOpen");
        return false;

    }
}

function MobileMenuListCklick(breakpointNavigation,displayWidth) {

    if(displayWidth <= breakpointNavigation){
        $("ul#nav li").click(function() {
            if($("body").hasClass('menueOpen')){
                var a_href = $(this).find('a');
                window.location = a_href.attr('href');
                return false;
            }
        });

        $("ul#nav li a").click(function() {
            if($("body").hasClass('menueOpen')){
                window.location = $(this).attr('href');
                return false;
            }
        });
    }

}