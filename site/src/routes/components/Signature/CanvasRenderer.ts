export class App {
    constructor(
    window,
    canvas,
    context,
    updateHandler,
    drawHandler,
    frameRate = 60)
    {
        
      this._window = window;
      this._canvas = canvas;
      this._context = context;
      this._updateHandler = updateHandler;
      this._drawHandler = drawHandler;
      this._frameRate = frameRate;
      this._lastTime = 0;
      this._currentTime = 0;
      this._deltaTime = 0;
      this._interval = 0;
      this.onMouseMoveHandler = (x, y) => {};
      this.onMouseDownHandler = (x, y) => {};
      this.onMouseUpHandler = (x,y) => {};

      this.onTouchDownHandler = (x, y) => {};
      this.onTouchMoveHandler = (x, y) => {};
      this.onTouchUpHandler = (x, y) => {};
      this.onMouseOutHandler = (x, y) => {};

      this.start = this.start.bind(this);
      this._onMouseEventHandlerWrapper = this._onMouseEventHandlerWrapper.bind(
      this);
  
      this._onRequestAnimationFrame = this._onRequestAnimationFrame.bind(this);
    }
  
    start() {
      this._lastTime = new Date().getTime();
      this._currentTime = 0;
      this._deltaTime = 0;
      this._interval = 1000 / this._frameRate;
  
      this._canvas.addEventListener(
      "mousemove",
      e => {
        this._onMouseEventHandlerWrapper(e, this.onMouseMoveHandler);
      },
      false);
      this._canvas.addEventListener(
        "touchmove",
        e => {
          this._onMouseEventHandlerWrapper(e, this.onTouchMoveHandler);
        },
      false);
  
      this._canvas.addEventListener(
      "mousedown",
      e => {
        this._onMouseEventHandlerWrapper(e, this.onMouseDownHandler);
      },
      false);
      this._canvas.addEventListener(
        "touchstart",
        e => {
          this._onMouseEventHandlerWrapper(e, this.onTouchDownHandler);
        },
        false);

      this._canvas.addEventListener(
        "mouseup",
        (e) => {
          this._onMouseEventHandlerWrapper(e, this.onMouseUpHandler);
        }
      )
      this._canvas.addEventListener(
        "touchend",
        (e) => {
          this._onMouseEventHandlerWrapper(e, this.onTouchUpHandler);
        }
      )

      this._canvas.addEventListener(
        "mouseout",
        (e) => {
          this._onMouseEventHandlerWrapper(e, this.onMouseOutHandler);
        }
      )
      
  
  
      this._onRequestAnimationFrame();
    }
  
    _onMouseEventHandlerWrapper(e, callback) {
      let rect = this._canvas.getBoundingClientRect();
      
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      let element = this._canvas;
      //let x;
      //let y;
      
      let pageX;
      let pageY;
      if(e.touches !== undefined && e.touches.length > 0){
       
        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;

      }
      else{
        let x = (e.clientX- rect.left) 
        let xScalar = (element.width/rect.width) ;
        let y = (e.clientY - rect.top)
        let yScalar = (element.height/rect.height);
        
        x = x*xScalar;
        y = y*yScalar;
        return callback(x, y);
      }
      
      x = (pageX / rect.width)*this._canvas.width;
      y = (pageY / rect.height)*this._canvas.height;
      x -= (rect.x/rect.width)*this._canvas.width;
      y -= (rect.y/rect.height)*this._canvas.height;
      
      callback(x, y);
    }
  
    _onRequestAnimationFrame() {
      this._window.requestAnimationFrame(this._onRequestAnimationFrame);
  
      this._currentTime = new Date().getTime();
      this._deltaTime = this._currentTime - this._lastTime;
  
      if (this._deltaTime > this._interval) {
  
        //delta time in seconds
        const dts = this._deltaTime * 0.001;
  
        this._updateHandler(dts);
  
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._drawHandler(this._canvas, this._context, dts);
  
        this._lastTime = this._currentTime - this._deltaTime % this._interval;
      }
    }}

export default class CanvasRenderer{
    canvas:HTMLCanvasElement;
    context:CanvasRenderingContext2D;
    frameRate:number;
    updateHandlerArray:Function[] = [];
    drawHandlerArray:Function[] = [];
    _renderer:App|null = null;
    mouseMoveHandlerArray: Function[] = [];
    mouseDownHandlerArray: Function[] = [];
    mouseUpHandlerArray: Function[] = [];
    mouseOutHandlerArray: Function[] = [];

    touchDownHandlerArray: Function[] = [];
    touchMoveHandlerArray: Function[] = [];
    touchUpHandlerArray: Function[] = [];
    

    constructor( canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, frameRate = 60){
        this.canvas = canvas;
        this.context = context;
        this.frameRate = frameRate;   
    }

    addDrawFunc(func:Function){
        this.drawHandlerArray.push(func);
    }

    addUpdateFunc(func:Funciton){
        this.updateHandlerArray.push(func)
    }

    addMouseMove(func:Function){
        this.mouseMoveHandlerArray.push(func);
    }
    addMouseDown(func:Function){
      console.log("mouse down func added");
      console.log(func);
      this.mouseDownHandlerArray.push(func);
      console.log(this.mouseDownHandlerArray);
    }
    addMouseUp(func:Function){
      console.log("mouse up func added");
      console.log(func);
      this.mouseUpHandlerArray.push(func);
      console.log(this.mouseUpHandlerArray);
    }

    addTouchDown(func:Function){
      console.log("touch down func added");
      console.log(func);
      this.touchDownHandlerArray.push(func);
      console.log(this.touchDownHandlerArray);
    }
    addTouchMove(func:Function){
      this.touchMoveHandlerArray.push(func);
    }
    addTouchUp(func:Function){
      console.log("touch down func added");
      console.log(func);
      this.touchUpHandlerArray.push(func);
      console.log(this.touchUpHandlerArray);
    }

    addMouseOut(func:Function){
      this.mouseDownHandlerArray.push(func);
    }

    start(){
        const getCombinedFunc = function(funcs:Function[]){
            
            return (canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, dts:number)=>{
                for(let func of funcs){
                    func(canvas, context, dts);
                }
            }
        }
        
        this._renderer = new App(
            window, 
            this.canvas, 
            this.context, 
            getCombinedFunc(this.updateHandlerArray), 
            getCombinedFunc(this.drawHandlerArray), this.frameRate
        );
        this._renderer.onMouseMoveHandler = getCombinedFunc(this.mouseMoveHandlerArray);
        this._renderer.onMouseDownHandler = getCombinedFunc(this.mouseDownHandlerArray);
        this._renderer.onMouseUpHandler = getCombinedFunc(this.mouseUpHandlerArray);
        this._renderer.onMouseOutHandler = getCombinedFunc(this.mouseOutHandlerArray);
        
        this._renderer.onTouchDownHandler = getCombinedFunc(this.touchDownHandlerArray);
        this._renderer.onTouchMoveHandler = getCombinedFunc(this.touchMoveHandlerArray);
        this._renderer.onTouchUpHandler = getCombinedFunc(this.touchUpHandlerArray);
        
        this._renderer.start();
    }




}