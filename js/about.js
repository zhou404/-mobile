var scorll_i = -1;

$(function () {

    $('.product-list').find('.product-text').css({top:'230px',opacity:'0'});
    $('.product-list').hover(function () {
        $(this).find('.product-text').css({top:'0',opacity:'0.7'});
    },function () {
        $(this).find('.product-text').css({top:'230px',opacity:'0'});
    })
    $('.product-list .product-text').hover(function () {
        return false;
    })
    // var timestamp = (new Date()).getTime();
    var c = $(window).height();
    var h = window.screen.availHeight;
    <!--调用Luara示例(轮播)-->
    // console.log(c,h);
    $(".example").luara({width: "100%", height: c - 100, interval: 4000, selected: "seleted"});
    //设置高度
    $('.all').css('height', c);
    //鼠标滚动事件
    var hei = 0;
    // console.log(timestamp);
    // var t = (new Date()).getTime();
    // t = t - 3000;
    // console.log(t)
    $(document).bind('mousewheel', function (event, delta) {
        // $(document).unbind('mousewheel');

        // console.log(event.originalEvent.deltaY)
        // console.log(event.timeStamp)
        // var newhei = document.documentElement.scrollTop;
        var newt = (new Date()).getTime();
        if (event.originalEvent.deltaY < 0) {
            if (parseInt(event.timeStamp) - parseInt(hei) > 1000) {
                $('.abouts-box').css({opacity: 0});
                $('.abouts-box').css({opacity: 0});
                $('.abouts-box').animate({opacity: 0.87},1000);
                if(scorll_i != -1){
                    scorll_i--;
                    $('.left-all ul').find('li').css({background:'#fff'});
                    $('.left-all ul').find('li').eq(scorll_i + 1).css({background:'red'});
                }

                hei = event.timeStamp;
                gun(scorll_i);
            }
            // hei = newhei;
            var e = event || window.event;
            if(e.defaultPrevented){
                e.defaultPrevented();
                e.stopPropagation();
            }
            return false;
            // console.log(i)
        } else {
            if (parseInt(event.timeStamp) - parseInt(hei) > 1000) {
                $('.yellow').css({left: '-900px'});
                $('.about-text').find('p').css({top: '900px'});
                $('.about-text').find('p').eq(3).css({top: '-700px'});
                $('.product-box').css({left: '1000px'});
                // $('.horo-box').find('.horo-list').eq(0).css({left:'0'});
                $('.horo-box').find('.horo-list').css({left:'-800px'});
                if(scorll_i != 5){
                    scorll_i++;
                    $('.left-all ul').find('li').css({background:'#fff'});
                    $('.left-all ul').find('li').eq(scorll_i + 1).css({background:'red'});
                }

                hei = event.timeStamp;
                gun(scorll_i);
            }
            var e = event || window.event;
            if(e.defaultPrevented){
                e.defaultPrevented();
                e.stopPropagation();
            }
            e.stopPropagation();
            // hei = newhei;
            return false;
        }

        // $(window).off('scroll');

        // document.documentElement.scrollTo(c * i, c * (i + 1));
    })
    function gun(scorll_i) {
        // console.log(scorll_i)
        //about
        if (scorll_i == 0) {
            setTimeout(two, 500);
            setTimeout(three, 700);
            setTimeout(four, 900);
            $('.yellow').animate({left: '0'}, 1000);
            $('.about-text').find('p').eq(0).animate({top: '150px'}, 500);
        }
        //product
        if (scorll_i == 1) {
            $('.product-box').animate({left: '0px'}, 1000);

            // setTimeout(box(), 100);
            // setTimeout(box_two, 500);
            // $('.product-box').animate({left:'100px'},500);

            // $('.product-box').animate({left:'0px'},500);
        }
        if( scorll_i == 2){
            $('.horo-box').find('.horo-list').animate({left:'0'},1000);
        }if( scorll_i == 3){

        }if( scorll_i == 4){

        }
        document.documentElement.scrollTo(c * scorll_i, c * (scorll_i + 1));
    }
    //about
    function two() {
        $('.about-text').find('p').eq(1).animate({top: '100px'}, 500)
    }

    function three() {
        $('.about-text').find('p').eq(2).animate({top: '120px'}, 500)
    }

    function four() {
        $('.about-text').find('p').eq(3).animate({top: '0'}, 500)
    }

    //product
    function box() {
        $('.product-box').animate({left: '100px'})
    }
    function box_two() {
        $('.product-box').animate({left: '0px'}, 500)
    }
    // $('body').on('mousewheel', function(event) {
    //     if(event.originalEvent.deltaY > 0){
    //         console.log('下滑')
    //         $('body').animate({scrollTop: c})
    //     }else if(event.originalEvent.deltaY < 0){
    //         console.log('上滑')
    //     }
    // });

});
//about
$('.mo.dowon').click(function () {
    $('.nav-list').addClass('up');
    $(this).addClass('up-nav')
    $(this).removeClass('dowon')
})
// $(document).on('click','.up-nav',function () {
//     // alert(1);
//     $('.nav-list').removeClass('up');
//     $(this).removeClass('up-nav')
//     $(this).addClass('dowon')
// })
