// @codekit-prepend  "_jquery.matchHeight.js", "_navigation.js";


// Ausführen, wenn Website geladen wurde
$(document).ready(function() {

    /**
     * Accordion
     * @type {jQuery|HTMLElement|*}
     */

    /* ------------------------------------------------------------------ */
    var accordionList = $('.accordion-list'),accList;
    /* ------------------------------------------------------------------ */

    $(".accordion-list.desktop > li label").on( "mouseenter", function() {

        if (!$( this ).hasClass("lableOnOpen")) {
            $( this ).removeClass("lableOff");
            $( this ).removeClass("lableOnOpen");
            $( this ).addClass("lableOn");
        }

    }).on( "mouseleave", function() {
        $( this ).removeClass("lableOnOpen");
        $( this ).removeClass("lableOn");
        $( this ).addClass("lableOff");
    });

    /* ---------------- */

    accordionList.each(function( index ) {
        accList = $( this ).children('li');
        accList.children('.accordion-content').hide();
    });

    $('.accordion-list > li label').bind("mousedown touchstart", function(event){

        var clickElement = $(this), dataContainer = $(this).closest('.accordion');

        /* ---------------- */

        clickElement.removeClass("lableOn");
        clickElement.addClass("lableOnOpen");

        /* ---------------- */

        if (clickElement.parent().hasClass("active")) {

            clickElement.parent().removeClass("active").find(".accordion-content").slideUp();
            clickElement.removeClass("lableOnOpen");
            clickElement.addClass("lableOff");

        } else {

            $(".accordion-list > li.active .accordion-content").slideUp();
            $(".accordion-list > li.active").removeClass("active");
            clickElement.parent().addClass("active").find(".accordion-content").slideDown();

            if(dataContainer.data("scrolltop") == 'on' || typeof dataContainer.data("scrolltop") == 'undefined'){
                var element = $(this);
                setTimeout(function() {
                    $('body, html').animate({
                        scrollTop: element.offset().top -120
                    }, 500)
                }, 400);
            }

        }
        return false;
    });

    /* *********************************************************************************************************************** */




    /* *********************************************************************************************************************** */

    setTimeout(function() {
        phoneNumberOnlyIsDesktop();
        styleMenue();
        replaceEmail();

        equal_width($('.list-text-js'));
        responsiveAbstand();
    }, 50);

    /* *********************************************************************************************************************** */

    /**
     * resize
     */

    $(window).resize(function() {

        setTimeout(function() {
            styleMenue();
            replaceEmail();

            equal_width($('.list-text-js'));
            responsiveAbstand();
        }, 50);
    })
    /* *********************************************************************************************************************** */

    /*
    $(window).bind('orientationchange', function (event) {
        location.reload();
    });
    */

    /* *********************************************************************************************************************** */

    //$('.xxx').matchHeight();

    /* *********************************************************************************************************************** */

    $('h1,h2,h3,h4').each(function(index, value) {

        var classesH1,classesH2,classesH3,classesH4, setClassH1,setClassH2,setClassH3,setClassH4 ;

        if( $(this).is('h1')) {
            classesH1 = $(this).attr('class');
            setClassH1 = (typeof classesH1 != 'undefined')? ' class="' + classesH1  + '"' : '';
            $(this).replaceWith('<div class="h1box"><h1' + setClassH1  + '>' + $(this).html() + '</h1></div>');
        }
        if( $(this).is('h2')) {
            classesH2 = $(this).attr('class');
            setClassH2 = (typeof classesH2 != 'undefined')? ' class="' + classesH2  + '"' : '';
            $(this).replaceWith('<div class="h2box"><h2' + setClassH2  + '>' + $(this).html() + '</h2></div>');
        }
        if( $(this).is('h3')) {
            classesH3 = $(this).attr('class');
            setClassH3 = (typeof classesH3 != 'undefined')? ' class="' + classesH3  + '"' : '';
            $(this).replaceWith('<div class="h3box"><h3' + setClassH3  + '>' + $(this).html() + '</h3></div>');
        }
        if( $(this).is('h4')) {
            classesH4 = $(this).attr('class');
            setClassH4 = (typeof classesH4 != 'undefined')? ' class="' + classesH4  + '"' : '';
            $(this).replaceWith('<div class="h4box"><h4' + setClassH4  + '>' + $(this).html() + '</h4></div>');
        }

    });

    /* *********************************************************************************************************************** */
    /* *********************************************************************************************************************** */
    /* *********************************************************************************************************************** */

    // Font-Tester | Boxen zwischen allen Tags für Bestimmen des Minus-Margins (Settings) – nach erfolgreichem Testen löschen

    /*
    $('main').children().each(function () {
        $(this).find('*').before("<div style='background: #eee; height: 50px'></div>");
    });
     */

    /* *********************************************************************************************************************** */
    /* *********************************************************************************************************************** */
    /* *********************************************************************************************************************** */


}); /* END  $(document).ready(function()  */


/* *************************************************************************************************************************
 *  Funktionen
 * *********************************************************************************************************************** */

/**
 *
 * Cookies Setzen und Auslesen
 *
 * @param name
 * @param value
 * @param days
 * @returns {string}
 */

function setCookie(name, value, days) {
    var d = new Date();
    //days = days
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";days=" + d.toUTCString() + ";path=/";
    return getCookie(name);
};

function getCookie(name) {
    var ca = decodeURIComponent(document.cookie).split(";");
    name += "=";
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
};


/* *********************************************************************************************************************** */

/**
 * Beitenanpassung für Liste Kontakt
 */

function equal_width(element) {
    var widest_element = 0;

    // Lösche die Breite
    element.each(function() {
        $(this).removeAttr('style');
    });

    // Prüfe, welches Element am breitesten ist
    element.each(function() {
        if ($(this).width() > widest_element) {
            widest_element = parseInt( $(this).width() );
        }
    });

    // Weise diese Breite allen Elementen zu.
    element.each(function() {
        $(this).width(widest_element);
    });
};



/* *********************************************************************************************************************** */

function responsiveAbstand() {

    var dataElement = $('[data-attr]');

    dataElement.each(function () {

        if($(this).attr("data-attr") !== undefined ){

            var einheit, factor, abstandFactor ,dynamicValue, dynamicAttr, dataMax, pageMaxWidth, dataMin, display_width,breakpointWidth;

            dynamicAttr =  $(this).attr("data-attr");
            pageMaxWidth = 1920,
                display_width = $(window).width();
            dataMax =  $(this).attr("data-max");
            dataMin =  $(this).attr("data-min");
            einheit =  pageMaxWidth / 100;
            factor  =  display_width / einheit;
            abstandFactor    =  dataMax / 100;
            breakpointWidth = (dataMin / dataMax ) * pageMaxWidth;

            if(display_width > 1920){
                dynamicValue = dataMax;
                $(this).css(dynamicAttr, dynamicValue + "px");
            } else if(display_width > breakpointWidth){
                dynamicValue = Math.round(abstandFactor * factor);
                $(this).css(dynamicAttr, dynamicValue + "px");
            } else if(display_width <= breakpointWidth){
                dynamicValue = dataMin;
                $(this).css(dynamicAttr, dynamicValue + "px");
            }


            /**
             * only for fixing
             */
            //$(this).text('Distanc ' + dynamicAttr + ' is: ' + dynamicValue + 'px' + ' / Min height' + dataMin + ' px' + ' / Breakpoint ' + breakpointWidth + ' px').css('background-color', 'orange');

        }

    });

}

/* *********************************************************************************************************************** */

function phoneNumberOnlyIsDesktop() {

    /**
     *  Links Phone Number
     *  Demo Einbettung: => <a class="cursor"  href="tel:567898">Telefon</a>
     */

    if ($("body").hasClass( "is-desktop" )) {

        var phone = $('[href^="tel"]');
        var telNummer = '';

        phone.each(function () {

            var currentElement  = $(this), myClassname = $(this).attr('class'), dataTooltip = $(this).attr("data-tooltip"), phoneNumber;

            if(typeof myClassname == 'undefined' || myClassname == ''){
                phoneNumber     = currentElement.html(), newPhoneElement = $('<i></i>');
            } else if(dataTooltip && dataTooltip != '') {
                phoneNumber     = currentElement.html(), newPhoneElement = $('<i class="' + myClassname + '" data-tooltip="' + dataTooltip  + '"></i>');
            }else {
                phoneNumber     = currentElement.html(), newPhoneElement = $('<i class="' + myClassname + '"></i>');
            }

            currentElement.before(newPhoneElement);
            newPhoneElement.html(phoneNumber);
            currentElement.remove();

        });
    }

};/* *********************************************************************************************************************** */

function replaceEmail() {

    var mail = $('[data-email]');
    mail.each(function () {
        var dataEmail = $(this).attr("data-email"), newUrl;
        dataEmail = dataEmail.replace('[at]', '@').replace(/\[dot\]/g, '.');
        newUrl = 'mailto:' + dataEmail;
        $(this).attr("href", newUrl);
        $(this).attr('data-email', '').removeAttr('data-email');
    })

};

/* *********************************************************************************************************************** */

function setMasonryHeight() {
    var itemHeight;

    $('#masonry-effect .item').each(function(index, value) {
        itemHeight = '';

        $(this).removeAttr("style");
        itemHeight = $(this).find('.item-content').innerHeight();
        itemHeight = Math.round(itemHeight);
        $(this).css('height', itemHeight + 'px')

    });

    masonry();

}

function masonry() {

    let mainId = 'masonry-effect';
    let itemIdentifier = '#masonry-effect .item';

    // Programmatically get the column width
    let item = document.querySelector(itemIdentifier);
    let parentWidth = item.parentNode.getBoundingClientRect().width;
    let itemWidth = item.getBoundingClientRect().width + parseFloat(getComputedStyle(item).marginLeft) + parseFloat(getComputedStyle(item).marginRight);
    let columnWidth = Math.round((1 / (itemWidth / parentWidth)));

    // We need this line since JS nodes are dumb
    let arrayOfItems = Array.prototype.slice.call( document.querySelectorAll(itemIdentifier) );
    let trackHeights = {};
    arrayOfItems.forEach(function(item) {
        // Get index of item
        let thisIndex = arrayOfItems.indexOf(item);
        // Get column this and set width
        let thisColumn = thisIndex % columnWidth;
        if(typeof trackHeights[thisColumn] == "undefined") {
            trackHeights[thisColumn] = 0;
        }
        trackHeights[thisColumn] += item.getBoundingClientRect().height + parseFloat(getComputedStyle(item).marginBottom);
        // If the item has an item above it, then move it to fill the gap
        if(thisIndex - columnWidth >= 0) {
            let getItemAbove = document.querySelector(`${itemIdentifier}:nth-of-type(${thisIndex - columnWidth + 1})`);
            let previousBottom = getItemAbove.getBoundingClientRect().bottom;
            let currentTop = item.getBoundingClientRect().top - parseFloat(getComputedStyle(item).marginBottom);
            item.style.top = `-${currentTop - previousBottom}px`;
        }
    });
    let max = Math.max(...Object.values(trackHeights));
    document.getElementById(mainId).style.height = `${max}px`;

};

/* *********************************************************************************************************************** */


function tabellenSpaltenBreite(tabellenId,showBorder,breakpoint) {

    var element = $('[data-width]'), spaltenBreite, width, tabellen = $('.modul-tabelle'), styleElementHead, styleElementBody, checkData;

    width = $(window).width();
    width = parseInt( width );
    breakpoint = parseInt( breakpoint );

    if( width < breakpoint ){

        $("div").removeClass("tableRowBorder");

        $.each($('.table_header'), function(index, value) {

            if ( $(this).attr("data-width")  !== "undefined"){
                $(this).removeAttr("style");
            }

        });

        $.each($('.table_small'), function(index, value) {

            if ( $(this).attr("data-width")  !== "undefined"){
                $(this).removeremoveAttr("style");
            }

        });

    } else {

        $.each($(tabellenId).find('.table_header'), function(index, value) {

            if ( $(this).attr("data-width")  !== "undefined"){
                $tableHeaderWidth = $(this).attr("data-width");
                $(this).css("width", $tableHeaderWidth);
            }

            if(showBorder == 1){
                $(this).find(".setRowborder").addClass('tableRowBorder');
            }

        });


        $.each($(tabellenId).find('.table_small'), function(index, value) {

            if ( $(this).attr("data-width")  !== "undefined"){
                $tableSmallWidth = $(this).attr("data-width");
                $(this).css("width", $tableSmallWidth);
            }

            if(showBorder == 1){
                $(this).find(".setRowborder").addClass('tableRowBorder');
            }

        });

    }

}

/* *********************************************************************************************************************** */

function styleMenue() {
    var width, count = 0,  counter = 0, top = 0,  mystyle = "", leftWidth = 0, hrefWidth = 0, breakpoint = parseInt($('body').attr("data-navbreakpoint")), hrefWidthBefore;

    $('head style').remove();

    width = $(window).innerWidth();
    width = parseInt( width );


    $('#wl-nav').find('a').each(function(e) {
        count = count+1;
    });



    if( width < breakpoint + 1){

        // Script für umschalten auf Mobile hier einfügen!



        // Navigation Mobile ----------------------------------------------------------------------------------------

        $('#wl-nav').find('a').each(function(e) {

            counter = counter+1;


            if(counter > 1){
                top = top + 50;
            }

            /*
            if(counter == count){
                top = top + 20;
            }
             */


            if($(this).hasClass( "active" )){
                mystyle += "#wl-nav div.active, #wl-nav a:nth-child(" + counter + "):hover~.animation { top: " + top + "px;} \n\r ";
            } else {
                mystyle += "#wl-nav a:nth-child(" + counter + "):hover~.animation { top: " + top + "px;} \n\r ";
            }

        });

        $( "<style>" + mystyle + "</style>" ).appendTo( "head" );


    } else {

        // Navigation Desktop ----------------------------------------------------------------------------------------

        // Script für umschalten auf Desktop hier einfügen!

        //----------------------------------------------------------------------------------------

        $('#wl-nav').find('a').each(function(e) {
            counter = counter+1;
            hrefWidth = Math.round($(this).innerWidth());

            if(counter > 1){
                leftWidth = leftWidth + hrefWidthBefore;
            }

            /*
            if(counter == count){
                leftWidth = leftWidth + 20;
            }
             */

            if($(this).hasClass( "active" )){
                mystyle += "#wl-nav div.active, #wl-nav a:nth-child(" + counter + "):hover~.animation { left: " + leftWidth + "px; width: " + hrefWidth + "px; } \n\r ";
            } else {
                mystyle += "#wl-nav a:nth-child(" + counter + "):hover~.animation { left: " + leftWidth + "px; width: " + hrefWidth + "px; } \n\r ";
            }

            mystyle += "#wl-nav a:nth-child(" + counter + ") {  width: " + hrefWidth + "px; } \n\r ";
            hrefWidthBefore = hrefWidth;

        });

        $( "<style>" + mystyle + "</style>" ).appendTo( "head" );
    }
}


