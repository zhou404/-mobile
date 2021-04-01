function scrollPage(){

    var cb;
    var all=3,page = 1;

    var startTime = new Date().getTime();
    $(window).load(function(){
        all = Math.ceil($(".main").height()/$(window).height());

        $('.left-all ul').html("");
        for (var i=0;i<all;i++){
            // var li = $("<li/>");
            // li.css({"background-color":"white","cursor":"pointer"});
            if(i==0){
                // li.addClass('active');

                var li = "<li class='active'><span></span></li>";
            }else{
                var li = "<li><span></span></li>";
            }
            $('.left-all ul').append(li);
        }
    })
    var scrollFunc = function (e) {


        var st1 = new Date().getTime();
        if(st1 - startTime > 1000){
            startTime = st1;
        }else{
            return;
        }
        e = e || window.event;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                up();
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                down();
            }
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail> 0) { //当滑轮向下滚动时
                down();
            }
            if (e.detail< 0) { //当滑轮向上滚动时
                up();
            }
        }

    }

    function up(){
        if(page<=1){
            return;
        }
        page--;
        go();
    }
    function down(){

        if(page>=all){
            return;
        }
        page++;

        go();
    }
    function go1(p,callback){
        all=p;
        cb = callback;
    }
    function go(){
        if(cb){
            cb(page);
        }else{
            page = 1;
        }


        $('.left-all ul').find('li').removeClass('active');
        $('.left-all ul').find('li').eq(page-1).addClass('active');
        if(all==page){
            $(".main").stop().animate({top:0-$(".main").height()+$(window).height()},1000)
        }else{
            $(".main").stop().animate({top:0-(page-1)*$(window).height()},1000)
        }

    }

    if(document.attachEvent){
        document.attachEvent('onmousewheel',scrollFunc);

    }
    //Firefox使用addEventListener添加滚轮事件
    if (document.addEventListener) {//firefox
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    //Safari与Chrome属于同一类型
    window.onmousewheel = document.onmousewheel = scrollFunc;
    $(document).on('click','.left-all ul li',function () {
        var index = $(this).index();
        page=index+1;
        go();
    });
    go();
    return go1;
};
