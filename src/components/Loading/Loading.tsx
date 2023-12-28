import css from './LoadingCSS.module.css';

const Loading = () => {

  window.onload = function(){

    let spinner = (document.getElementById("spinner") as HTMLCanvasElement)
    

    //let ctx: CanvasRenderingContext2D;
    let width: any;
    let height: any;

      let ctx = spinner!.getContext("2d");
      width = spinner!.width;
      height = spinner!.height;
    
      
      
      let degrees = 0;
      let new_degrees = 0;
      let difference = 0;
      let color = "turquoise";
      let bgcolor = "#222";
      let text;
      let animation_loop: any;
      //let redraw_loop: any;
      
      function init() {
        ctx!.clearRect(0, 0, width, height);
        
        ctx!.beginPath();
        ctx!.strokeStyle = bgcolor;
        ctx!.lineWidth = 30;
        ctx!.arc(width/2, width/2, 100, 0, Math.PI*2, false);
        ctx!.stroke();
        let radians = degrees * Math.PI / 180;
        
        ctx!.beginPath();
        ctx!.strokeStyle = color;
        ctx!.lineWidth = 30;
        ctx!.arc(width/2, height/2, 100, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false); 
        ctx!.stroke();
        ctx!.fillStyle = color;
        ctx!.font = "50px arial";
        text = Math.floor(degrees/360*100) + "%";
        let text_width = ctx!.measureText(text).width;
        ctx!.fillText(text, width/2 - text_width/2, height/2 + 15);
      }
      
      function draw() {
        if (typeof animation_loop != undefined) clearInterval(animation_loop);
        new_degrees = 360;
        difference = new_degrees - degrees;
        animation_loop = setInterval(animate_to, 10000/difference);
      }
      
      function animate_to() {
        if(degrees === new_degrees) 
          clearInterval(animation_loop);
        else if(degrees < new_degrees)
          degrees++;
        else
          degrees--;
        init();
      }
      
      draw();
  }

  return (
    <div className={css.background}>
      <canvas className={css.spinner} id={`spinner`} width="300" height="300" />
    </div>
  )
}

export default Loading;
