$(document).ready(function(){

    setTimeout(function() {

        styleSelect('#produktgruppe-select', '.custom-select-1');
        styleSelect('#land-select', '.custom-select-2');

    }, 50);

    $(document).on('click', '.getMore-js', function(){
        var ajaxUrlMore = $(this).attr("data-more"),
            resultContainer = $('.resultContainer');

        $(this).remove();

        $.get(ajaxUrlMore, function(data){
            $(resultContainer).append(data);
            if($('.getMore').html() == undefined) {
                $('#getMoreBtn').html('');
            } else {
                $('#getMoreBtn').html( $('.getMore').html() );
                $('.getMore').remove();
            }

        });

    });

});

function changeProduktgruppe(myValue) {

    var optinValue = myValue;

    ajaxFeedback('', myValue);

    $('#land-select').attr("data-produktgruppe", myValue);

    /*
    IDsCategoryLandStr = $('#produktgruppe-select').attr("data-categoryLandStr");
    IDsCategoryLandArr = IDsCategoryLandStr.split(',')
    $(".custom-select-2 .custom-options").children().removeClass( "disabled" );
    $.each(IDsCategoryLandArr, function(key, value) {
        statusLandCategory(value, optinValue);
    });
     */

    statusLandCategory(optinValue);
}


function changeLand(myValue) {

    var produktgruppe = $('#land-select').attr("data-produktgruppe");
    ajaxFeedback(myValue, produktgruppe);
    //Achtung Testen
    statusLandCategory(produktgruppe);
}




function styleSelect(selectId, selectClass) {

    $(selectId).each(function() {
        var classes = $(this).attr("class"),
            id      = $(this).attr("id"),
            name    = $(this).attr("name")

        var template =  '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger" data-placeholder="' +  $(this).attr("placeholder")   + '">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function() {

            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });

    $(".custom-select-1 .custom-options").find(".selectText").remove();
    $(".custom-select-2 .custom-options").find(".selectText").remove();


    $(".custom-option:first-of-type").hover(function() {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function() {
        $(this).parents(".custom-options").removeClass("option-hover");
    });

    var clickContainer1 = $('.auswahlProduktgruppe').find('.custom-select-trigger'),
        clickContainer2 = $('.auswahlLand').find('.custom-select-trigger');

    $(clickContainer1).on("click", function() {
        if(clickContainer2.parent().hasClass('opened')){
            clickContainer2.parent().removeClass("opened");
        }
    });

    $(clickContainer2).on("click", function() {
        if(clickContainer1.parent().hasClass('opened')){
            clickContainer1.parent().removeClass("opened");
        }
    });


    $(".custom-select-trigger").on("click", function() {

        $('html').one('click',function() {
            $(selectClass).removeClass("opened");
        });

        $(this).parents(selectClass).toggleClass("opened");
        event.stopPropagation();
    });



    $(".custom-option").on("click", function() {

        if (!$(this).hasClass('disabled')) {

            $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
            $(this).parents(".custom-options").find(".custom-option").removeClass("selection");

            $(this).addClass("selection");
            $(this).parents(selectClass).removeClass("opened");
            $(this).parents(selectClass).find(".custom-select-trigger").text($(this).text());

            if( $(this).parents(".custom-options").parent().parent().parent().attr("class") == 'auswahlProduktgruppe'){

                $('.teaser-result-info').remove();

                if($(this).hasClass('allTyp')){
                    changeProduktgruppe();
                    $('#land-select').removeAttr("data-produktgruppe");
                } else {
                    changeProduktgruppe($(this).data("value"));
                }


                $(".custom-select-2 .custom-options").find(".alleCat").hide();

                var placeholderContainer= $(".custom-select-2 .custom-select-trigger"),
                    placeholderText = placeholderContainer.attr('data-placeholder');

                placeholderContainer.text(placeholderText);

                if($(this).hasClass("allTyp")){

                    $(".custom-select-2 .custom-options").find(".selection").removeClass("selection"); //PP
                    $(".custom-select-2 .custom-select-trigger").css('background-color', '#ffffff');
                    $(".custom-select-2 .custom-select-trigger").css('color', '#000000');
                    $(".custom-select-2 .custom-options").find(".alleCat").show();
                } else {
                    $(".custom-select-2 .custom-select-trigger").css('background-color', '#31C390');
                    $(".custom-select-2 .custom-select-trigger").css('color', '#FFFFFF');
                    $(".custom-select-2 .custom-select-trigger").addClass('highlight');
                }

            }
            if( $(this).parents(".custom-options").parent().parent().parent().attr("class") == 'auswahlLand'){

                changeLand($(this).data("value"));

            }

        }
        return false;

    });


}

