const urlParams = new URLSearchParams(window.location.search);
const formParamTest = (urlParams.get('test') == 1)? true : false;

function formValidate(form, btn) {

    var sendForm = true, button, radioValue, radioValueStatus = false;

    button = $(form + ' ' + btn)

    button.click(function(){

        /* *********************************************************** */

        $(form + ' [type="radio"]').each(function() {

            if( $(this).hasClass('required') ){

                radioValue = $(this).val();
                String(radioValue);

                if( $(this).is(':checked') ){
                    radioValueStatus  = true;
                }

                if( radioValueStatus  == false ) {
                    sendForm = false;
                    $('.form-radio ').addClass('formStateError');

                    // Bug fixing
                    if(formParamTest){
                        alert( $(this).attr("name") );
                    }

                }   else {
                    sendForm = true;
                    $('.form-radio ').removeClass('formStateError');
                }


            }

        });

        // Bug fixing
        if(formParamTest){
            if(sendForm){
                alert('sendForm meldet (radio): alles richtig');
            } else {
                alert('sendForm meldet (radio): Fehler');
            }
        }

        /* *********************************************************** */

        $(form + " select").each(function() {

            if( $(this).hasClass('required') ){

                if( $(this).val().length < 1 ){
                    sendForm = false;
                    $(this).parents('.form-select').addClass('formStateError');

                    // Bug fixing
                    if(formParamTest){
                        alert( $(this).attr("name") );
                    }

                } else {
                    if(sendForm == false){
                        sendForm = false;
                    } else {
                        sendForm = true;
                    }

                    $(this).parents('.form-select').removeClass('formStateError');

                }

            }

        });


        /* *********************************************************** */

        $(form + " input[type=text]").each(function() {

            if( $(this).hasClass('required') ){

                if( $(this).val().length < 1 ){
                    sendForm = false;
                    $(this).parents('.form-group').addClass('formStateError');

                    // Bug fixing
                    if(formParamTest){
                        alert( $(this).attr("name") );
                    }

                } else {
                    if(sendForm == false){
                        sendForm = false;
                    } else {
                        sendForm = true;
                    }

                    $(this).parents('.form-group').removeClass('formStateError');

                }

            }

        });


        // Bug fixing
        if(formParamTest){
            if(sendForm){
                alert('sendForm meldet (input): alles richtig');
            } else {
                alert('sendForm meldet (input): Fehler');
            }
        }

        /* *********************************************************** */
        /* *********************************************************** */

        $(form + " input[type=email]").each(function() {

            var myEmail = $(this).val().toString();

            if( $(this).hasClass('required') ){

                if( myEmail.length < 1 ){

                    sendForm = false;
                    $(this).parents('.form-group').addClass('formStateError');

                    // Bug fixing
                    if(formParamTest){
                        alert( $(this).attr("name") );
                    }

                } else {

                    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,emailResult;

                    emailResult = $.trim(myEmail).match(pattern) ? true : false;

                    if( emailResult ){

                        if(sendForm == false){
                            sendForm = false;
                        } else {
                            sendForm = true;
                        }

                        $(this).parents('.form-group').removeClass('formStateError');

                    } else {

                        sendForm = false;
                        $(this).parents('.form-group').addClass('formStateError');

                        // Bug fixing
                        if(formParamTest){
                            alert( $(this).attr("name") );
                        }
                    }

                }

            }

        });

        // Bug fixing
        if(formParamTest){
            if(sendForm){
                alert('sendForm meldet (mail): alles richtig');
            } else {
                alert('sendForm meldet (mail): Fehler');
            }
        }


        /* *********************************************************** */
        /* *********************************************************** */

        $(form + " textarea").each ( function () {

            if( $(this).hasClass('required') ){

                if( $(this).val().length < 1 ){
                    sendForm = false;
                    $(this).parents('.form-group').addClass('formStateError');

                    // Bug fixing
                    if(formParamTest){
                        alert( $(this).attr("name") );
                    }

                } else {
                    if(sendForm == false){
                        sendForm = false;
                    } else {
                        sendForm = true;
                    }

                    $(this).parents('.form-group').removeClass('formStateError');

                }
            }

        });

        // Bug fixing
        if(formParamTest){
            if(sendForm){
                alert('sendForm meldet (textare): alles richtig');
            } else {
                alert('sendForm meldet (textara): Fehler');
            }
        }

        /* *********************************************************** */
        /* *********************************************************** */


        $(form + " input[type=checkbox]").each(function() {

            if( $(this).hasClass('required') ){

                if( !$(this).prop('checked') ){
                    sendForm = false;
                    $(this).parents('.form-checkbox').addClass('formStateError');

                    // Bug fixing
                    if(formParamTest){
                        alert( $(this).attr("name") );
                    }

                } else {
                    if(sendForm == false){
                        sendForm = false;
                    } else {
                        sendForm = true;
                    }

                    $(this).parents('.form-checkbox').removeClass('formStateError');

                }

            }

        });

        // Bug fixing
        if(formParamTest){
            if(sendForm){
                alert('sendForm meldet (type checkbox): alles richtig');
            } else {
                alert('sendForm meldet (type checkbox): Fehler');
            }
        }


        if(sendForm){

            /* Form inputs valid, submit form. */

            $(".form-info").css("display", "none");

            //Tracking
            var location =  $('#form').attr('data-location'),  mail = $('#form-email').val();
            tracking(location, mail);

            // Senden
            $('#submit').click();
            return true;

        } else {

            /* Form inputs not all valid, display error messages. */

            $(".form-info").css("display", "block");

            $('html, body').animate(
                {
                    scrollTop: $('#form').offset().top -60,
                },
                500,
                'linear'
            )
            return false;
        }

        $("#lock-modal").css("display", "block");
        $("#loading-circle").css("display", "block");


    });
}

function tracking(location,mail) {
    window.dataLayer.push({
        'event': 'contact_form_submitted',
        'formLocation': 'Seite: ' + location + ' / Mail: ' + mail,
    });

    /*
    alert(JSON.stringify(dataLayer));
    */

};





