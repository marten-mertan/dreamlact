$(document).ready(function () {
    
    //плавный скролл
    function scrollToAnchor (elem) {
        $(document).on("click", elem, function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                menuHeight = 70,
                top = $(id).offset().top,
                topIndent = top - menuHeight;

            $('html').animate({scrollTop: topIndent}, 1000);
        });
    };

    //кнопка вверх
    function backToTop (btnElem, parentElem){
        var offset = 300,
            scroll_top_duration = 700,
            $back_to_top = $(btnElem);
        //кнопка назад
        $(window).scroll(function(){
            ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible');
        });

        $back_to_top.on('click', function(event){
            event.preventDefault();
            $(parentElem).animate({
                    scrollTop: 0
                }, scroll_top_duration
            );
        });
    }

    scrollToAnchor('.js-link');
    backToTop('.cd-top', 'body,html');

    $(window).scroll(function(){
        ( $(this).scrollTop()+$(this).height()>=$(document).height() ) ? $('.footer').addClass('open') : $('.footer').removeClass('open');
    });

    function footerHeight (target, element){
        let footerContent = $(element).height();
        $(target).css('max-height', footerContent);
    }
    footerHeight('.footer', '.footer-top-content');
    $(window).on('resize', function() {
        footerHeight('.footer', '.footer-top-content');
    });

    var line = $('.js-line'); 
    if (line.length){
        line[0].addEventListener("mousedown", function(event) {
            moveAt(event.pageX);
            function moveAt(pageX) {
                let left = pageX - line[0].offsetWidth / 2;
                if (pageX <= document.documentElement.clientWidth){
                    line[0].style.left = left  + 'px';
                }
                if (left / document.documentElement.clientWidth < 0.4){
                    $('.js-compose').removeClass('both').removeClass('child').addClass('woman');
                    return;
                }
                if (left / document.documentElement.clientWidth > 0.6){
                    $('.js-compose').removeClass('woman').removeClass('both').addClass('child');
                    return;
                }
                $('.js-compose').removeClass('woman').removeClass('child').addClass('both');
                    return;
            }
          
            function onMouseMove(event) {
                moveAt(event.pageX);
            }
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('touchmove', onMouseMove);
            line[0].onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('touchemove', onMouseMove);
                line[0].onmouseup = null;
            };
          });
        line[0].ondragstart = function() {
            return false;
        };

    }
    
    $(document).on('click','.js-child', function(e){
        e.preventDefault();
        $('.js-compose').removeClass('woman').removeClass('both').addClass('child');
        line[0].style.left = 90 + "%";
    });
    $(document).on('click','.js-woman', function(e){
        $('.js-compose').removeClass('both').removeClass('child').addClass('woman');
        e.preventDefault();
        line[0].style.left = 10 + "%";
    });

    $(document).on('click', '.js-popup-close', function (e) {
        e.preventDefault();
        var $html = $('html');
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('lock-html');
        $('.wrapper').removeClass('fixed-input');
    });

    function showPopup(icon, popup) {
        $(document).on('click', icon, function (e) {
            var windowWidth = (window.innerWidth );
            var documentWidth = (document.documentElement.clientWidth );
            var $html = $('html');
            e.preventDefault();
            $(popup).addClass('is-visible');
            $('.mfp-bg').addClass('is-visible');
            $html.addClass('lock-html');
            $('body').addClass('fixed-input');
            if(windowWidth > documentWidth){
                $('.mfp-wrap').css({
                    'overflow-y':'scroll'
                });
                // console.log('Есть полоса прокрутки');
            }else {
                // console.log('Нет полосы прокрутки');
            }
        });
    }
    showPopup(".js-menu-mobile", '.js-popup-menu-mobile');
    showPopup(".js-question", '.js-popup-form');

    
    $(document).on('click', '.js-tab', function (e) {
        e.preventDefault();
        $('.js-tab').removeClass('active');
        $(this).addClass('active');
        let tab = $(this).data('tab');
        $('.js-tab-content').removeClass('active');
        $('#'+tab).addClass('active');
    });
    
    $(document).on('click', '.js-buy-woman', function (e) {
        e.preventDefault();
        $('.js-buy').removeClass('for-children').addClass('for-woman');
    });

    $(document).on('click', '.js-buy-children', function (e) {
        e.preventDefault();
        $('.js-buy').removeClass('for-woman').addClass('for-children');
    });
});