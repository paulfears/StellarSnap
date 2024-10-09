//A small scaffold specifically to help me design code pen interactions

//Math extensions
Math.lerp = (first, second, percentage) => {
  return first + (second - first) * percentage;
};

Math.clamp = (value, min, max) => {
  return value < min ? min : value > max ? max : value;
};

class Vector2 {
  static zero() {
    return { x: 0, y: 0 };
  }

  static sub(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  }

  static add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
  }

  static mult(a, b) {
    return { x: a.x * b.x, y: a.y * b.y };
  }

  static scale(v, scaleFactor) {
    return { x: v.x * scaleFactor, y: v.y * scaleFactor };
  }

  static mag(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  static normalized(v) {
    const mag = Vector2.mag(v);

    if (mag === 0) {
      return Vector2.zero();
    }
    return { x: v.x / mag, y: v.y / mag };
  }
}




//each rope part is one of these
//uses a high precison varient of Störmer–Verlet integration
//to keep the simulation consistant otherwise it would "explode"!
class RopePoint {
  //integrates motion equations per node without taking into account relationship
  //with other nodes...
  static integrate(point, gravity, dt, previousFrameDt) {
    point.velocity = Vector2.sub(point.pos, point.oldPos);
    point.oldPos = { ...point.pos };

    //drastically improves stability
    let timeCorrection = previousFrameDt != 0.0 ? dt / previousFrameDt : 0.0;

    let accel = Vector2.add(gravity, { x: 0, y: point.mass });

    const velCoef = timeCorrection * point.damping;
    const accelCoef = Math.pow(dt, 2);

    point.pos.x += point.velocity.x * velCoef + accel.x * accelCoef;
    point.pos.y += point.velocity.y * velCoef + accel.y * accelCoef;
  }

  //apply constraints related to other nodes next to it
  //(keeps each node within distance)
  static constrain(point) {
    if (point.next) {
      const delta = Vector2.sub(point.next.pos, point.pos);
      const len = Vector2.mag(delta);
      const diff = len - point.distanceToNextPoint;
      const normal = Vector2.normalized(delta);

      if (!point.isFixed) {
        point.pos.x += normal.x * diff * 0.25;
        point.pos.y += normal.y * diff * 0.25;
      }

      if (!point.next.isFixed) {
        point.next.pos.x -= normal.x * diff * 0.25;
        point.next.pos.y -= normal.y * diff * 0.25;
      }
    }
    if (point.prev) {
      const delta = Vector2.sub(point.prev.pos, point.pos);
      const len = Vector2.mag(delta);
      const diff = len - point.distanceToNextPoint;
      const normal = Vector2.normalized(delta);

      if (!point.isFixed) {
        point.pos.x += normal.x * diff * 0.25;
        point.pos.y += normal.y * diff * 0.25;
      }

      if (!point.prev.isFixed) {
        point.prev.pos.x -= normal.x * diff * 0.25;
        point.prev.pos.y -= normal.y * diff * 0.25;
      }
    }
  }

  constructor(initialPos, distanceToNextPoint) {
    this.pos = initialPos;
    this.distanceToNextPoint = distanceToNextPoint;
    this.isFixed = false;
    this.oldPos = { ...initialPos };
    this.velocity = Vector2.zero();
    this.mass = 1.0;
    this.damping = 1.0;
    this.prev = null;
    this.next = null;
  }}


//manages a collection of rope points and executes
//the integration
class Rope {
  //generate an array of points suitable for a dynamic
  //rope contour
  static generate(start, end, resolution, mass, damping) {
    const delta = Vector2.sub(end, start);
    const len = Vector2.mag(delta);

    let points = [];
    const pointsLen = len / resolution;

    for (let i = 0; i < pointsLen; i++) {
      const percentage = i / (pointsLen - 1);

      const lerpX = Math.lerp(start.x, end.x, percentage);
      const lerpY = Math.lerp(start.y, end.y, percentage);

      points[i] = new RopePoint({ x: lerpX, y: lerpY }, resolution);
      points[i].mass = mass;
      points[i].damping = damping;
    }

    //Link nodes into a doubly linked list
    for (let i = 0; i < pointsLen; i++) {
      const prev = i != 0 ? points[i - 1] : null;
      const curr = points[i];
      const next = i != pointsLen - 1 ? points[i + 1] : null;

      curr.prev = prev;
      curr.next = next;
    }

    try{
      points[0].isFixed = points[points.length - 1].isFixed = true;
    }
    catch(e){
      console.log(e);
    }
    console.log(points)
    return points;
  }

  constructor(points, solverIterations) {
    this._points = points;
    this.update = this.update.bind(this);
    this._prevDelta = 0;
    this._solverIterations = solverIterations;

    this.getPoint = this.getPoint.bind(this);
  }

  getPoint(index) {
    return this._points[index];
  }

  update(gravity, dt) {
    for (let i = 1; i < this._points.length - 1; i++) {
      let point = this._points[i];

      let accel = { ...gravity };

      RopePoint.integrate(point, accel, dt, this._prevDelta);
    }

    for (let iteration = 0; iteration < this._solverIterations; iteration++)
    for (let i = 1; i < this._points.length - 1; i++) {
      let point = this._points[i];
      RopePoint.constrain(point);
    }

    this._prevDelta = dt;
  }}


//APP SETUP!

export interface Point{
  x:number,
  y:number
}
export interface Arguments {
  start?:Point,
  end?:Point,
  resolution?: number, //8
  mass?: number,
  damping?: number,
  gravity?: Point,
  solverIterations?: number,
  ropeColour?: string | CanvasGradient,
  ropeSize?: number ;
  maxX?: number | null;
  maxY?: number | null;
}

export class canvasRope{
  canvas:HTMLCanvasElement;
  context:CanvasRenderingContext2D;
  start:Point;
  end:Point;
  args:Arguments;
  points: RopePoint[];
  rope:Rope;
  animationTicker:number =0;
  state:"idle" | "active" | "drawing" = "idle";
  constructor(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, start:Point, end:Point, params?:Arguments){
    this.canvas = canvas;
    this.context = context;
    this.start = start;
    this.end = end;
    this.args = {
        start: { x: 100, y: canvas.height / 2 },
        end: { x: canvas.width - 100, y: canvas.height / 2 },
        resolution: 12,
        mass: 0.88,
        damping: 0.95,
        gravity: { x: 0, y: 3000 },
        solverIterations: 500,
        ropeColour: "white",
        ropeSize: 3,
        maxX: null,
        maxY: null

    }
    
    if(typeof this.args == 'object'){
      let keys:Array<string> = Array.from(Object.keys(params));
      console.log(keys)
      for(let i=0; i<keys.length; i++){
        this.args[keys[i]] = params[keys[i]];
      }
    }
    this.args.start = start;
    this.args.end = end;

  this.points = Rope.generate(
  this.args.start,
  this.args.end,
  this.args.resolution,
  this.args.mass,
  this.args.damping);


  this.rope = new Rope(this.points, this.args.solverIterations);
  this.context.lineWidth = this.args.ropeSize;
  }
  
  tick(dt:number){
    this.rope.update(this.args.gravity, dt);
  };

  animationRenderer(animation:animationType){

  }

  
  drawRopePoints(colour, width){
    this.animationTicker += 1;
    let currentBoog = this.animationTicker%(this.points.length-1);
    this.context.strokeStyle = "cyan";
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];

      const prev = i > 0 ? this.points[i - 1] : null;
       this.context.strokeStyle = "cyan"
      if(this.state === 'drawing'){
        if(currentBoog == i){
          console.log("here")
          //this.context.strokeStyle = "yellow";
          this.context.lineWidth = 15;
        }
        else if((currentBoog+1)%(this.points.length-1) == i){
          //this.context.strokeStyle = "white";
          this.context.lineWidth = 20;
        }
        else if((currentBoog+2)%(this.points.length-1) == i){
          //this.context.strokeStyle = "yellow";
          this.context.lineWidth = 15;
        }
        else{
          this.context.lineWidth = this.args.ropeSize;
        }
      }

      if (prev) {
        this.context.beginPath();
        this.context.moveTo(prev.pos.x, prev.pos.y);
        this.context.lineTo(p.pos.x, p.pos.y);
        
       
        this.context.stroke();
      }
      if(i == this.points.length-1){
        this.context.fillStyle = "black";
        this.context.beginPath();
        if(this.state === 'drawing'){
          this.context.arc(p.pos.x, p.pos.y, 40+3*Math.cos(0.2*this.animationTicker), 0, 2 * Math.PI);
        }
        else{
          this.context.arc(p.pos.x, p.pos.y, 40+3*Math.cos(0.005*this.animationTicker), 0, 2 * Math.PI);
        }
        this.context.fill();
      }
      this.context.strokeStyle = "cyan";
    }
    /*
    if(this.state === 'drawing'){
      let p = this.points[currentBoog]
        this.context.fillStyle = "black";
        this.context.beginPath();
        
        this.context.arc(p.pos.x, p.pos.y, 15, 0, 2 * Math.PI);
        

        this.context.fill();
    }
        */
  };

  //render a rope using the verlet points
  draw(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, dt:number){
    this.drawRopePoints(this.args.ropeColour, this.args.ropeSize);
  };

  onMouseMove(x:number, y:number){
    if(this.state === "idle"){
      return;
    }

      if(this.args.maxX){
        if(x > this.args.maxX){
          x = this.args.maxX
        }
      }
      if(this.args.maxY){
        if(y>this.args.maxY){
          y = this.args.maxY;
        }
      }
      
        let point = this.rope.getPoint(0);
        point.pos.x = x;
        point.pos.y = y;
    };

    setStartPoint(point:Point){
      let ropePoint = this.rope.getPoint(0);
      ropePoint.pos.x = point.x;
      ropePoint.pos.y = point.y;
    }
    setAnchorPoint(point:Point){
      let ropePoint = this.rope.getPoint(this.points.length-1);
      ropePoint.pos.x = point.x;
      ropePoint.pos.y = point.y;
    }
    
  }
  //let point = rope.getPoint(0);
  //point.pos.x = 42;
  //point.pos.y = 310;

  //const app = new App(window, canvas, context, tick, draw, 60);
