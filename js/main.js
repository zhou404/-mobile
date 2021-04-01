(function($){
	$.fn.changePic = function(options){
		var defaults = {
			figureTime:5000,         //鍒囨崲鏃堕棿
			figureBtnAct: 'ctrl-sel', //鎸夐挳 li 鐨勬牱寮�
			aroundEvent:'click',     //宸﹀彸鎸夐挳浜嬩欢
			showButton: true ,       //寮€鍏�
			switcHover: true,        //寮€鍏�
			clickNode:$(".page-ctrl li"),//鐐瑰嚮鐨勮妭鐐�
			loopNode:$(".banner-pic"),//杩愬姩鐨勫眰
			loopCircle:"-1200px", //杩愬姩鐨勮寖鍥�
			loopTime:700, //杩愬姩鍒囨崲鐨勬椂闂�
			sameNode:$(".same-pic-lop"), //鐩稿悓灞�
			attrData:"statics", //鑷畾涔夊睘鎬�
			leftBtn:$(".next-ctrl"),
			rightBtn:$(".prev-ctrl"),
		}

		options =$.extend(defaults, options);
		this.each(function(){
			var _this = $(this); //_this 鏄� 浣犵殑瑙﹀彂鐐�
			var oLi = _this.find(options.clickNode); // 鍒囨崲鎸夐挳
			var oWid = _this.find(options.sameNode).width(); //鑾峰彇鐩稿悓寰幆鐐圭殑瀹藉害
			var oLen = _this.find(options.sameNode).length; //鑾峰彇寰幆鐐圭殑涓暟
			var oBnnerWid = oWid * oLen; // 寰幆鐐瑰灞傝祴鍊煎搴�
			options.loopNode.width(oBnnerWid); // 澶栧眰 鍔犱笂杩欎釜瀹藉害
			var time,page = 0; // 瀹氫箟 鍙傛暟锛屽彲浠ヤ竴璧锋斁鍦╠efaults涓�
			time = setInterval(function(){ // 寰幆寮€濮�
				moveLeft();
			},options.figureTime);
			function moveLeft(){ // 涓嬩竴寮�
				page ++;
				if (page > oLen-1) page = 0;
				options.loopNode.animate({
					"left":options.loopCircle
				},options.loopTime,function(){
					$(this).children().first().appendTo(options.loopNode.css("left","0px"));
					options.showButton = true;
				});
				oLi.eq(page).addClass(options.figureBtnAct).siblings().removeClass(options.figureBtnAct)
			};
			function moveRight(){ // 涓婁竴寮�
				page --;
				if (page < 0) page = oLen-1;
				options.loopNode.children().last().prependTo(options.loopNode).parent().css("left",options.loopCircle).animate({
					"left":"0px"
				},options.loopTime,function(){
					options.showButton = true;
				});
				oLi.eq(page).addClass(options.figureBtnAct).siblings().removeClass(options.figureBtnAct)
			};
			_this.mouseover(function(event) {  //榧犳爣鍦ㄤ笂杈圭殑鏃跺€欏仠姝㈣繍鍔�
				/* Act on the event */
				clearInterval(time);
			}).mouseleave(function(event) { //绂诲紑缁х画
				/* Act on the event */
				if (options.switcHover) {
					options.loopNode.html("");
					for (var i = 0; i < oLen; i++) {
						options.loopNode.append("<img src='img/a"+((i+page)%oLen+1)+".png' name='"+(i+page)%oLen+"' alt='' />")
					};
				};
				time = setInterval(function(){
					moveLeft();
				},options.figureTime)
			});
			options.rightBtn.on(options.aroundEvent, function(event) {  //鎸夐挳鐐瑰嚮鍒囨崲
				if (options.showButton) {
					moveRight();
				};
				options.showButton = false;
			});
			options.leftBtn.on(options.aroundEvent,function(event) { //鎸夐挳鐐瑰嚮鍒囨崲
				if (options.showButton) {
					moveLeft();
				};
				options.showButton = false;
			});
			oLi.on(options.aroundEvent, function(event) { // 鍒囨崲鐐�
				/* Act on the event */
				if (options.switcHover) {
					options.switcHover = false;
					page = $(this).index();
					var oName = options.loopNode.children(options.sameNode).eq(0).attr(options.attrData);
					oLi.eq(page).addClass(options.figureBtnAct).siblings().removeClass(options.figureBtnAct);
					if (page != oName) {
						options.loopNode.children(options.sameNode).filter("["+options.attrData+"="+page+"]").insertAfter(options.loopNode.children(options.sameNode).first()).stop().parent().animate({
							"left":options.loopCircle
						},options.loopTime,function(){
							options.loopNode.children(options.sameNode).first().appendTo(options.loopNode).parent().css("left","0px");
							options.switcHover = true;
						})
					}else{
						options.switcHover = true
					};
				};

			});
		});
	}
})(jQuery);