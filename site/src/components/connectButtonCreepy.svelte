<script>
    import ConnectImg from '$lib/images/buttonCreepy/ConnectButton.gif';
    import ConnectClicked from '$lib/images/buttonCreepy/clicked-noloop.gif';
    import { fade, scale } from 'svelte/transition';
    function handleClick(event){
        console.log(event);
        currentImage = ConnectClicked;
        setTimeout(cleanUp, 4000);
    }
    

    let isPressed = false;
    let currentImage = ConnectImg;
    function cleanUp(){
        currentImage = ConnectImg;
    }
    function pressButton() {

        isPressed = true;
        setTimeout(() => {
            isPressed = false;
        }, 200);
    }
    
</script>
<div style="position:relative;" class="imageButton">
<img on:click={handleClick} src={currentImage} alt="Connect" />
</div>

<style>
    img{
        cursor: pointer;
        margin: 5px;
        min-width: 250px;
    }
    img:hover{
        transform: scale(1.1);
    }
    .buttonPressing {
        animation: 0.25s linear 0s  button-press;
    }
    img:active{       
    box-shadow: 0 5px #666;
    transform: translateY(4px);
    }
    @keyframes button-press {
     0% { transform: scale(1); }
     25%{ transform: scale(0.7); }
     90% { transform: scale(1.5); }
     100% { transform: scale(1); }
    }
</style>