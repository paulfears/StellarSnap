<script lang='ts'>
    import { onMount } from "svelte";
    import {canvasRope} from './rope';
    import RenderMaker from './CanvasRenderer';
    import {Pen} from './drawPen';
    import StellarTOKENSPNG from './images/stellarTokens_transparent.png';

    import windowsImg from './images/windows.webp';
    import checkmark from './images/checkmark.png';

    export let SignatureCallback:Function = (sig:Point[][])=>{};

    let context:CanvasRenderingContext2D;
    let canvas:HTMLCanvasElement;
    let stellarImage:any;
    let backgroundImage:any;
    let penImage:any;
    let checkmarkImage:any;
    
    
    onMount(()=>{
        const img0 = document.createElement("img");
        img0.src = StellarTOKENSPNG;
        img0.onload = () => {
            stellarImage = img0;
        };
        const img1 = document.createElement("img");
        img1.src = windowsImg;
        img1.onload = () => {
            backgroundImage = img1;
        }
        const img3 = document.createElement('img');
        img3.src = checkmark;
        img3.onload = () =>{
            checkmarkImage = img3;
        }
        context = canvas.getContext('2d') as CanvasRenderingContext2D;

        //const rope = new canvasRope(canvas, context, {x:100,y:600}, {x:50, y:50}, {maxX:800, maxY:600});
        
        let renderMaker = new RenderMaker(canvas, context, 60);
        function drawBackground(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, dts?:number){
            try{
                context.rect(0, 0, canvas.width, canvas.height);
                context.fillStyle = "tan";
                context.fill();

                //context.drawImage(backgroundImage, 0,0, canvas.width, canvas.height);
                context.drawImage(stellarImage, 0,0, 800, (800*0.75));
                //context.drawImage(penImage, 0, 270, 340, 320);
                context.drawImage(checkmarkImage, -50, 430);
            }
            catch(e){
                //ignore before image is loaded
            }
        }
        let pen = new Pen(canvas, context, 0, 270, 340, 320);
        //pen.maxX = 800;
        //pen.maxY = 400;

        pen.setTimerCallback(SignatureCallback);


        renderMaker.addDrawFunc(drawBackground);
        renderMaker.addDrawFunc(pen.draw.bind(pen));
        //renderMaker.addDrawFunc(rope.draw.bind(rope));

        //renderMaker.addUpdateFunc(rope.tick.bind(rope));
        renderMaker.addUpdateFunc(pen.update.bind(pen));
        //renderMaker.addMouseMove(rope.onMouseMove.bind(rope));
        renderMaker.addMouseMove(pen.onMouseMove.bind(pen));
        renderMaker.addMouseDown(pen.onMouseDown.bind(pen));
        renderMaker.addMouseUp(pen.onMouseUp.bind(pen));
        //renderMaker.addMouseOut(pen.onMouseOut.bind(pen));
        renderMaker.addTouchDown(pen.onTouchDown.bind(pen));
        renderMaker.addTouchMove(pen.onTouchMove.bind(pen));
        renderMaker.addTouchUp(pen.onTouchUp.bind(pen));
        renderMaker.start()
    })

</script>
<center>
    
    <canvas style="height:500px; width:auto;"  width={900}, height={700}, bind:this={canvas} ></canvas>
</center>

<style>
    
</style>