$(document).ready(function() {
if ($(window).width() > 799) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('header').addClass('hiddenNav');
        }
        else {
            $('header').removeClass();
        }
    });
    $('#columns').addClass('oneColListRight');
    $('.selectLayout .oneColListRight').addClass('act');
//niceScroll
    setTimeout(function () {
        $('#columns div, #columns ul, textarea, .videoDescr div').niceScroll();
        $('.galleryDescr div').niceScroll({cursorcolor:'#000'});
    }, 400 );
    $(window).resize(function () {
        $('#columns div, #columns ul, textarea, .videoDescr div, .galleryDescr div').getNiceScroll().resize();
    });
    setTimeout(function () {
        $('.videoDescr div').height($(video).height() - 200);
        $('.galleryDescr div').height($('#slider').height() - 106);
    }, 300 );
    $(window).resize(function () {
        $('.videoDescr div').height($(video).height() - 200);
        $('.galleryDescr div').height($('#slider').height() - 106);
    });
}
else {
    $('header nav').hide();
    $('header nav a').click(function () {
        $('header nav').slideUp(300);
        $('header span').html('&#xf0c9;');
        $('.overlay').fadeOut(300);
    });
    $('header span').click(function () {
        if ($('header nav').is(':hidden')) {
            $('.customizeButtons, .customizeHeroPanel').fadeOut(300);
            $('.textPanel section').width(0);
            $('header nav').slideDown(300);
            $(this).html('&#xf00d;');
            $('.overlay').fadeIn(300);
        }
        else {
            $('header nav').slideUp(300);
            $(this).html('&#xf0c9;');
            $('.overlay').fadeOut(300);
        }
    });
    $('.overlay').click(function () {
        $('header nav').slideUp(300);
        $('header span').html('&#xf0c9;');
        $('.overlay').fadeOut(300);
    });
    $('#columns').addClass('listBottom');
    $('.selectLayout .listBottom').addClass('act');
}
//header
    var lastId,
        topMenu = $('nav'),
        topMenuHeight = topMenu.outerHeight() + 200,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) { return item;}
        });
    $('header').on('click', 'a', function (e) {
        e.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top + 1;
        $('body, html').animate({scrollTop: top}, 800);
    });
    $(window).scroll(function() {
        var fromTop = $(this).scrollTop() + topMenuHeight;
        var cur = scrollItems.map(function() {if ($(this).offset().top < fromTop) return this;});
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            $('nav a').removeClass("act");
            menuItems.filter("[href=#"+id+"]").addClass("act");
        }
    });
//customizeButtons
    $('#customizeButtons').click(function () {
        $('.overlay, .customizeButtons').fadeIn(300);
    });
    $('.customizeButtons button').click(function () {
        var buttonID = $(this).attr('id');
        $('.customButton:not(#r32, #r16, #r0)').removeClass().addClass('customButton' + ' ' + buttonID);
        $('.overlay, .customizeButtons').fadeOut(300);
    });
//customizeHeroPanel
    $('#customizeHeroPanel').click(function () {
        $('.overlay, .customizeHeroPanel').fadeIn(300);
    });
    $('#browseBI').click(function () {
        $('.customizeHeroPanel input').click();
    });
    $('#applyBI').click(function () {
        $('.heroPanel .back').css('background-image', 'url(../images/userImage.jpg?' + Math.random());
        $('.overlay, .customizeHeroPanel').fadeOut(300);
    });
    $('#resetBI').click(function () {
        $('.back').css('background-image', '');
        $('.overlay, .customizeHeroPanel').fadeOut(300);
    });
//textPanelCustomization
    $('.textPanel section').width(0);
    $('#columns div').height($('#columns ul').height());
    $('#customizePanel').click(function () {
        $('.textPanel section').css({'width':''});
        $('.overlay').fadeIn(300);
    });
    selClass = $('.textPanel section .act').attr('class');
    $('.textPanel section a').click(function () {
        $(this).siblings('a').removeClass('act');
        selClass = $(this).attr('class');
        $(this).addClass('act');
    });
    $('#cancelTP').click(function () {
        $('.textPanel section a').removeClass('act').each(function () {
            if ($(this).attr('class') == $('#columns').attr('class')) {
                $(this).addClass('act')
            }
        });
        $('.textPanel section').width(0);
        $('.overlay').fadeOut(300);
    });
    $('#applyTP').click(function () {
        $('#columns').removeClass().addClass(selClass);
        $('.textPanel section').width(0);
        $('.overlay').fadeOut(300);
        setTimeout(function () {
            $('#columns div, #columns ul, textarea').getNiceScroll().resize();
        }, 300 );
    });
    $('#columns a').click(function () {
        if ($(this).parent().height() == $('.list').height()) {
            $(this).html('less <span class="fa">&#xf106;</span>')
                .css('box-shadow', 'none')
                .parent().css({
                'height': 'auto',
                'padding-bottom': '40px'
            });
        }
        else {
            $(this).html('more <span class="fa">&#xf107;</span>')
                .css('box-shadow', '')
                .parent().css({
                'height': $('.list').height(),
                'padding-bottom': ''
            });
        }
    });
//overlay
    $('.overlay').click(function () {
        $('.overlay, .customizeButtons, .customizeHeroPanel').fadeOut(300);
        $('.textPanel section a').removeClass('act').each(function () {
            if ($(this).attr('class') == $('#columns').attr('class')) {
                $(this).addClass('act')
            }
        });
        $('.textPanel section').width(0);
    });
//loginPanel
    $('#textFields a').click(function () {
        $(this).addClass('act').siblings().removeClass();
        $('#textFields').removeClass().addClass($(this).attr('id'));
    });
//video
    video = $('.video');
    $(video).height($(video).width() * 0.5625);
    $(window).resize(function () {
        $(video).height($(video).width() * 0.5625);
    });
    $('.videoDescr span a').click(function () {
        $(this).addClass('act').siblings().removeClass();
        $('.video iframe').removeClass('act').each(function () {
            if ($(this).index() == $('.videoDescr .act').index()) {
                $(this).addClass('act');
            }
        });
    });
    $('.videoDescr div a').click(function () {
        if ($(this).parent().height() == 260) {
            $(this).html('less <span class="fa">&#xf106;</span>')
                .css('box-shadow', 'none')
                .parent().css({
                'height': 'auto',
                'padding-bottom': '40px'
            });
        }
        else {
            $(this).html('more <span class="fa">&#xf107;</span>')
                .css('box-shadow', '')
                .parent().css({
                'height': '',
                'padding-bottom': ''
            });
        }
    });
//gallery
    galImages = $('#slider .slides').clone();
    $('#carousel .slides').append(galImages);
    galPrev = (($('#slider').width() - 60) / 4);
    $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: galPrev,
        itemMargin: 20,
        asNavFor: '#slider'
    });
    $('#slider').flexslider({
        animation: "slide",
        animationLoop: false,
        slideshow: false,
        sync: "#carousel"
    });
    $('.galleryDescr div a').click(function () {
        if ($(this).parent().height() == 260) {
            $(this).html('less <span class="fa">&#xf106;</span>')
                .css('box-shadow', 'none')
                .parent().css({
                'height': 'auto',
                'padding-bottom': '40px'
            });
            $('.gallery').css('background', '#FCB81E');
        }
        else {
            $(this).html('more <span class="fa">&#xf107;</span>')
                .css('box-shadow', '')
                .parent().css({
                'height': '',
                'padding-bottom': ''
            });
            $('.gallery').css('background', '');
        }
    });
//SCALES
    $('#scale1, #scale2, #scale3').val(0).knob();
    $('#scale4').val(0).knob({format: function (v) {return v + "+";}});
    function sc() {
        $(".scales input").each(function () {
            var df = $(this);
            var targetVal = df.attr('value');
            var presentVal = 0;
            setTimeout(function () {
                var counter = setInterval(function () {
                    presentVal = ++ presentVal;
                    df.val(presentVal);
                    df.trigger('change');
                    if (parseInt(presentVal) === parseInt(targetVal)) {
                        clearInterval(counter);
                    }
                }, 10);
            }, 200);
        });
    }
    $(window).scroll(function () {
        scalesPos = Math.round($('.scales').offset().top);
        //console.log($(window).scrollTop());
        if ($(window).scrollTop() + $(window).height() - 180 > scalesPos) {
            if ($('.scales').hasClass('vis')) {
                return;
            }
            else {
                sc();
                $('.scales').addClass('vis');
            }
        }
        if ($(window).scrollTop() < scalesPos - $(window).height() - 100) {
            $('.scales').removeClass('vis');
            $('#scale1, #scale2, #scale3').val(0).knob();
            $('#scale4').val(0).knob({format: function (v) {return v + "+";}});
        }
    });
});