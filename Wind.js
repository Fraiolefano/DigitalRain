var slider;
var angleSlider;
var windSound
var amplitude;
var buttonForMobile;
class Wind
{
  wind;
  intensity;
  max_wind;
  wind_step;

  constructor()
  {
    this.wind=new p5.Vector(0,0);
    this.intensity=0;
    this.max_wind=METRIC_UNIT*10;
    this.wind_step=0.1;
    amplitude=0;
  }
  
  setup()
  {
    slider=createSlider(0,this.max_wind,0,this.wind_step);
    slider.addClass("sliders");
    slider.parent(ms);
    angleSlider=createSlider(0,PI,PI,0.01);
    angleSlider.addClass("sliders");
    angleSlider.parent(ms);
  }
  
  update()
  {
    this.wind=p5.Vector.fromAngle(PI-(angleSlider.value()),1);
    this.intensity=slider.value();
    if(this.intensity>0)
    {
      if(!windSound.isPlaying() && buttonForMobile.value==1)
      {
        windSound.play();
      }
      amplitude=(1/this.max_wind)*this.intensity;
      windSound.amp(amplitude);
    }
    else
    {
      windSound.stop();
    }
  }
  
  draw()
  {
    strokeWeight(3);
    stroke(255,255,0);
    line(50,50,50+this.wind.x*(50/this.max_wind)*this.intensity,50+this.wind.y*(50/this.max_wind)*this.intensity);
    
    strokeWeight(5);
    point(50,50);
    
    if(this.intensity>0)
    {
      fill(255,255,0);
      noStroke();
      textSize(13);
      
      text(round(((this.intensity/METRIC_UNIT)*3.6),1) +" km/h",50,25);
    }
  }
}
