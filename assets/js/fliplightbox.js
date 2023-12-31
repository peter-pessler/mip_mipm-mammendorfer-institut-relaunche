/*!
 * flipLightBox - Responsive Lightbox jQuery Plugin
 * version: 1.3.0
 * @requires jQuery v1.7 or later
 *
 * Non Commercial Licence
 *
 * License at http://flipgallery.net/fliplightbox.html#download
 *
 * Example at http://flipgallery.net/fliplightbox.html
 *
 * Copyright 2016 flipGallery.net
 */


(function ($) {

    $.fn.flipLightBox = function (flb_options) {

        var flb_settings = $.extend({

            // FLIP MODE SETTINGS
            // ------------------

            flip_mode: 1,

            // 1 = Flip On & 0 = Flip Off (fade).

            // VISUAL SETTINGS
            // ---------------

            lightbox_background_opacity: 0.8,

            lightbox_border_width: 2, // (pixels)

            lightbox_border_color: '#ffffff',

            // lightbox_background_color: '#1372D0',

            lightbox_x_close_opacity: 1,

            lightbox_z_index: '1000',

            lightbox_image_drag: 0, // 1 = Allow & 0 = Disallow.

            // SPEED SETTINGS
            // --------------

            lightbox_flip_speed: 800,

            // Speed of complete lightbox flip or fade (milliseconds).

            // TEXT SETTINGS
            // -------------

            // *Picture/Lightbox Text Settings*

            lightbox_text_status: 1,

            // 1 = On & 0 = Off.

            lightbox_text_style: 'font-size: 14px; line-height: 1.4; color: #000000; text-align: center;',

            lightbox_text_anchor_link_style: 'text-decoration: underline; color: #000000;',

            lightbox_text_background_style: 'background-color: #ffffff; opacity:0.8;',

            lightbox_text_area_position: 'bottom',

            // bottom or top

            // *Picture/Lightbox Navigation Text Settings*

            lightbox_navigation_status: 1,

            // 1 = On & 0 = Off.


            next_image_text: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 23.99 24.568"><path id="flb-next-pic-path" class="flb-next-pic-fill" data-name="Vereinigungsmenge 20" d="M-2110.526,2034.257l6.663-6.662H-2119v-4.623h15.136l-6.663-6.663,3.233-3.31,12.284,12.284-12.284,12.284Z" transform="translate(2119 -2012.999)" fill="#1372d0"/></svg>',

            back_image_text: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path id="flb-back-pic-path" class="lfb-back-pic-fill" data-name="Vereinigungsmenge 4" d="M5.652,2026.844l4.443-4.338H0v-3.011H10.095l-4.443-4.339L7.808,2013,16,2021l-8.192,8Z" transform="translate(16 2029) rotate(180)" fill="#1372d0"/></svg>',

            next_and_back_image_text_style: 'font-weight: bold; color: #000000;',

            image_number_page: '',

            image_number_of: $('.bilderMitZoom').attr("data-lightbox_vonText"),

            image_number_text_style: 'color: #000000;',

            // *Image Streaming Text Settings*

            loading_text_color: '#ffffff',

            loading_text_opacity: '0.3'

            // For more settings options you can purchase the
            // enhanced comercial version of flipLightBox at:
            // http://flipgallery.net/fliplightbox.html#download

        }, flb_options);

        var flb_loading_image = "data:image/gif;base64,R0lGODlhCgARAIABAP///////yH5BAEAAAEALAAAAAAKABEAAAIWTIBpl80No5y00gdXXBjxD4biSJZGAQA7";
        var flb_close_image = "data:image/gif;base64,R0lGODlhMgAyAIABAP///////yH5BAEAAAEALAAAAAAyADIAAALPjI+py+0Po5y0HoCz3rx7/HziKDbkiWZLyp5Kd7VcvL01ImvJvOu2vPLhVAxgkTgEmVIOIQ0QcjWRT+i0dFUmqUFP1GmAZcE/sndsXfK2N3X6KGa3j5BPOW4JjO54ConfJ/HXMygoJWcXwUR46FZYtffVGIZiOKl3iXaGuDZx+egXyclVIQpJ1iPZSRnIqGrWKveqdTr71gWLOnrLd2erW1X2O4cr7GhqvHUMqszIi2mUDOnc4kudljO3Cp3djdsdfQ3OvDu+nYeerr7Ojl4AADs=";
        var flb_blank_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII=";
        var flb_image_innit_width;
        var flb_image_width;
        var flb_image_height;
        var flb_box_sizing = 'box-sizing: content-box; -moz-box-sizing: content-box; -webkit-box-sizing: content-box;';
        var flb_distance_from_top;
        var flb_new_height;
        var flb_new_width;
        var flb_placement;
        var flb_i;
        var flb_total_lightbox_width;
        var flb_loading;
        var flb_in_img;
        var flb_image_name;
        var flb_class;
        var flb_textcontent;
        var flb_lightbox_data;
        var flb_total_images;
        var flb_h;
        var fgi_lb_name = 'flipLightBox';
        var fgi_lb_ind_name;
        var flb_classnum = 1;
        var flb_itemnum;
        var flb_clickclass;
        var flb_classamount = new Array();

        function flb_find() {
            if (flb_classnum == 1) {
                fgi_lb_ind_name = fgi_lb_name
            } else {
                fgi_lb_ind_name = fgi_lb_name;
                fgi_lb_ind_name += flb_classnum;
            }
            if ($('.' + fgi_lb_ind_name)[0]) {
                $('.' + fgi_lb_ind_name + ' > span').hide();
                flb_itemnum = 0;
                $('.' + fgi_lb_ind_name).each(function () {
                    flb_itemnum = flb_itemnum + 1;
                    $(this).attr('class', fgi_lb_ind_name + '-' + flb_itemnum);
                    if (flb_clickclass == null) {
                        flb_clickclass = '.' + fgi_lb_ind_name + '-' + flb_itemnum;
                    } else {
                        flb_clickclass += ', .' + fgi_lb_ind_name + '-' + flb_itemnum;
                    }
                });
                flb_classamount[fgi_lb_ind_name] = flb_itemnum;
                flb_classnum++;
                flb_find();
            }
        }

        flb_find();

        // PP
        /*
        if (flb_settings.lightbox_background_color == null) {
            flb_settings.lightbox_background_color = '#000000';
        }
         */

        // PP
        //$(this).append('<div id="flb-lightbox" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: ' + flb_settings.lightbox_z_index + '; ' + flb_box_sizing + '"><div id="flb-lightbox-background" style="width: 100%; height: 100%; background-color: ' + flb_settings.lightbox_background_color + '; opacity:' + flb_settings.lightbox_background_opacity + '; ' + flb_box_sizing + '"></div><div id="flb-lightbox-content" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: none; text-align: center; ' + flb_box_sizing + '"></div><div id="flb-load" style="position: fixed; top: 40%; left: 0px; width: 100%; text-align: center; font-size: 14px; color: ' + flb_settings.loading_text_color + '; opacity: ' + flb_settings.loading_text_opacity + '; ' + flb_box_sizing + '"></div><div id="flb-lightbox-text" style="position: fixed; ' + flb_settings.lightbox_text_area_position + ': 0px; width: 90%; padding-left: 5%; padding-right: 6%; margin-right: auto; margin-left: auto;' + flb_settings.lightbox_text_background_style + ' ' + flb_settings.lightbox_text_style + ' ' + flb_box_sizing + ' padding-top: 15px; padding-bottom: 15px;"></div><div id="flb-load2" style="position: fixed; top: 40%; left: 0px; width: 100%; text-align: center; font-size: 14px; color: ' + flb_settings.loading_text_color + '; opacity: ' + flb_settings.loading_text_opacity + ';"></div>');
        $(this).append('<div id="flb-lightbox" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: ' + flb_settings.lightbox_z_index + '; ' + flb_box_sizing + '"><div id="flb-lightbox-background" data-test style="width: 100%; height: 100%; opacity:' + flb_settings.lightbox_background_opacity + '; ' + flb_box_sizing + '"></div><div id="flb-lightbox-content" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: none; text-align: center; ' + flb_box_sizing + '"></div><div id="flb-load" style="position: fixed; top: 40%; left: 0px; width: 100%; text-align: center; font-size: 14px; color: ' + flb_settings.loading_text_color + '; opacity: ' + flb_settings.loading_text_opacity + '; ' + flb_box_sizing + '"></div><div id="flb-lightbox-text" style="position: fixed; ' + flb_settings.lightbox_text_area_position + ': 0px; width: 90%; padding-left: 5%; padding-right: 6%; margin-right: auto; margin-left: auto;' + flb_settings.lightbox_text_background_style + ' ' + flb_settings.lightbox_text_style + ' ' + flb_box_sizing + ' padding-top: 15px; padding-bottom: 15px;"></div><div id="flb-load2" style="position: fixed; top: 40%; left: 0px; width: 100%; text-align: center; font-size: 14px; color: ' + flb_settings.loading_text_color + '; opacity: ' + flb_settings.loading_text_opacity + ';"></div>');
        $("#flb-lightbox, #flb-lightbox-content, #flb-lightbox-text").hide();

        function flb_get_image_width(src) {
            var flb_img = new Image();
            flb_img.src = src;
            return flb_img.width;
        }

        function flb_get_image_height(src) {
            var flb_img = new Image();
            flb_img.src = src;
            return flb_img.height;
        }

        function flb_iphone_check() {
            return ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1));
        }

        function flb_load_animation() {
            $("#flb-load").html('<div id="flb-loading-img"></div>').show();
            setTimeout(function () {
                $("#flb-loading-img").html('<br />Loading Image');
            }, 500);
            setTimeout(function () {
                $("#flb-loading-img").prepend('<img width="5" src="' + flb_loading_image + '" /> ');
            }, 1000);
            setTimeout(function () {
                $("#flb-loading-img").prepend('<img width="5" src="' + flb_loading_image + '" /> ');
            }, 1500);
            setTimeout(function () {
                $("#flb-loading-img").prepend('<img width="5" src="' + flb_loading_image + '" /> ');
            }, 2000);
            setTimeout(function () {
                $("#flb-loading-img").fadeOut(500);
            }, 2500);
            flb_loading = setTimeout(function () {
                flb_load_animation();
            }, 3000);
        }

        $(flb_clickclass).click(function (e) {
            e.preventDefault();

            // PP
            $("#flb-lightbox-background").css('background-color', $(this).parent().attr("data-lightbox_bgColor") );


            flb_image_name = $(this).attr('href');
            flb_class = $(this).attr('class');
            flb_textcontent = $('.' + flb_class + ' span').html();
            flb_textcontent = flb_textcontent.replace(/<span/g, '<a style="' + flb_settings.lightbox_text_anchor_link_style + '" ').replace(/<\/span/g, '</a').replace(/data-href/g, 'href').replace(/data-target/g, 'target');
            flb_lightbox_data = flb_class.split('-');
            flb_total_images = flb_classamount[flb_lightbox_data[0]];
            $("#flb-lightbox-text").html('');
            if (flb_textcontent != null && flb_textcontent != '' && flb_settings.lightbox_text_status == 1) {
                if (flb_settings.lightbox_navigation_status == 1 && flb_total_images > 1) {
                    $("#flb-lightbox-text").append('<br /><br />');
                }
                $("#flb-lightbox-text").append(flb_textcontent);
            }
            $("#flb-lightbox").fadeIn(flb_settings.lightbox_flip_speed / 2);
            flb_load_animation();
            flb_in_img = document.createElement('img');
            $("<img />").attr('src', flb_image_name).on("load", function () {
                flb_in_img.onload = function () {
                    $("#flb-load").html('');
                    clearTimeout(flb_loading);
                    $("#flb-lightbox-content").html('<img src="' + flb_image_name + '" id="flb-lightbox-image" style="border: solid ' + flb_settings.lightbox_border_width + 'px ' + flb_settings.lightbox_border_color + '; ' + flb_box_sizing + '"/>');
                    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || navigator.userAgent.match('CriOS')) {
                        flb_new_width = flb_image_width = flb_in_img.width;
                        flb_new_height = flb_image_height = flb_in_img.height;
                    } else {
                        flb_new_width = flb_image_width = flb_get_image_width(flb_image_name);
                        flb_new_height = flb_image_height = flb_get_image_height(flb_image_name);
                    }
                    if ((flb_settings.lightbox_navigation_status != 1 && flb_settings.lightbox_text_status != 1) || (flb_settings.lightbox_navigation_status != 1 && (flb_textcontent == null || flb_textcontent == '')) || (flb_total_images <= 1 && (flb_textcontent == null || flb_textcontent == '')) || (flb_total_images <= 1 && flb_settings.lightbox_text_status != 1)) {
                        $("#flb-lightbox-text").css('visibility', 'hidden');
                        flb_h = 50;
                    } else {
                        $("#flb-lightbox-text").css('visibility', 'visible');
                        flb_h = 70;
                    }
                    $("#flb-lightbox-content").hide();
                    setTimeout(function () {
                        $(window).resize();
                        $("#flb-lightbox-image").attr('src', flb_image_name).css({
                            width: flb_image_innit_width,
                            height: flb_new_height,
                            opacity: 0
                        });
                        setTimeout(function () {
                            if ($("#flb-lightbox-text").is(':hidden')) {
                                if (navigator.userAgent.match(/iPad/i) || flb_iphone_check()) {
                                    $("#flb-lightbox-text").show();
                                } else {
                                    $("#flb-lightbox-text").slideToggle();
                                }
                            }
                        }, flb_settings.lightbox_flip_speed);
                        window.setTimeout(function () {
                            $("#flb-lightbox-content").show();
                            $("#flb-lightbox-image").attr('src', flb_image_name).animate({
                                width: flb_new_width,
                                height: flb_new_height,
                                opacity: 1
                            }, {duration: flb_settings.lightbox_flip_speed / 2});
                            if (flb_settings.lightbox_image_drag != 1) {
                                $("#flb-lightbox-image").css({
                                    'user-drag': 'none',
                                    'user-select': 'none',
                                    '-moz-user-select': 'none',
                                    '-webkit-user-drag': 'none',
                                    '-webkit-user-select': 'none',
                                    '-ms-user-select': 'none'
                                });
                            }
                        }, flb_settings.lightbox_flip_speed / 2);
                        flb_distance_from_top = flb_new_height + (flb_settings.lightbox_border_width * 2) + 25;
                        flb_distance_from_top = ($(window).height() - flb_distance_from_top) / 2 - (($('#flb-lightbox-text').height() / 2) + 20) + flb_placement;
                        if (flb_distance_from_top < 0) {
                            flb_distance_from_top = 10;
                        }
                        $("#flb-lightbox-content").prepend('<img id="flb-close" src="' + flb_blank_image + '" width="25px" height="25px" alt="Close" style="opacity:' + flb_settings.lightbox_x_close_opacity + '; margin-top: ' + flb_distance_from_top + 'px; margin-left: ' + flb_total_lightbox_width + 'px;' + flb_box_sizing + '"/><br />');
                        $("#flb-close").click(function () {
                            $(document).unbind("keyup", flb_escape);
                            $("#flb-close, #flb-next-pic, #flb-back-pic").unbind("click");
                            $("#flb-close").attr('src', flb_blank_image);
                            $("#flb-lightbox-image").attr('src', flb_image_name).animate({
                                width: flb_image_innit_width,
                                opacity: 0
                            }, {duration: flb_settings.lightbox_flip_speed / 2});
                            setTimeout(function () {
                                $("#flb-lightbox").fadeOut(500);
                                if ($("#flb-lightbox-text").is(':visible')) {
                                    if (navigator.userAgent.match(/iPad/i) || flb_iphone_check()) {
                                        $("#flb-lightbox-text").fadeOut();
                                    } else {
                                        $("#flb-lightbox-text").slideToggle();
                                    }
                                }
                            }, flb_settings.lightbox_flip_speed / 2);
                        });
                        window.setTimeout(function () {
                            $("#flb-close").attr('src', flb_close_image);
                            clearTimeout(flb_loading);
                        }, flb_settings.lightbox_flip_speed);
                        if (flb_settings.lightbox_navigation_status == 1 && flb_total_images > 1) {
                            if (flb_lightbox_data[1] < flb_total_images) {
                                $("#flb-lightbox-text").prepend('<a href="next" id="flb-next-pic" style="' + flb_settings.next_and_back_image_text_style + '' + flb_box_sizing + '">' + flb_settings.next_image_text + '</a>');
                                $("#flb-next-pic").click(function (e) {
                                    $(document).unbind("keyup", flb_escape);
                                    $("#flb-close, #flb-next-pic, #flb-back-pic").unbind("click");
                                    if ($("#flb-lightbox-text").is(':visible')) {
                                        if (navigator.userAgent.match(/iPad/i) || flb_iphone_check()) {
                                            $("#flb-lightbox-text").fadeOut();
                                        } else {
                                            $("#flb-lightbox-text").slideToggle();
                                        }
                                    }
                                    e.preventDefault();
                                    setTimeout(function () {
                                        $('.' + flb_lightbox_data[0] + '-' + (Math.floor(flb_lightbox_data[1]) + 1)).trigger('click');
                                    }, flb_settings.lightbox_flip_speed / 2);
                                    $("#flb-close").attr('src', flb_blank_image);
                                    $("#flb-lightbox-image").attr('src', flb_image_name).animate({
                                        width: flb_image_innit_width,
                                        opacity: 0
                                    }, {duration: flb_settings.lightbox_flip_speed / 2});
                                });
                            }
                            $("#flb-lightbox-text").prepend('<span style="' + flb_settings.image_number_text_style + '' + flb_box_sizing + '"> ' + flb_settings.image_number_page + ' ' + flb_lightbox_data[1] + ' ' + flb_settings.image_number_of + ' ' + flb_total_images + ' </span>');
                            if (flb_lightbox_data[1] > 1) {
                                $("#flb-lightbox-text").prepend('<a href="next" id="flb-back-pic" style="' + flb_settings.next_and_back_image_text_style + '' + flb_box_sizing + '">' + flb_settings.back_image_text + '</a>');
                                $("#flb-back-pic").click(function (e) {
                                    $(document).unbind("keyup", flb_escape);
                                    $("#flb-close, #flb-next-pic, #flb-back-pic").unbind("click");
                                    if ($("#flb-lightbox-text").is(':visible')) {
                                        if (navigator.userAgent.match(/iPad/i) || flb_iphone_check()) {
                                            $("#flb-lightbox-text").fadeOut();
                                        } else {
                                            $("#flb-lightbox-text").slideToggle();
                                        }
                                    }
                                    e.preventDefault();
                                    setTimeout(function () {
                                        $('.' + flb_lightbox_data[0] + '-' + (Math.floor(flb_lightbox_data[1]) - 1)).trigger('click');
                                    }, flb_settings.lightbox_flip_speed / 2);
                                    $("#flb-close").attr('src', flb_blank_image);
                                    $("#flb-lightbox-image").attr('src', flb_image_name).animate({
                                        width: flb_image_innit_width,
                                        opacity: 0
                                    }, {duration: flb_settings.lightbox_flip_speed / 2});
                                });
                            }
                        }

                        function flb_escape(e) {
                            if (e.keyCode == 27) {
                                $('#flb-close').trigger('click');
                            }
                        }

                        $(document).keyup(flb_escape);
                    }, 100);
                };
                flb_in_img.src = flb_image_name;
            });
        });
        $(window).resize(function () {
            flb_i = 1;
            if ($(window).height() < (flb_image_height + $('#flb-lightbox-text').height() + flb_h) + (flb_settings.lightbox_border_width * 2)) {
                flb_new_height = $(window).height() - (flb_settings.lightbox_border_width * 2) - $('#flb-lightbox-text').height() - flb_h;
                flb_new_width = flb_image_width / flb_image_height * flb_new_height;
                flb_i = 0
            }
            if ($(window).width() < (flb_image_width + 60) + (flb_settings.lightbox_border_width * 2) && ($(window).width() - flb_image_width) < ($(window).height() - flb_image_height - ($('#flb-lightbox-text').height() + flb_h))) {
                flb_new_width = $(window).width() - (flb_settings.lightbox_border_width * 2) - 60;
                flb_new_height = flb_image_height / flb_image_width * flb_new_width;
                flb_i = 0
            }
            if (flb_i == 1) {
                flb_new_width = flb_image_width;
                flb_new_height = flb_image_height;
            }
            if (flb_settings.lightbox_text_area_position == 'top' && flb_h == 70) {
                flb_placement = (($('#flb-lightbox-text').height() / 2) + 15) * 2
            } else {
                flb_placement = 0
            }
            $("#flb-lightbox-image").css({width: flb_new_width, height: flb_new_height});
            flb_distance_from_top = flb_new_height + (flb_settings.lightbox_border_width * 2) + 25;
            flb_distance_from_top = ($(window).height() - flb_distance_from_top) / 2 - (($('#flb-lightbox-text').height() / 2) + 20) + flb_placement;
            if (flb_distance_from_top < 0) {
                flb_distance_from_top = 10;
            }
            $("#flb-close").css({
                'margin-top': flb_distance_from_top,
                'margin-left': ($(window).width() - 85) + (flb_settings.lightbox_border_width * 2) + (($('#flb-lightbox-text').height() / 2) + 20) - flb_placement
            });
            flb_total_lightbox_width = (flb_new_width + 25) + (flb_settings.lightbox_border_width * 2);
            $("#flb-close").attr('style', 'margin-top: ' + flb_distance_from_top + 'px; margin-left: ' + flb_total_lightbox_width + 'px; ' + flb_box_sizing + '');
            if (flb_settings.flip_mode == 0) {
                flb_image_innit_width = flb_new_width;
            } else {
                flb_image_innit_width = 0;
            }
            ;
        });
    }
})(jQuery);