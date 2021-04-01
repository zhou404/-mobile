var draw = (function (){
    var canvas,ctx;


    return function(obj){
        canvas = document.getElementById(obj.element);
        var ww = $(window).width();
        var wh = $(window).height();
        canvas.width=ww;
        canvas.height=wh;

        var canvasBoundingRect = canvas.getBoundingClientRect();
        ctx = canvas.getContext("2d");

        
        var x,y,w,h;

        w = canvasBoundingRect.width*0.6;

        h = canvasBoundingRect.height*0.6;

        
        x=(canvasBoundingRect.width-w)/2;
        y=h/2.4;
        
        function drawBackground(){
            ctx.fillStyle="rgba(0,0,0,0.3)";
            ctx.fillRect(x,y,w,h);
            ctx.fill();
        }
        
        

        function Point(index,totalCount){
            var top = obj.data[index].top;
            this.index = index;
            this.x = x + index * (w / (totalCount - 1));
            this.y = y + h - top * (h / 9);
            this.minY = y + h - top * (h / 9);
            this.maxY = y + h;
            this.speed = 10;
            this.r = obj.content.circleRadius;
            this.color = obj.content.circleColor;
            this.finish = false;
            this.isUp = obj.data[index].textUp;
            this.infos = obj.data[index].info;
            this.infoh = this.infos.length*20;
            var beginh = 0;
            this.opt=0;
            if(obj.data[i].textUp==0){
                beginh=this.y+this.infoh;
                this.beginh=this.y+this.infoh+55;
            }else{
                beginh=this.y-this.infoh;
                this.beginh = this.y-this.infoh-55;
            }
            this.nowh=this.beginh;
            this.lasth=beginh;
            console.log(this);
        }
        Point.prototype.move = function(){
            if(!this.finish){
                if(this.isUp==0 && this.nowh<=this.lasth){
                    this.finish = true;
                }else if(this.isUp==1 && this.nowh>=this.lasth){
                    this.finish=true;
                }
            }
        }
        Point.prototype.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        function drawLine(){
            for(var i=0;i<points.length-1;){
                var tp = points[i];
                var np = points[++i];
                ctx.beginPath();
                ctx.strokeStyle=obj.content.lineColor;
                ctx.lineWidth=obj.content.lineWidth;
                ctx.lineCap = "round";
                ctx.moveTo(tp.x,tp.y);
                if(i==points.length-1){
                    ctx.lineTo(np.x-obj.content.circleRadius/2,np.y+obj.content.circleRadius/2);
                }else{
                    ctx.lineTo(np.x,np.y);
                }
                ctx.stroke();
            }
        }

       
        
        var points = [];
        drawBackground();
        for(var i=0;i<obj.data.length;i++){
            var p = new Point(i,obj.data.length);
            p.draw();
            points.push(p);
        }
        drawLine();
        showText();
        
        var si = setInterval(moveAndDraw,50);
        function moveAndDraw(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            drawBackground();
            var allFinish = true;
            for(var i = 0;i<points.length;i++){
                points[i].draw();
                points[i].move();
                if(!points[i].finish){
                    allFinish=false;
                }
            }
            drawLine();
            showText();
            if(allFinish){
                clearInterval(si);
            }
        }
        function showText(){
            for (var i=0;i<points.length;i++){
                var tx = points[i].x;
                var ty = points[i].y+5;
                var text = obj.data[i].title;
                ctx.font="16px Verdana";
                ctx.textAlign = 'center';
                ctx.fillStyle="#fff";
                ctx.fillText(text,tx,ty);

                var infos = points[i].infos;
                var beginh = points[i].nowh;
                ctx.font="14px Verdana";
                for (var j = 0;j<infos.length;j++){
                    console.log(infos[j]);
                    ctx.fillText(infos[j],tx,beginh);
                    if(obj.data[i].textUp==0){
                        beginh+=20;
                    }else{
                        beginh-=20;
                    }
                }
                if(obj.data[i].textUp==0){
                    points[i].nowh-=points[i].speed;
                    points[i].speed--;
                }else{
                    points[i].nowh+=points[i].speed;
                    points[i].speed--;
                }
            }
        }
    }
}());