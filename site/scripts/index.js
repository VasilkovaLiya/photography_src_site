"use strict";

$(document).ready(function () {
    //переход на второй блок при клике на скролл в первом блоке
    $(".scroll").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1000);
    });

    //переход по ссылкам меню
    $(".menu__list").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1000);
    });

    // переход "наверх"
    $(".arrow-link").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {
                window.location.hash = hash;
            });
        }
    });

    // валидация и проверка формы
    $("#form").submit(function () {
       
        var form = $(this); 
        var error = false; 
        form.find('input, textarea').each(function () {
            
            if ($(this).val() == '') {
                
                var dataMessage = $(this).attr('data-message');
                $(this).attr('placeholder', dataMessage);
                $(this).css('background', '#f2c200');
                $(this).keypress(function () {
                    $(this).attr('placeholder', '');
                    $(this).css('background', '#fff');
                });
                error = true; 
            }
        });
        if (!error) {
            
            var data = form.serialize(); 
            $.ajax({ 
                url: './send.php',
                type: 'post',
                data: {
                    name: $('[name=name]').val(),
                    email: $('[name=email]').val(),
                    message: $('[name=message]').val() },
                beforeSend: function beforeSend(data) {
                    
                    form.find('input[type="submit"]').attr('disabled', 'disabled'); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
                },
                success: function success(data) {
                    
                    if (data['error']) {
                       
                        alert(data['error']); 
                    } else {
                        $('.popup__container').fadeIn(500);
                    }
                },
                error: function error(xhr, ajaxOptions, thrownError) {
                    
                    alert(xhr.status); //  oтвeт сeрвeрa
                    alert(thrownError); // тeкст oшибки
                },
                complete: function complete(data) {
                    
                    form.find('input[type="submit"]').prop('disabled', false); // в любoм случae включим кнoпку oбрaтнo
                }

            });
        }
        return false; 
    });

    $('.btn--ok').on('click', function () {
        $('.popup').fadeOut(600);
    });
});
//# sourceMappingURL=index.js.map
