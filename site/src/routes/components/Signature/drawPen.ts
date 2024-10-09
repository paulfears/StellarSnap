import { canvasRope} from "./rope";
import type { Point } from "./rope";
import PenImg from './images/pen3.png';
import flippedImg from './images/pen3_flipped.png';
//add mouse offets to speed up drawing
export class Pen{
    canvas:HTMLCanvasElement;
    context:CanvasRenderingContext2D;
    x:number;
    y:number;
    startX:number;
    startY:number;
    width:number;
    height:number;
    flipped:boolean = false;
    state:"idle" | "active" | "drawing" = "idle";
    penImage:any;
    hover:boolean = false;
    animationTicker:number =0;
    rope:canvasRope;
    pen_src:any;
    pen_src_flipped:any;
    
    feeler: "mouse" | "finger" = "mouse";

    signature:Point[][] = [];
    currentLine:Point[] = [];

    timeLimit = 2000;
    timerId:number = -1;
    maxX:number = Infinity;
    maxY:number = Infinity;
    endDrawCallback:Function = function(signature:Point[][]){}

    
    constructor(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, x:number , y:number, width:number, height:number){
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.pen_src = document.createElement('img');
        this.pen_src.src = PenImg;
        this.pen_src.onload = () =>{
            this.penImage = this.pen_src;
        }
        this.pen_src_flipped = document.createElement('img');
        this.pen_src_flipped.src = flippedImg;
        this.pen_src_flipped.onload = () =>{
            console.log("flipped loaded");
        }
        this.rope = new canvasRope(canvas, context, {x:350, y:760}, {x:50, y:50}, {maxX:800, maxY:600});
        this.rope.setStartPoint({x:this.x+(this.width/10), y:this.y+(this.height/10)});
    }
    pickUp(){
        this.state = "active";
    }
    drawing(){
        this.state = "drawing";
    }
    

    createTimer(){
        this.timerId = setTimeout(this.endDrawCallback, this.timeLimit, this.signature);
    }
    clearTimer(){
        clearTimeout(this.timerId);
    }
    setTimerCallback(func:Function){
        this.endDrawCallback = func;
    }
    setTimerLimit(ms:number){
        this.timeLimit = ms;
    }
    
    checkPenCollision(x,y, draw=false){
        let penWidth = this.width/5;
        let boxNum = 20;
        let box = [this.x-(this.width/10), this.y, penWidth, this.height/boxNum]
        for(let i = 0; i<boxNum; i++){
            if(box[0] < x && box[0]+box[2] > x){
                if(box[1] < y && box[1]+box[3] > y){
                    return true;
                }
            }
            box[0] += this.width/boxNum;
            box[1] += this.height/boxNum;
            if(draw){
                this.context.fillRect(box[0], box[1], box[2], box[3]);
            }
        }
        return false;
    }

    drawSignature(){
        function drawPoints(ctx, points) {
            // draw a basic circle instead
            if(points.length < 1){
                return;
            }
            if (points.length < 6) {
                var b = points[0];
                ctx.beginPath(), ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0), ctx.closePath(), ctx.fill();
                return
            }
            ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);
            // draw a bunch of quadratics, using the average of two points as the control point
            for (let i = 1; i < points.length - 2; i++) {
                var c = (points[i].x + points[i + 1].x) / 2,
                    d = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, c, d)
            }
            ctx.quadraticCurveTo(
                points[points.length-2].x, 
                points[points.length-2].y, 
                points[points.length-1].x, 
                points[points.length-1].y)
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
        
        this.context.beginPath();
        for(let line of this.signature){
            for(let i = 0; i<line.length; i++){
                if(i === 0){
                    this.context.moveTo(line[i].x, line[i].y);
                }
                else{
                    this.context.lineTo(line[i].x, line[i].y);
                }
            }
        }
        for(let i = 0; i<this.currentLine.length; i++){
            if(i === 0 ){
                this.context.moveTo(this.currentLine[i].x, this.currentLine[i].y)
            }
            else{
                this.context.lineTo(this.currentLine[i].x, this.currentLine[i].y);
            }
        }
        this.context.strokeStyle = 'black';
        this.context.stroke();
    }

    draw(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, dt:number){
        this.animationTicker +=1;
        this.drawSignature();
        if(this.hover){
            
            let breather = 25*Math.cos(this.animationTicker/10);
            this.x -= (breather/2);
            this.y -= (breather/2);
            this.width += breather;
            this.height += breather
        }

        if(this.flipped){
            this.rope.setStartPoint({x:this.x-(this.width/10)+(this.width), y:this.y+(this.height/10)}); 
        }
        else{
            this.rope.setStartPoint({x:this.x+(this.width/10), y:this.y+(this.height/10)});
        }
        this.rope.draw(this.canvas, this.context, dt);
        
        if(this.flipped){
            this.context.drawImage(this.pen_src_flipped, this.x, this.y, this.width, this.height)
        }
        else{
            this.context.drawImage(this.penImage, this.x, this.y, this.width, this.height)
        }
        

        if(this.hover){
            
            let breather = 25*Math.cos(this.animationTicker/10);
            this.x += (breather/2);
            this.y += (breather/2);
            this.width -= breather;
            this.height -= breather
        }

        if(this.flipped){
            this.context.restore();
        }

    }
    update(dt:number){
        
        this.rope.tick(dt);
    }
    onMouseMove(x,y){
        if(x > this.maxX){
            x = this.maxX;
        }
        if(y > this.maxY){
            y = this.maxY;
        }
        if(this.state === 'idle'){
            if(this.checkPenCollision(x,y)){
                this.hover = true;
                this.canvas.style.cursor = 'grab';
            }
            else{
                this.hover = false;
                this.canvas.style.cursor = 'pointer';
            }
        }
        if(this.state === 'active' && this.flipped){
            
            this.y = y-((this.height/8)*6);
            this.x = x-((this.height/3));
            if(this.x < -25){
                this.state = 'idle';
                this.x = this.startX;
                this.y = this.startY;
                this.flipped = false;
                //this.clearTimer();
            }
            //this.canvas.style.cursor = 'none';
        }

        if(this.state === 'drawing' && this.flipped){

            this.y = y-((this.height/8)*6);
            this.x = x-((this.height/3));

            if(this.animationTicker % 2 === 0){ //makes this run twice as fast
                this.currentLine.push({
                    x:this.x+(this.width/40), 
                    y:this.y+this.height-(this.height/22)
                });
            }
        }


        

    }
    onTouchMove(x,y){
        if(this.state === 'drawing'){
            if(this.animationTicker%2 === 0){
                this.currentLine.push({x:x, y:y})
                this.y = y-this.height;
                this.x = x-this.width;
            }
        }
    }
    onMouseDown(x,y){
        
        if(this.checkPenCollision(x,y) && this.state === 'idle'){
            this.state = 'active';
            this.hover = false;
            this.hover = false;
            this.flipped = true;
        }
        if(this.state === 'active'){
            this.clearTimer();
            this.state = 'drawing';
            this.canvas.style.cursor = 'grabbing';
            this.rope.state = 'drawing';
            this.y = y-((this.height/8)*6);
            this.x = x-((this.height/3));
        }
    }
    onTouchDown(x, y){
        this.clearTimer();
        console.log("here in touch down");
        console.log(x,y);
        this.feeler = 'finger';
        this.state = 'drawing';
        this.rope.state = 'drawing';
        this.y = y-this.height;
        this.x = x-this.width;
        
    }

    onMouseUp(){
        if(this.state === 'drawing'){
            this.state = 'active';
            this.rope.state = 'active';
            this.canvas.style.cursor = 'grab';
            this.signature.push(this.currentLine);
            this.currentLine = [];
            if(this.signature.length > 1){
                this.createTimer();
            }
        }
    }
    onMouseOut(){
        this.onMouseUp();
    }
    onTouchUp(){
        if(this.state === 'drawing'){
            this.state = 'active';
            this.rope.state = 'active';
            this.signature.push(this.currentLine);
            this.currentLine = [];
            this.createTimer();
        }
    }

}